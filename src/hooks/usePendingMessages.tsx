import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  http,
  keccak256,
  toHex,
} from "viem";
import { sepolia } from "viem/chains";
import { useEffect, useState } from "react";
import {
  PendingComment,
  PendingCommentStatus,
} from "@/components/headless-crumbs/types/common";
import { useMessages } from "@/hooks/useMessages";
import { ulid } from "ulid";
import { offChainQuickSave } from "@/lib/offChainQuickSave";
import { getContract } from "viem";
import {
  CRUMBS_CONTRACT_ABI,
  CRUMBS_CONTRACT_ADDRESS,
} from "@/app/contract/details";

export const usePendingComments = (url: string | null) => {
  const { refresh } = useMessages(url!);
  const removePendingComment = (internalId: string) => {
    setPendingComments((comments) =>
      comments.filter((comment) => comment.internalId !== internalId)
    );
  };

  const [pendingComments, setPendingComments] = useState<PendingComment[]>([]);

  const sendMessage = async (
    url: string,
    message: string,
    internalId: string
  ) => {
    await offChainQuickSave(url, message);

    const walletClient = createWalletClient({
      chain: sepolia,
      //@ts-ignore
      transport: custom(window?.ethereum!),
    });

    await walletClient.switchChain(sepolia);

    const [address] = await walletClient.requestAddresses();

    const contract = getContract({
      abi: CRUMBS_CONTRACT_ABI,
      address: CRUMBS_CONTRACT_ADDRESS,
      client: createPublicClient({
        chain: sepolia,
        transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
      }),
    });

    const encodedFn = encodeFunctionData({
      abi: contract.abi,
      functionName: "storeComment",
      args: [keccak256(toHex(url)), keccak256(toHex(message)), BigInt(0)],
    });

    try {
      const tx = await walletClient.sendTransaction({
        to: CRUMBS_CONTRACT_ADDRESS,
        data: encodedFn,
        account: address,
      });

      setPendingComments((comments) =>
        comments.map((comment) =>
          comment.internalId === internalId
            ? {
                ...comment,
                status: PendingCommentStatus.TX_PENDING,
                txHash: tx,
              }
            : comment
        )
      );
    } catch (e) {
      console.error(e);
      setPendingComments((comments) =>
        comments.map((comment) =>
          comment.internalId === internalId
            ? {
                ...comment,
                status: PendingCommentStatus.WALLET_INTERACTION_REJECTED,
              }
            : comment
        )
      );
    }
  };

  const addComment = (comment: { url: string; comment: string }) => {
    const internalId = ulid();
    const pendingComment: PendingComment = {
      internalId,
      url: {
        value: comment.url,
        hash: keccak256(toHex(comment.url)),
      },
      comment: {
        value: comment.comment,
        hash: keccak256(toHex(comment.comment)),
      },
      txHash: null,
      status: PendingCommentStatus.BEFORE_WALLET_INTERACTION,
    };

    setPendingComments((comments) => [...comments, pendingComment]);

    sendMessage(comment.url, comment.comment, internalId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      pendingComments.forEach((comment) => {
        if (comment.status === PendingCommentStatus.TX_PENDING) {
          checkPendingCommentTxStatus(comment.txHash as `0x${string}`);
        }
      });
    }, 2500);

    return () => clearInterval(interval); // clean up the interval on component unmount
  }, [pendingComments]);

  useEffect(() => {
    pendingComments.forEach((comment) => {
      if (comment.status === PendingCommentStatus.TX_SUCCESS) {
        removePendingComment(comment.internalId);
        refresh();
      }
    });
  }, [pendingComments]);

  const checkPendingCommentTxStatus = async (txHash: `0x${string}`) => {
    const client = createPublicClient({
      chain: sepolia,
      transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
    });

    const receipt = await client
      .getTransactionReceipt({
        hash: txHash,
      })
      .then((x) => {
        return x;
      })
      .catch((e) => {
        //its fine if it's not yet mined
        return { status: "pending" };
      });

    if (receipt.status === "success") {
      updatePendingComment(txHash, PendingCommentStatus.TX_SUCCESS);
    }
  };

  const updatePendingComment = (
    txHash: string,
    status: PendingComment["status"]
  ) => {
    setPendingComments((comments) =>
      comments.map((comment) =>
        comment.txHash === txHash ? { ...comment, status } : comment
      )
    );
  };

  return {
    pendingComments,
    addComment,
    updatePendingComment,
    removePendingComment,
    checkPendingCommentTxStatus,
  };
};

import {
  CRUMBS_CONTRACT_ABI,
  CRUMBS_CONTRACT_ADDRESS,
} from "@/app/contract/details";
import { Message } from "@/components/headless-crumbs/types/common";
import { getOffChainClient } from "@/lib/client";
import { createPublicClient, http, keccak256, toHex } from "viem";
import { sepolia } from "viem/chains";

export const uint96ToTimestamp = (uint96: bigint): number => {
  // take first 40 bits
  const timestamp = Number(uint96 >> BigInt(56));

  return timestamp;
};

export const getMessages = async (url: string): Promise<Message[]> => {
  const client = createPublicClient({
    chain: sepolia,
    transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
  });

  const offchainClient = getOffChainClient();

  const data = await client.readContract({
    address: CRUMBS_CONTRACT_ADDRESS,
    abi: CRUMBS_CONTRACT_ABI,
    functionName: "getAllCommentsByCrumbCommitment",
    args: [keccak256(toHex(url!))],
  });

  const resolvedDictionary = await offchainClient.getHashValues(
    data.map((comment) => comment.commentHash)
  );

  const dataResolved = data.map((comment) => ({
    address: comment.user,
    text: resolvedDictionary[comment.commentHash] ?? comment.commentHash,
    restData: comment.additionalData,
  }));

  return dataResolved.map((message) => ({
    address: message.address,
    text: message.text,
    timestamp: uint96ToTimestamp(message.restData),
    fromChain: sepolia,
  }));
};

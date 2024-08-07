"use client";

import { HeadlessClient } from "@/components/headless-crumbs/headless-crumbs";
import {
  HeadlessClientCtx,
  Tabs,
} from "@/components/headless-crumbs/types/common";
import { useState } from "react";
import {
  createWalletClient,
  custom,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
  keccak256,
  toHex,
} from "viem";
import { sepolia } from "viem/chains";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useMessages } from "@/hooks/useMessages";

import {
  CRUMBS_CONTRACT_ABI,
  CRUMBS_CONTRACT_ADDRESS,
} from "@/app/contract/details";
import { usePendingComments } from "@/hooks/usePendingMessages";
import { offChainQuickSave } from "@/lib/offChainQuickSave";

const FROM = "injected";
const F = `[${FROM}]`;

// const sendMessage = async (url: string, message: string) => {
//   await offChainQuickSave(url, message);

//   const walletClient = createWalletClient({
//     chain: sepolia,
//     //@ts-ignore
//     transport: custom(window?.ethereum!),
//   });

//   await walletClient.switchChain(sepolia);

//   const [address] = await walletClient.requestAddresses();

//   const contract = getContract({
//     abi: CRUMBS_CONTRACT_ABI,
//     address: CRUMBS_CONTRACT_ADDRESS,
//     client: createPublicClient({
//       chain: sepolia,
//       transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
//     }),
//   });

//   const encodedFn = encodeFunctionData({
//     abi: contract.abi,
//     functionName: "storeComment",
//     args: [keccak256(toHex(url)), keccak256(toHex(message)), BigInt(0)],
//   });

//   try {
//     const tx = await walletClient.sendTransaction({
//       to: CRUMBS_CONTRACT_ADDRESS,
//       data: encodedFn,
//       account: address,
//     });
//   } catch (e) {
//     console.error(F, e);
//   }
// };

export function HeadlessMock(props: { url?: string }) {
  const getCurrentUrl = () => {
    return props?.url || "https://example.com/";
    // if (typeof window !== "undefined") {
    //   return window?.location?.href;
    // }

    // return "https://crumbs.eurekonomicon.com";
  };

  // const currentWindowUrl = "current-url";
  const [url, setUrl] = useState(getCurrentUrl());
  const [isConnectedToWallet, connectToWallet] = useState(false);
  const { isLoading, messages, refresh } = useMessages(url);
  const { pendingComments, addComment } = usePendingComments(url);
  const [tab, setTab] = useState(Tabs.CHAT);
  const [userAddress, setUserAddress] = useState("0x0" as `0x${string}`);

  const mockContext: HeadlessClientCtx = {
    pendingComments: {
      comments: pendingComments,
      addComment: () => {},
      removeComment: () => {},
    },
    options: {
      allowUrlEdit: true,
    },
    url: {
      currentUrl: url,
      getCurrentUrl: () => url,
      setCurrentUrl: setUrl,
    },
    tab: {
      getCurrentTab: () => tab,
      setTab: setTab,
    },
    handleSubmit: async (input: string) => {
      addComment({
        url: url,
        comment: input,
      });
    },
    userAddress: userAddress,
    account: {
      handleConnectWalletClick: async () => {
        const walletClient = createWalletClient({
          chain: sepolia,
          //@ts-ignore
          transport: custom(window?.ethereum!),
        });

        await walletClient.switchChain(sepolia);

        const [address] = await walletClient.requestAddresses();
        connectToWallet((x) => !x);
        setUserAddress(address);
      },
      isConnected: isConnectedToWallet,
    },
    messages: {
      isLoading,
      messages,
      sendMessage: () => {},
      refreshMessages: () => {},
    },
    feedback: {
      feedbackUrl: "https://crumbs.eurekonomicon.com/feedback",
      onFeedbackNavigate: (e) => {},
    },
    urlAccountMap: {},
  };
  const ctx = mockContext;
  return (
    <>
      <HeadlessClient ctx={ctx} />
    </>
  );
}

const queryClient = new QueryClient();

export default function Wrapper(props: { url?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeadlessMock url={props?.url} />
    </QueryClientProvider>
  );
}

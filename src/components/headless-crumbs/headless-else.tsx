"use client";

import { HeadlessClient } from "@/components/headless-crumbs/headless-crumbs";
import {
  HeadlessClientCtx,
  Tabs,
} from "@/components/headless-crumbs/types/common";
import { getMessages } from "@/lib/readMessages";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  // createPublicClient,
  createWalletClient,
  custom,
  // encodeFunctionData,
  // getContract,
  // http,
  // keccak256,
  // toHex,
} from "viem";
import { sepolia } from "viem/chains";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useMessages } from "@/hooks/useMessages";

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
  const [tab, setTab] = useState(Tabs.CHAT);
  const [userAddress, setUserAddress] = useState("0x0" as `0x${string}`);

  const mockContext: HeadlessClientCtx = {
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
    handleSubmit: (input: string) => console.log(input),
    userAddress: userAddress,
    account: {
      handleConnectWalletClick: async () => {
        const walletClient = createWalletClient({
          chain: sepolia,
          //@ts-ignore
          transport: custom(window?.ethereum!),
        });

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

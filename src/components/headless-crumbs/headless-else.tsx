"use client";

import { HeadlessClient } from "@/components/headless-crumbs/headless-crumbs";
import {
  HeadlessClientCtx,
  Tabs,
} from "@/components/headless-crumbs/types/common";
import { getMessages } from "@/lib/readMessages";
import { useEffect, useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  getContract,
  http,
  keccak256,
  toHex,
} from "viem";
import { sepolia } from "viem/chains";

export default function HeadlessMock() {
  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return window?.location?.href;
    }

    return "";
  };
  // const currentWindowUrl = "current-url";
  const [url, setUrl] = useState(getCurrentUrl());
  const [isConnectedToWallet, connectToWallet] = useState(false);
  const [tab, setTab] = useState(Tabs.CHAT);
  const [userAddress, setUserAddress] = useState("0x0" as `0x${string}`);

  const mockContext: HeadlessClientCtx = {
    options: {
      allowUrlEdit: true,
    },
    url: {
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
        connectToWallet((x) => !x);
        const walletClient = createWalletClient({
          chain: sepolia,
          //@ts-ignore
          transport: custom(window?.ethereum!),
        });

        const [address] = await walletClient.requestAddresses();
        setUserAddress(address);
      },
      isConnected: isConnectedToWallet,
    },
    messages: {
      isLoading: false,
      messages: [
        {
          address: "0x1833b3f31118FB04D48d16E1aE9194Eb3Fcda5eF",
          fromChain: sepolia,
          text: "soiemanko",
          timestamp: 1721243421,
        },
        {
          address: "0x1833b3f31118FB04D48d16E1aE9194Eb3Fcda5eF",
          fromChain: sepolia,
          text: "soiemanko",
          timestamp: 1721243421,
        },
        {
          address: "0x1833b3f31118FB04D48d16E1aE9194Eb3Fcda5eF",
          fromChain: sepolia,
          text: "soiemanko",
          timestamp: 1721243421,
        },
        {
          address: "0x1733b3e31118FB04D48d16E1aE9194Eb3Fcda5eF",
          fromChain: sepolia,
          text: "soiemanko",
          timestamp: 1721243421,
        },
      ],
      getMessages: async () => {
        return await getMessages(url);
      },
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

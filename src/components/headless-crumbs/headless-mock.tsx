"use client";
import { HeadlessClient } from "@/components/headless-crumbs/headless-crumbs";
import {
  HeadlessClientCtx,
  Tabs,
} from "@/components/headless-crumbs/types/common";
import { useState } from "react";

export default function HeadlessMock() {
  //   const currentWindowUrl = window?.location?.href ?? "";
  const currentWindowUrl = "current-url";
  const [url, setUrl] = useState(currentWindowUrl);
  const [isConnectedToWallet, connectToWallet] = useState(false);
  const [tab, setTab] = useState(Tabs.CHAT);

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
    userAddress: "0x1234567890",
    account: {
      handleConnectWalletClick: async () => {
        connectToWallet((x) => !x);
      },
      isConnected: isConnectedToWallet,
    },
    messages: {
      isLoading: false,
      messages: [],
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

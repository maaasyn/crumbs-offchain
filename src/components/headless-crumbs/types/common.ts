import { sepolia } from "viem/chains";

export type HeadlessClientOptions = {
  options: {
    allowUrlEdit: boolean;
  };
};

export type HeadlessClientUrl = {
  url: {
    getCurrentUrl: () => string;
    /// required only for editing urls on the fly.
    setCurrentUrl?: (value: string) => void;
  };
};

export type HeadlessClientMessages = {
  messages: {
    getMessages: () => Message[];
    sendMessage: (text: string) => void;
    refreshMessages: () => void;
  };
};

export type HeadlessClientTab = {
  tab: {
    getCurrentTab: () => Tabs;
    setTab: (tab: Tabs) => void;
  };
};

export type HeadlessClientCtx = HeadlessClientUrl &
  HeadlessClientTab &
  HeadlessClientOptions &
  HeadlessClientMessages & {
    handleSubmit: (input: string) => void;
    userAddress: `0x${string}`;
    account: {
      isConnected: boolean;
      handleConnectWalletClick: () => void;
    };
  };

export type Message = {
  address: string;
  text: string;
  timestamp: number;
  fromChain: typeof sepolia;
};

export enum Tabs {
  CHAT = "Chat",
  SETTINGS = "Settings",
}

export enum PendingCommentStatus {
  "BEFORE_WALLET_INTERACTION" = "BEFORE_WALLET_INTERACTION",
  "ON_WALLET" = "ON_WALLET",
  "WALLET_INTERACTION_SUCCESS" = "WALLET_INTERACTION_SUCCESS",
  "WALLET_INTERACTION_REJECTED" = "WALLET_INTERACTION_REJECTED",
  "TX_PENDING" = "TX_PENDING",
  "TX_SUCCESS" = "TX_SUCCESS",
  "TX_REJECT" = "TX_REJECT",
}

export type PendingComment = {
  internalId: string;
  url: { value: string; hash: string };
  comment: { value: string; hash: string };
  txHash: string | null;
  status: PendingCommentStatus;
};

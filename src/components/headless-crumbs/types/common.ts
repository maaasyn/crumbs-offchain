import type { MouseEvent, MouseEventHandler } from "react";
import { sepolia } from "viem/chains";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

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
    //TODO: decide if it should be obsolete
    getMessages: () => Promise<Message[]>;
    sendMessage: (text: string) => void;
    messages: Message[];
    isLoading: boolean;
    refreshMessages: () => void;
  };
};

export type HeadlessClientTab = {
  tab: {
    getCurrentTab: () => Tabs;
    setTab: (tab: Tabs) => void;
  };
};

export type HeadlessClientUrlAccountMap = {
  urlAccountMap: Record<string, string | null>;
};
export type HeadlessClientAccount = {
  userAddress: `0x${string}`;
  account: {
    isConnected: boolean;
    handleConnectWalletClick: () => Promise<void>;
  };
};

export type HeadlessClientSendMessage = {
  handleSubmit: (input: string) => void;
};

export type HeadlessClientFeedback = {
  feedback: {
    // https://crumbs.eurekonomicon.com/feedback
    feedbackUrl: string;
    onFeedbackNavigate: MouseEventHandler<HTMLAnchorElement>;
  };
};

export type HeadlessClientCtx = Prettify<
  HeadlessClientUrl &
    HeadlessClientAccount &
    HeadlessClientTab &
    HeadlessClientOptions &
    HeadlessClientMessages &
    HeadlessClientSendMessage &
    HeadlessClientUrlAccountMap &
    HeadlessClientFeedback
>;

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

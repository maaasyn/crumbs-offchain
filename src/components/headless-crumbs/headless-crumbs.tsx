"use client";
import { FC, useEffect, useRef, useState } from "react";
import {
  Tabs,
  Message,
  PendingComment,
  HeadlessClientCtx,
  HeadlessClientUrl,
  HeadlessClientAccount,
  HeadlessClientMessages,
  HeadlessClientSendMessage,
} from "./types/common";

import { ReactNode } from "react";
import { SingleMessage } from "@/components/headless-crumbs/single-message";
import SinglePendingComment from "@/components/headless-crumbs/single-pending-comment";
import { Header } from "./header";
import { Settings } from "@/components/headless-crumbs/settings";
import { forwardRef } from "react";

export const Body = forwardRef<HTMLDivElement, { children: ReactNode }>(
  function Body({ children }, ref) {
    return (
      <div ref={ref} className="overflow-y-auto h-72 mb-4 p-4 flex flex-col">
        {children}
      </div>
    );
  }
);

const usePendingComments = (input: unknown) => {
  return {
    pendingComments: [] as PendingComment[],
  };
};

type ChatProps = HeadlessClientUrl &
  HeadlessClientAccount &
  HeadlessClientMessages &
  HeadlessClientSendMessage;

export const Chat = ({
  url,
  userAddress,
  account,
  messages,
  handleSubmit,
}: ChatProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // const { messages, isLoading } = useGetMessages();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = useState("");
  const { pendingComments } = usePendingComments(url.getCurrentUrl());

  useEffect(() => {
    // Scroll to the bottom of the chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Dependency array ensures this runs when messages change

  return (
    <>
      <Body ref={chatContainerRef}>
        {messages.isLoading && (
          <div className="text-center p-4">Loading...</div>
        )}
        {!messages.isLoading && messages.messages.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No messages yet. Be the first to send a message!
          </div>
        )}
        {messages.messages.map((message, idx) => (
          <SingleMessage
            key={`${message.address}-${message.text}-${idx}-${Math.random()}`}
            idx={idx}
            message={message}
            messages={messages.messages}
            userAddress={userAddress}
          />
        ))}
        {pendingComments.map((comment) => (
          <SinglePendingComment
            currentUrl={url.getCurrentUrl()}
            key={comment.internalId}
            comment={comment}
          />
        ))}
      </Body>
      <form
        className="flex p-2 border-black border-t-2 bg-purple-200 gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(inputValue);
          setInputValue("");
        }}>
        {account.isConnected ? (
          <>
            <textarea
              placeholder="Type your message here..."
              className="border-black border-2 shadow-[2px_2px] p-2 rounded flex-1"
              value={inputValue}
              rows={1}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 bg-amber-500 hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]">
              Send
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1 w-full">
              <div className="text-center">
                To send a message, connect your wallet.
              </div>
              <button
                type="button"
                className="ml-2 bg-amber-500 hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]"
                onClick={account.handleConnectWalletClick}>
                Connect Wallet
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export const ChatHeader: FC<{ setTab: (tab: Tabs) => void }> = ({ setTab }) => {
  return (
    <>
      <select className="text-sm text-left bg-stone-200 rounded px-1 py-1 border-black border-2 shadow-[2px_2px]">
        <option>sepolia</option>
      </select>
      <h1 className="text-2xl font-bold">Crumbs</h1>
      <button onClick={() => setTab(Tabs.SETTINGS)} className="text-sm">
        Settings
      </button>
    </>
  );
};

export const SettingsHeader: FC<{ setTab: (tab: Tabs) => void }> = ({
  setTab,
}) => {
  return (
    <>
      <button onClick={() => setTab(Tabs.CHAT)} className="text-sm">
        {"< "}Chat
      </button>
      <h1 className="text-2xl font-bold">Settings</h1>
      <button className="text-sm">Wallet</button>
    </>
  );
};

export const crumbsHeadlessContext: HeadlessClientCtx = {
  options: {
    allowUrlEdit: true,
  },
  url: {
    currentUrl: "https://current.url",
    getCurrentUrl: () => "https://current.url",
    setCurrentUrl: (value: string) => {
      console.log(value);
    },
  },
  tab: {
    getCurrentTab: () => Tabs.CHAT,
    setTab: (tab: Tabs) => console.log(tab),
  },
  handleSubmit: async (input: string) => console.log(input),
  userAddress: "0x1234567890",
  account: {
    handleConnectWalletClick: async () => {
      console.log("handleConnectWalletClick");
    },
    isConnected: true,
  },
  messages: {
    sendMessage: () => {},
    refreshMessages: () => {},
    isLoading: false,
    messages: [],
  },
  feedback: {
    feedbackUrl: "https://crumbs.eurekonomicon.com/feedback",
    onFeedbackNavigate: (e) => {},
  },
  urlAccountMap: {},
};

export const HeadlessClient = ({ ctx }: { ctx: HeadlessClientCtx }) => {
  return (
    <>
      <div className="w-72 border-black border-2 font-sans">
        {ctx.tab.getCurrentTab() === Tabs.SETTINGS && (
          <Settings
            messages={ctx.messages}
            account={ctx.account}
            feedback={ctx.feedback}
            options={ctx.options}
            tab={ctx.tab}
            url={ctx.url}
            urlAccountMap={ctx.urlAccountMap}
            userAddress={ctx.userAddress}
          />
        )}

        {ctx.tab.getCurrentTab() === Tabs.CHAT && (
          <div className="bg-white shadow-lg rounded-lg max-w-2xl min-w-60">
            <Header
              messages={ctx.messages}
              url={ctx.url}
              options={ctx.options}
              tab={ctx.tab}
            />
            <Chat
              handleSubmit={ctx.handleSubmit}
              messages={ctx.messages}
              account={ctx.account}
              url={ctx.url}
              userAddress={ctx.userAddress}
            />
          </div>
        )}
      </div>
    </>
  );
};

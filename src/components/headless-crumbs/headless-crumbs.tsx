"use client";
import { FC, useEffect, useRef, useState } from "react";
import {
  Tabs,
  Message,
  PendingComment,
  HeadlessClientOptions,
  HeadlessClientCtx,
  HeadlessClientUrl,
  HeadlessClientTab,
} from "./types/common";

const useGetMessages = () => {
  return {
    refresh: () => console.log("refresh"),
    messages: [] as Message[],
    isLoading: false,
  };
};

const usePendingComments = (input: unknown) => {
  return {
    pendingComments: [] as PendingComment[],
  };
};

import { ReactNode } from "react";
import { SingleMessage } from "@/components/headless-crumbs/single-message";
import SinglePendingComment from "@/components/headless-crumbs/single-pending-comment";

export const Body = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-y-auto h-72 mb-4 p-4 flex flex-col">
      {children}
    </div>
  );
};

export const Chat = ({
  userAddress,
  handleSubmit,
  currentUrl,
  isConnected,
  handleConnectWalletClick,
}: {
  userAddress: string | null;
  handleSubmit: (input: string) => void;
  currentUrl: string;
  isConnected: boolean;
  handleConnectWalletClick: () => void;
}) => {
  const { messages, isLoading } = useGetMessages();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = useState("");
  const { pendingComments } = usePendingComments(currentUrl);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Body>
        {isLoading && <div className="text-center p-4">Loading...</div>}
        {!isLoading && messages.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No messages yet. Be the first to send a message!
          </div>
        )}
        {messages.map((message, idx) => (
          <SingleMessage
            key={`${message.address}-${message.text}-${idx}-${Math.random()}`}
            idx={idx}
            message={message}
            messages={messages}
            userAddress={userAddress}
          />
        ))}
        {pendingComments.map((comment) => (
          <SinglePendingComment
            currentUrl={currentUrl}
            key={comment.internalId}
            comment={comment}
          />
        ))}
        <div ref={messagesEndRef} />
      </Body>
      <form
        className="flex p-2 border-black border-t-2 bg-purple-200 gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(inputValue);
          setInputValue("");
        }}>
        {isConnected ? (
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
                onClick={handleConnectWalletClick}>
                Connect Wallet
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

type HeaderProps = HeadlessClientOptions &
  HeadlessClientUrl &
  HeadlessClientTab;

export const Header = ({ tab, url, options }: HeaderProps) => {
  const { refresh } = useGetMessages();
  const currentUrl = url.getCurrentUrl();

  return (
    <header className="p-4 flex flex-col items-start border-b-4 border-black bg-purple-200">
      <div className="w-full flex justify-between items-center mb-2">
        {tab.getCurrentTab() === Tabs.CHAT && (
          <ChatHeader setTab={tab.setTab} />
        )}
        {tab.getCurrentTab() === Tabs.SETTINGS && (
          <SettingsHeader setTab={tab.setTab} />
        )}
      </div>
      <div className="flex flex-row gap-2 w-full">
        <input
          type="text"
          readOnly={!options.allowUrlEdit}
          onChange={
            url?.setCurrentUrl
              ? (e) => url.setCurrentUrl!(e.target.value)
              : undefined
          }
          value={currentUrl || ""}
          className="text-sm w-full text-left bg-stone-200 rounded px-2 py-1 overflow-auto max-w-full border-black border-2 shadow-[2px_2px]"
        />

        <button
          type="button"
          className="bg-amber-500 px-0.5 text-xl hover:bg-amber-700 font-bold rounded border-black border-2 shadow-[2px_2px]"
          onClick={() => refresh()}>
          ↻
        </button>
      </div>
    </header>
  );
};

const ChatHeader: FC<{ setTab: (tab: Tabs) => void }> = ({ setTab }) => {
  return (
    <>
      <select>
        <option>sepolia</option>
      </select>
      <h1 className="text-2xl font-bold">Crumbs</h1>
      <button onClick={() => setTab(Tabs.SETTINGS)} className="text-sm">
        Settings
      </button>
    </>
  );
};

const SettingsHeader: FC<{ setTab: (tab: Tabs) => void }> = ({ setTab }) => {
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
    getCurrentUrl: () => "https://current.url",
    setCurrentUrl: (value: string) => {
      console.log(value);
    },
  },
  tab: {
    getCurrentTab: () => Tabs.CHAT,
    setTab: (tab: Tabs) => console.log(tab),
  },
  handleSubmit: (input: string) => console.log(input),
  userAddress: "0x1234567890",
  account: {
    handleConnectWalletClick: () => {
      console.log("handleConnectWalletClick");
    },
    isConnected: true,
  },
  messages: {
    getMessages: () => [],
    sendMessage: () => {},
    refreshMessages: () => {},
  },
};

export const HeadlessClient = ({ ctx }: { ctx: HeadlessClientCtx }) => {
  const currentUrl = ctx.url.getCurrentUrl();
  return (
    <>
      <div className="w-72 border-black border-2">
        <div className="bg-white shadow-lg rounded-lg max-w-2xl min-w-60">
          <Header url={ctx.url} options={ctx.options} tab={ctx.tab} />
          <Chat
            handleConnectWalletClick={ctx.account.handleConnectWalletClick}
            isConnected={ctx.account.isConnected}
            currentUrl={currentUrl}
            handleSubmit={ctx.handleSubmit}
            userAddress={ctx.userAddress}
          />
        </div>
      </div>
    </>
  );
};

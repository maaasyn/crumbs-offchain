"use client";
import {
  ChatHeader,
  SettingsHeader,
} from "@/components/headless-crumbs/headless-crumbs";
import {
  HeadlessClientOptions,
  HeadlessClientUrl,
  HeadlessClientTab,
  Tabs,
  HeadlessClientMessages,
} from "@/components/headless-crumbs/types/common";

type HeaderProps = HeadlessClientOptions &
  HeadlessClientUrl &
  HeadlessClientTab &
  HeadlessClientMessages;

export const Header = ({ tab, url, options, messages }: HeaderProps) => {
  const { currentUrl } = url;

  console.log({ currentUrl });

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
          onClick={() => messages.refreshMessages()}>
          ↻
        </button>
      </div>
    </header>
  );
};

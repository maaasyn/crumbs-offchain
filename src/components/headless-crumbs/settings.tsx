import { Header } from "@/components/headless-crumbs/header";
import { Body } from "@/components/headless-crumbs/headless-crumbs";
import {
  HeadlessClientAccount,
  HeadlessClientFeedback,
  HeadlessClientMessages,
  HeadlessClientOptions,
  HeadlessClientTab,
  HeadlessClientUrl,
  HeadlessClientUrlAccountMap,
  Tabs,
} from "@/components/headless-crumbs/types/common";

type SettingsProps = HeadlessClientUrl &
  HeadlessClientAccount &
  HeadlessClientTab &
  HeadlessClientUrlAccountMap &
  HeadlessClientOptions &
  HeadlessClientMessages &
  HeadlessClientFeedback;

export const Settings = ({
  account,
  tab,
  userAddress,
  url,
  options,
  messages,
  feedback,
  urlAccountMap,
}: SettingsProps) => {
  return (
    <div className="bg-white rounded-lg max-w-2xl min-w-60">
      <Header messages={messages} url={url} options={options} tab={tab} />
      <Body>
        <div className="flex flex-col gap-2 break-words">
          <div className="px-4">
            <p className="text-sm font-bold">Account:</p>
            <p className="text-sm">{userAddress}</p>
          </div>
          <div className="px-4">
            <p className="text-sm font-bold">Feedback:</p>
            <details>
              <summary>how to</summary>
              <pre className="text-sm whitespace-pre-wrap">
                First of all thank you for using crumbs, and clicking throught
                the app!
                <br />
                If you want to share your feedback with me you can reach me at
                github @maaasyn or twitter @0xmaaasyn.
                <br />
                You can also leave feedback this link below (directly or
                throught the extension):
                <br />
                <a
                  href={feedback.feedbackUrl}
                  onClick={feedback.onFeedbackNavigate}>
                  {feedback.feedbackUrl}
                </a>
              </pre>
            </details>
          </div>
          {/* </div> */}

          {/* url to account map */}
          <div className="px-4">
            <p className="text-sm font-bold">URL to Account:</p>

            <details>
              <summary>Json</summary>
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(urlAccountMap, null, 2)}
              </pre>
            </details>
          </div>

          <button
            className="ml-2 bg-white hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]"
            onClick={() => tab.setTab(Tabs.CHAT)}>
            Return
          </button>

          <button
            className="ml-2 bg-amber-500 hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]"
            onClick={account.handleConnectWalletClick}>
            Connect Wallet
          </button>
        </div>
      </Body>
    </div>
  );
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import crumbsDemoGif from "@/public/crumbs-demo.gif";
import crumbsLogo from "@/public/logo.svg";
import crumbsHero from "@/public/landing-crumbs-image.png";
import eclipse from "@/public/eclipse.svg";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8">
      <div className="flex items-center">
        <Image src={crumbsLogo} alt="Crumbs logo" className="w-8 h-8" />
        <div className="text-4xl font-bold ml-2">Crumbs</div>
      </div>
      <div>
        <ul className="flex gap-4">
          <li className="cursor-pointer">
            <Link href={"https://github.com/maaasyn/crumbs"}>docs</Link>
          </li>
          <li className="cursor-pointer">
            <Link href={"https://github.com/maaasyn"}>contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center py-16 px-8">
      <div className="max-w-sm">
        <p className="text-6xl font-bold mb-4">
          Comment everything, everywhere.
        </p>
        <p className="text-xl">
          Onchain committed comments. Verifiable. Open. Permanent.
        </p>
        <div className="flex flex-col mt-8 gap-4">
          <Link
            href="https://chromewebstore.google.com/detail/crumbs/hboepmaapmajfbafkkokfijpkjninbcm"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 bg-amber-500 hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px] text-center">
            Get chrome plugin
          </Link>
          <Link
            href="https://github.com/maaasyn/crumbs"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 bg-white hover:bg-gray-200 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px] text-center">
            Checkout github
          </Link>
        </div>
      </div>
      <div className="relative">
        <div className="flex justify-center items-center">
          <Image src={eclipse} alt="background eclipse image" />
        </div>
        <div className="absolute inset-0 z-10 rotate-12 justify-self-center self-center transition ease-in-out hover:scale-110 animate-rotate-slow">
          <Image src={crumbsHero} alt="crumbs extension example" />
        </div>
      </div>
    </div>
  );
};

const colorBege = "FEF9E8";

const YellowPaperOffchain = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-[#FEF9E8] py-20 rounded-2xl flex justify-center items-center max-w-screen-lg w-full">
        <div className="flex flex-col gap-10 justify-center items-center max-w-xl">
          <p className="text-3xl font-bold mb-4">Offchain hashmap</p>
          <p className="w-full text-xl">
            The second part of crumbs protocol is offchain hash map. Each user
            can host their own dictionary of hashes, and expose them to public.
            The dictionaries are used by the protocol to resolve the commitments
            from chain.{" "}
          </p>
          <table className="border-2 text-2xl p-4 border-black w-full border-collapse">
            <thead>
              <tr className="border-2 text-2xl p-4 border-black">
                <th className="border-2 text-2xl p-4 border-black font-normal">
                  key
                </th>
                <th className="border-2 text-2xl p-4 border-black font-normal">
                  value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-2 text-2xl p-4 border-black">
                <td className="border-2 text-2xl p-4 border-black text-center">
                  0x1234
                </td>
                <td className="border-2 text-2xl p-4 border-black text-center">
                  0x123456
                </td>
              </tr>
              <tr className="border-2 text-2xl p-4 border-black">
                <td className="border-2 text-2xl p-4 border-black text-center">
                  0x1235
                </td>
                <td className="border-2 text-2xl p-4 border-black text-center">
                  0x123457
                </td>
              </tr>
              <tr className="border-2 text-2xl p-4 border-black">
                <td className="border-2 text-2xl p-4 border-black text-center">
                  0x1236
                </td>
                <td className="border-2 text-2xl p-4 border-black text-center">
                  0x123458
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const YellowPaperOnChain = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-[#FEF9E8] py-20 rounded-2xl flex justify-center items-center max-w-screen-lg w-full">
        <div className="flex flex-col gap-10 justify-center items-center max-w-xl">
          <p className="text-3xl font-bold mb-4">Onchain contract</p>
          <p className="w-full text-xl">
            User commits their intended hash to the crumbs contract. The
            contract stores informations about the crumb that the message was
            sent to with additional metadata like date and user who sent it.
          </p>
          <div className="flex items-center">
            <div className="border-2 text-2xl p-4 border-black text-center">
              crumb
            </div>
            <div className="text-2xl p-4 text-center">
              <div>1:n</div>
              <div>---{">"}</div>
            </div>
            <div className="border-2 text-2xl p-4 border-black text-center">
              <ul>
                <li>comment commitment</li>
                <li>user address</li>
                <li>timestamp</li>
                <li>metadata</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type SquareThingWithTextProps = {
  emoji: string;
  title: string;
  description: string;
};

const items: SquareThingWithTextProps[] = [
  {
    emoji: "🤬",
    title: "Censor free",
    description:
      "By design the crumbs protocol allows no moderated communication",
  },
  {
    emoji: "♾️",
    title: "Permanent storage",
    description: "Comments commitments are permanently stored on chain",
  },
  {
    emoji: "👨‍💻",
    title: "Open source",
    description: "Each code piece is open source",
  },
  {
    emoji: "🕵️",
    title: "Verifiable",
    description: "Each commitment can be easily verified",
  },
];

const SectionWhatAreCrumbs = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full gap-16">
        <p className="text-5xl font-bold max-w-screen-sm">What are crumbs? </p>
        <div className="max-w-screen-sm flex flex-col gap-4">
          <p className="text-xl">
            Each piece of data such as a link, video, book, text, file can be
            represented as a hash - a unique identifier - data fingerprint.
          </p>

          <p className="text-xl">
            This unique identifier in the context of this protocol is called a
            crumb. We are binding comments hashes to the crumb from
            website&apos;s URL, ensuring comments are site-specific.
          </p>
        </div>
        <div className="flex flex-wrap max-w-screen-md justify-between gap-6">
          {items.map((item, idx) => (
            <SquareThingWithText {...item} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SectionHowDoesItWorks = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full gap-16">
        <p className="text-5xl font-bold max-w-screen-sm">How does it work?</p>
        <div className="max-w-screen-sm flex flex-col gap-4">
          <p className="text-xl">
            Crumbs is a protocol based two concepts. Data on chain is permanent*
            and data validity is verifiable with a checksum.
          </p>
        </div>
      </div>
    </div>
  );
};

const SectionBigPlus = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full gap-16">
        <p className="text-5xl font-bold max-w-screen-sm">+</p>
      </div>
    </div>
  );
};

const SectionGettingStarted = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-row max-w-screen-md gap-5">
        <div className="flex flex-col justify-center items-start w-full gap-16">
          <p className="text-5xl font-bold max-w-screen-sm">Getting started</p>
          <div className="max-w-screen-sm flex flex-col gap-4">
            <p>You will need:</p>
            <ul>
              <li>- Chromium based browser</li>
              <li>- Wallet ideally metamask</li>
              <li>- Sepolia eth on your account</li>
              <li>- Crumbs extention</li>
            </ul>
            <p>
              That’s it. Have fun. Pretty please don’t make me forced to nuke
              this app out of this world. 💀
            </p>
          </div>
        </div>
        <div>
          <Image
            className="rounded-3xl"
            src={crumbsDemoGif}
            alt={"animated crumbs extention demo"}
          />
        </div>
      </div>
    </div>
  );
};

const SquareThingWithText = (props: SquareThingWithTextProps) => {
  return (
    <div className="flex items-center gap-4 max-w-80">
      <div className="min-w-12 min-h-12 bg-[#F8F5FB] flex justify-center items-center">
        <p className="text-xl">{props.emoji}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-base font-bold">{props.title}</p>
        <p className="text-sm">{props.description}</p>
      </div>
    </div>
  );
};

type ChainCarusele = {
  src: string;
  name: string;
  state: "soon" | "bearly" | "works" | "not so soon";
};

const sepolia: ChainCarusele = {
  src: "chains/eth.svg",
  name: "Sepolia Eth",
  state: "bearly",
};
const op: ChainCarusele = {
  src: "chains/op.svg",
  name: "Optimism",
  state: "soon",
};

const stk: ChainCarusele = {
  src: "chains/strk.svg",
  name: "Starknet",
  state: "not so soon",
};

const arb: ChainCarusele = {
  src: "chains/arb.svg",
  name: "Arbitrum",
  state: "soon",
};

const chainsToSupport: ChainCarusele[] = [sepolia, arb, op, stk];

const ChainIcon = (props: { chain: ChainCarusele }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        className={`${props.chain.state !== "bearly" && "grayscale"}`}
        src={`/${props.chain.src}`}
        width={80}
        height={80}
        alt={`logo ${props.chain.name}`}
      />
      <div className="flex flex-col gap-1 items-center">
        <p className="text-2xl font-bold">{props.chain.name}</p>
        <p className="italic text-base">{props.chain.state}</p>
      </div>
    </div>
  );
};

const SectionSupportedNetworks = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-5xl font-bold max-w-screen-sm">
            Supported networks
          </p>
          <p className="text-xl text-center">As on now tests chains only</p>
        </div>
        <div className="max-w-screen-sm flex flex-row gap-8">
          {chainsToSupport.map((chain, idx) => (
            <ChainIcon chain={chain} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

type Faq = {
  question: string;
  answer: string | React.ReactElement;
};

const faqs: Faq[] = [
  {
    question: "How can I contribute?",
    answer: "gh is your oyster, else dm me",
  },
  {
    question: "I want this feature {...}",
    answer: (
      <div>
        Create an issue on github{" "}
        <Link
          className="underline"
          href={"https://github.com/maaasyn/crumbs/issues"}>
          https://github.com/maaasyn/crumbs/issues
        </Link>
      </div>
    ),
  },
];

const SectionFaq = (props: { faqs: Faq[] }) => {
  return (
    <>
      <section className="pb-20 dark:bg-slate-900 flex justify-center w-full">
        <Accordion type="single" collapsible className="w-full max-w-screen-md">
          {props.faqs.map((item, idx) => (
            <div className="w-full" key={idx}>
              <AccordionItem value={`item-${idx}`} className="w-full">
                <AccordionTrigger className="w-full">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </section>
    </>
  );
};

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-24">
        <Hero />
        <SectionWhatAreCrumbs />
        <SectionGettingStarted />
        <SectionHowDoesItWorks />
        <YellowPaperOnChain />
        <SectionBigPlus />
        <YellowPaperOffchain />
        <SectionSupportedNetworks />
        <SectionFaq faqs={faqs} />
      </div>
    </>
  );
}

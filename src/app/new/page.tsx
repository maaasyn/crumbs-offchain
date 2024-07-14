import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8">
      <div className="flex items-center">
        <Image src="/logo.svg" width={30} height={30} alt="Crumbs logo" />
        <div className="text-4xl font-bold ml-2">Crumbs</div>
      </div>
      <div>
        <ul className="flex gap-4">
          <li className="cursor-pointer">docs</li>
          <li className="cursor-pointer">contact</li>
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
          <button className="ml-2 bg-amber-500 hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]">
            Get chrome plugin
          </button>
          <button className="ml-2 bg-white hover:bg-gray-200 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]">
            Checkout github
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="flex justify-center items-center">
          <Image
            src="/eclipse.svg"
            width={569}
            height={569}
            alt="background eclipse image"
          />
        </div>
        <div className="absolute inset-0 z-10 rotate-12 justify-self-center self-center transition ease-in-out hover:scale-110 animate-rotate-slow">
          <Image
            src="/landing-crumbs-image.png"
            width={360}
            height={609}
            alt="crumbs extension example"
          />
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

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <br />
      <SectionWhatAreCrumbs />
      <br />
      <YellowPaperOnChain />
      <br />
      <YellowPaperOffchain />
    </>
  );
}

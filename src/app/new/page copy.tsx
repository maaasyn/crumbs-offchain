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
    <div className="flex flex-row justify-between items-center py-16 px-8 relative">
      <div className="max-w-lg z-20">
        <p className="text-6xl font-bold mb-4">
          Comment everything, everywhere.
        </p>
        <p className="text-xl">
          Onchain committed comments. Verifiable. Open. Permanent.
        </p>
        <div className="mt-8">
          <button className="bg-yellow-500 text-white px-4 py-2 mr-4">
            Get chrome plugin
          </button>
          <button className="border border-black px-4 py-2">
            Checkout github
          </button>
        </div>
      </div>
      <div className="relative w-full flex justify-end">
        <div className="absolute w-full h-full flex justify-center items-center">
          <Image
            src="/eclipse.svg"
            layout="fill"
            objectFit="contain"
            alt="background eclipse image"
          />
        </div>
        <div className="relative z-20 rotate-12">
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

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

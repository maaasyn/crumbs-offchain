"use client";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-yellow-100 dark:bg-gray-900">
      <div className="w-full px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Crumbs
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuLink asChild>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                href="#">
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                href="#features">
                Features
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                href="https://github.com/maaasyn">
                Contact
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  🍪 Crumbs 🍪
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Comment everything, everywhere.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="https://chromewebstore.google.com/detail/crumbs/hboepmaapmajfbafkkokfijpkjninbcm?authuser=0&hl=pl">
                  Get the chrome plugin
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="https://github.com/maaasyn/crumbs">
                  Project github
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-yellow-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <h2
              className="text-3xl font-bold text-center text-gray-900 dark:text-white"
              id="features">
              How it Works
            </h2>

            <div className="mt-8 flex flex-col items-center gap-8 px-4 md:px-8">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Unique Hash Generation
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Each website is represented by a unique hash, generated from
                  the website&apos;s URL, ensuring comments are site-specific.
                </p>
                <code>
                  keccak {'"'}https://example.com/{'"'} ===
                  0x00238809d48a86b3a841a3f501d566475cde08f38cb75969645733a83e43306a
                </code>
                <Image
                  src="/example-url.png"
                  alt={"example url hash generation"}
                  width={400}
                  height={200}
                  layout={"responsive"}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Comment Commitment
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  You can create comments on any website and commit them
                  permanently on-chain to be viewed by anyone.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Offchain Dictionary
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  To view comment content, we use a hash to value dictionary
                  stored offchain, allowing for efficient data retrieval.
                </p>
              </div>

              <div className="mx-auto max-w-xl lg:max-w-3xl p-4">
                <Image
                  src="/crumbs-cropped.gif"
                  alt={"crumbs usage example"}
                  width={400}
                  height={200}
                  layout={"responsive"}
                />
                <p>Demo</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full h-20 flex items-center justify-center border-t text-gray-600 dark:border-gray-800 dark:text-gray-300">
        <p>© 2024 Crumbs</p>
      </div>
    </div>
  );
}

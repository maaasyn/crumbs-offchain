import HeadlessElse from "@/components/headless-crumbs/headless-else";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let urlParam = searchParams.url;

  if (Array.isArray(urlParam)) {
    urlParam = urlParam[0];
  }

  if (typeof urlParam !== "string") {
    urlParam = undefined;
  }

  return <HeadlessElse url={urlParam} />;
}

import {
  HeadlessClient,
  crumbsHeadlessContext,
} from "@/components/headless-crumbs/headless-crumbs";

export default function Page() {
  return (
    <>
      <HeadlessClient ctx={crumbsHeadlessContext} />
    </>
  );
}

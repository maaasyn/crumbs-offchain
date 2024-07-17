import { PendingComment } from "@/components/headless-crumbs/types/common";
import { getLongHexShorter } from "@/lib/getLongHexShorter";

const usePendingComments = (url: string) => {
  return {
    removePendingComment: (commentId: string) => {},
    checkPendingCommentTxStatus: async (tx: `0x${string}`) => {},
  };
};

export const SinglePendingComment = ({
  comment,
  currentUrl,
}: {
  comment: PendingComment;
  currentUrl: string;
}) => {
  const { removePendingComment, checkPendingCommentTxStatus } =
    usePendingComments(currentUrl);

  return (
    <div key={comment.internalId} className="flex items-center mb-2 last:mb-0">
      <div className="w-5 h-5 rounded-full flex-shrink-0 self-end mr-1"></div>
      <div className="flex flex-col relative">
        <span className="text-xs font-medium">You</span>
        <div className="p-2 rounded bg-amber-200 gap-2 flex">
          <span>{comment.comment.value}</span>
          <span
            role="img"
            aria-label="remove"
            onClick={() => removePendingComment(comment.internalId)}
            style={{ cursor: "pointer" }}>
            ❌
          </span>
          <span
            role="img"
            aria-label="tx status"
            onClick={() => {
              checkPendingCommentTxStatus(
                (comment.txHash as `0x${string}`) ?? "0x0"
              ).then(console.log);
            }}
            style={{ cursor: "pointer" }}>
            🕵️
          </span>
        </div>
        <span className="text-xs text-gray-500 text-right mt-0.5">
          {comment.status}
        </span>
        <span
          title={comment?.txHash || ""}
          className="text-xs text-gray-500 text-right mt-0.5">
          tx hash: {comment?.txHash && getLongHexShorter(comment.txHash)}
        </span>
      </div>
    </div>
  );
};

export default SinglePendingComment;

"use client";
import { getOffChainClient } from "@/lib/client";
import { keccak256, toHex } from "viem";

export const offChainQuickSave = async (url: string, message: string) => {
  const offChainClient = getOffChainClient();

  const isAllOk = await Promise.all([
    offChainClient.setHashValue({
      hash: keccak256(toHex(url)),
      value: url,
    }),
    offChainClient.setHashValue({
      hash: keccak256(toHex(message)),
      value: message,
    }),
  ]);

  if (!isAllOk) {
    throw new Error("Failed to set hash value");
  }
};

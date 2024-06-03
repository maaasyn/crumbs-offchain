import { hashMediator } from "@/singletons";
import { z } from "zod";

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
  const data = await request.json();

  const dataSchema = z.array(z.string());

  if (data.length > 1000) {
    return new Response("Too many hashes provided", { status: 400 });
  }

  if (data.length === 0) {
    return new Response("[]");
  }

  const validatedData = dataSchema.parse(data);

  // Create a set to remove duplicates
  const uniqueHashes = Array.from(new Set(validatedData));

  // Query the database for each unique hash
  const uniqueValues = await hashMediator.getHashes(uniqueHashes);

  // Create a map of hashes to values
  const hashValueMap = new Map(
    uniqueValues.map(({ key, value }) => [key, value])
  );

  // Create the response by looking up each hash in the map
  const hashValuePairs = Object.fromEntries(
    validatedData.map((hash) => [hash, hashValueMap.get(hash)])
  );

  return new Response(JSON.stringify(hashValuePairs));
}

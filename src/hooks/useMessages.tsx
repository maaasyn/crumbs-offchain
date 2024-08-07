import { getMessages } from "@/lib/readMessages";
import { useQuery } from "@tanstack/react-query";

export const useMessages = (url: string) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["messages", url],
    queryFn: () => getMessages(url),
    enabled: !!url,
  });

  return {
    messages: data || [],
    refresh: refetch,
    isLoading,
  };
};

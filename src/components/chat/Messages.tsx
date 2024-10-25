"use client";

import { Loader2, MessageSquare } from "lucide-react";
import { ReactElement, useContext, useEffect, useRef } from "react";
import { ChatContext, MessageApp } from "./ChatContext";
import { useIntersection } from "@mantine/hooks";
import Skeleton from "react-loading-skeleton";

import Message from "./Message";
import { scrollToBottom } from "@/lib/utils";

interface MessagesProps {
  fileId: string;
}

const Messages = ({ fileId }: MessagesProps) => {
  const { messages, isAiThinking } = useContext(ChatContext);

  const isLoading = false;
  //TODO mock
  /*   let messages: {
    createdAt: string;
    id: string;
    isUserMessage: boolean;
    text: string | JSX.Element;
  }[] = [
    {
      createdAt: new Date().toISOString(),
      id: "1",
      isUserMessage: true,
      text: "Hello",
    },
    {
      createdAt: new Date().toISOString(),
      id: "2",
      isUserMessage: false,
      text: "Hi",
    },
    {
      createdAt: new Date().toISOString(),
      id: "3",
      isUserMessage: true,
      text: "How are you?",
    },
    {
      createdAt: new Date().toISOString(),
      id: "3",
      isUserMessage: true,
      text: "Others...",
    },
    {
      createdAt: new Date().toISOString(),
      id: "4",
      isUserMessage: false,
      text: "I'm good, thanks!",
    },
  ];
  const isLoading = false; */
  /*  const { data, isLoading, fetchNextPage } =
  trpc.getFileMessages.useInfiniteQuery(
    {
      fileId,
      limit: INFINITE_QUERY_LIMIT,
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage?.nextCursor,
      keepPreviousData: true,
    }
  )

const messages = data?.pages.flatMap(
  (page) => page.messages
) */

  const loadingMessage: MessageApp = {
    createdAt: new Date(),
    id: "loading-message",
    isUserMessage: false,
    role: "assistant",
    content: "",
    jsx: (
      <span className="flex h-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    ),
  };

  const combinedMessages: MessageApp[] = [
    ...(messages ?? []),
    ...(isAiThinking ? [loadingMessage] : []),
  ];
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  /* useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]); */

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    //setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {combinedMessages && combinedMessages.length > 0 && (
        <>
          <section ref={containerRef}>
            {combinedMessages.map((message, i) => {
              (message as MessageApp).isUserMessage =
                (message as MessageApp).role === "user";
              const isNextMessageSamePerson =
                combinedMessages[i - 1]?.isUserMessage ===
                combinedMessages[i]?.isUserMessage;

              if (i === combinedMessages.length - 1) {
                return (
                  <Message
                    ref={ref}
                    message={message}
                    isNextMessageSamePerson={isNextMessageSamePerson}
                    key={message.id}
                  />
                );
              } else
                return (
                  <Message
                    message={message}
                    isNextMessageSamePerson={isNextMessageSamePerson}
                    key={message.id}
                  />
                );
            })}
          </section>
        </>
      )}
      {/*  <section ref={containerRef}>
        
        </section>) : isLoading ? (
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <h3 className="font-semibold text-xl">You&apos;re all set!</h3>
          <p className="text-zinc-500 text-sm">
            Ask your first question to get started.
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Messages;

import { cn } from "@/lib/utils";
//import { ExtendedMessage } from '@/types/message'
import { format } from "date-fns";
import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import { Icons } from "../atoms/Icons";
import { MessageApp } from "./Messages";
interface MessageProps {
  message: MessageApp;
  isNextMessageSamePerson: boolean;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-end mb-2", {
          "justify-end": message.isUserMessage,
        })}
      >
        <div
          className={cn(
            "relative flex h-6 w-6 aspect-square items-center justify-center",
            {
              "order-2 bg-blue-600 rounded-sm": message.isUserMessage,
              "order-1 bg-zinc-800 rounded-sm": !message.isUserMessage,
              invisible: isNextMessageSamePerson,
            }
          )}
        >
          {message.isUserMessage ? (
            <Icons.user className="fill-zinc-200 text-zinc-200 h-3/4 w-3/4" />
          ) : (
            <Icons.logo className="fill-zinc-300 h-3/4 w-3/4" />
          )}
        </div>

        <div
          className={cn("flex flex-col space-y-2 text-base max-w-md mx-2", {
            "order-1 items-end": message.isUserMessage,
            "order-2 items-start": !message.isUserMessage,
          })}
        >
          <div
            className={cn("px-4 py-2 rounded-lg inline-block", {
              "bg-blue-600 text-white dark:bg-blue-900": message.isUserMessage,
              "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white":
                !message.isUserMessage,
              "rounded-br-none":
                !isNextMessageSamePerson && message.isUserMessage,
              "rounded-bl-none":
                !isNextMessageSamePerson && !message.isUserMessage,
            })}
          >
            {!message.jsx ? (
              <ReactMarkdown
                className={cn("prose dark:prose-invert", {
                  "text-zinc-50 ": message.isUserMessage,
                })}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              message.jsx
            )}
            {message.id !== "loading-message" && message.createdAt ? (
              <div
                className={cn("text-xs select-none mt-2 w-full text-right", {
                  "text-zinc-500 dark:text-gray-400": !message.isUserMessage,
                  "text-blue-300 dark:text-gray-400": message.isUserMessage,
                })}
              >
                {format(new Date(message.createdAt?.toISOString()), "HH:mm")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

Message.displayName = "Message";

export default Message;

"use client";

import { Send } from "lucide-react";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./ChatContext";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const { handleInputChange, handleSubmit, isAiThinking, message } =
    useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleDivClick = () => {
    if (formRef && formRef.current) {
      const syntheticEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      const formEvent: React.FormEvent<HTMLFormElement> = {
        ...syntheticEvent,
        currentTarget: formRef.current,
        target: formRef.current,
        persist: () => {}, // noop function
        nativeEvent: syntheticEvent as any,
        isDefaultPrevented: () => syntheticEvent.defaultPrevented,
        isPropagationStopped: () => syntheticEvent.cancelBubble,
        preventDefault: () => syntheticEvent.preventDefault(),
        stopPropagation: () => syntheticEvent.stopPropagation(),
      };
      handleSubmit(formEvent);
    }
  };

  useEffect(() => {
    textareaRef && textareaRef.current && textareaRef.current.focus();
  }, [isAiThinking]);

  return (
    <div className="fixed lg:absolute bottom-0 left-0 w-full bg-white dark:bg-gray-900">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <form
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
              className="relative"
            >
              <Textarea
                rows={1}
                ref={textareaRef}
                autoFocus
                disabled={isAiThinking || isDisabled}
                onChange={handleInputChange}
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleDivClick();
                  }
                }}
                placeholder="Enter your question..."
                className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              />

              <Button
                disabled={isAiThinking || isDisabled}
                className="absolute bottom-1.5 right-[8px]"
                aria-label="send message"
                onClick={handleDivClick}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

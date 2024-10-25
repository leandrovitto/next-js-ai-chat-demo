"use client";

import { ReactElement, ReactNode, createContext, useState } from "react";
import { Message as MessageAiReact, useChat } from "ai/react";

export interface MessageApp extends MessageAiReact {
  isUserMessage?: boolean;
  jsx?: ReactElement;
}

type StreamResponse = {
  message: string;
  messages: MessageApp[];
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isAiThinking: boolean;
};

export const ChatContext = createContext<StreamResponse>({
  message: "",
  messages: [],
  handleInputChange: () => {},
  handleSubmit: () => {},
  isAiThinking: false,
});

interface Props {
  fileId: string;
  children: ReactNode;
}

export const initialMessages: MessageAiReact[] = [
  {
    role: "assistant",
    id: "0",
    content: "Hi! I am your AI assistant. I am happy to help you.",
  },
];

export const ChatContextProvider = ({ fileId, children }: Props) => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  //TODO mock
  // const [message, setMessage] = useState<string>("");
  /* const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  }; */

  const {
    messages,
    input: message,
    handleInputChange,
    handleSubmit,
    isLoading: isAiThinking,
    data,
  } = useChat({
    initialMessages,
  });

  /*  const utils = trpc.useContext()

  const { toast } = useToast()

  const backupMessage = useRef('')

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({
      message,
    }: {
      message: string
    }) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({
          fileId,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      return response.body
    },
    onMutate: async ({ message }) => {
      backupMessage.current = message
      setMessage('')

      // step 1
      await utils.getFileMessages.cancel()

      // step 2
      const previousMessages =
        utils.getFileMessages.getInfiniteData()

      // step 3
      utils.getFileMessages.setInfiniteData(
        { fileId, limit: INFINITE_QUERY_LIMIT },
        (old) => {
          if (!old) {
            return {
              pages: [],
              pageParams: [],
            }
          }

          let newPages = [...old.pages]

          let latestPage = newPages[0]!

          latestPage.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessage: true,
            },
            ...latestPage.messages,
          ]

          newPages[0] = latestPage

          return {
            ...old,
            pages: newPages,
          }
        }
      )

      setIsLoading(true)

      return {
        previousMessages:
          previousMessages?.pages.flatMap(
            (page) => page.messages
          ) ?? [],
      }
    },
    onSuccess: async (stream) => {
      setIsLoading(false)

      if (!stream) {
        return toast({
          title: 'There was a problem sending this message',
          description:
            'Please refresh this page and try again',
          variant: 'destructive',
        })
      }

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let done = false

      // accumulated response
      let accResponse = ''

      while (!done) {
        const { value, done: doneReading } =
          await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)

        accResponse += chunkValue

        // append chunk to the actual message
        utils.getFileMessages.setInfiniteData(
          { fileId, limit: INFINITE_QUERY_LIMIT },
          (old) => {
            if (!old) return { pages: [], pageParams: [] }

            let isAiResponseCreated = old.pages.some(
              (page) =>
                page.messages.some(
                  (message) => message.id === 'ai-response'
                )
            )

            let updatedPages = old.pages.map((page) => {
              if (page === old.pages[0]) {
                let updatedMessages

                if (!isAiResponseCreated) {
                  updatedMessages = [
                    {
                      createdAt: new Date().toISOString(),
                      id: 'ai-response',
                      text: accResponse,
                      isUserMessage: false,
                    },
                    ...page.messages,
                  ]
                } else {
                  updatedMessages = page.messages.map(
                    (message) => {
                      if (message.id === 'ai-response') {
                        return {
                          ...message,
                          text: accResponse,
                        }
                      }
                      return message
                    }
                  )
                }

                return {
                  ...page,
                  messages: updatedMessages,
                }
              }

              return page
            })

            return { ...old, pages: updatedPages }
          }
        )
      }
    },

    onError: (_, __, context) => {
      setMessage(backupMessage.current)
      utils.getFileMessages.setData(
        { fileId },
        { messages: context?.previousMessages ?? [] }
      )
    },
    onSettled: async () => {
      setIsLoading(false)

      await utils.getFileMessages.invalidate({ fileId })
    },
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value)
  }

  const addMessage = () => sendMessage({ message })
 */

  return (
    <ChatContext.Provider
      value={{
        message,
        messages,
        handleSubmit,
        handleInputChange,
        isAiThinking,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

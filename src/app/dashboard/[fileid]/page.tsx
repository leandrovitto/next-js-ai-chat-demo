import Dashboard from "@/components/Dashboard";
import MaxWidthWrapper from "@/components/atoms/MaxWidthWrapper";
import ChatInput from "@/components/chat/ChatInput";
import ChatWrapper from "@/components/chat/ChatWrapper";

interface PageProps {
  params: {
    fileid: string;
  };
}

export default function FileIdPage({ params }: PageProps) {
  const { fileid } = params;

  //TODO: mock
  const file = {
    id: "123",
    name: "test.pdf",
    pages: 2,
  };

  //TODO: mock
  const plan = {
    isSubscribed: true,
  };

  return (
    <section>
      <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
          <div className="flex-[0.3] xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              {/*  <div className="text-xl">PDF:{fileid}</div> */}
              <div>
                <ul className="flex flex-col divide-y-2 gap-4">
                  <li>Chat 1</li>
                  <li>Chat 2</li>
                  <li>Chat 3</li>
                  <li>Chat 4</li>
                  <li>Chat 5</li>
                  <li>Chat 6</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex-1 border-t border-gray-200 dark:border-gray-800 lg:w-96 lg:border-l lg:border-t-0">
            <ChatWrapper isSubscribed={plan?.isSubscribed} fileId={file?.id} />
          </div>
        </div>
      </div>
    </section>
  );
}

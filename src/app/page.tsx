import MaxWidthWrapper from "@/components/atoms/MaxWidthWrapper";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
      <div className="mx-auto mb-10 sm:max-w-lg">
        <h1 className="text-6xl font-bold sm:text-7xl">Chat AI</h1>
        <p className="mt-5 text-gray-600 sm:text-lg">
          Converse with Your Documents, Experience the Magic!
        </p>
      </div>
    </MaxWidthWrapper>
  );
}

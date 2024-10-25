import Dashboard from "@/components/Dashboard";
import MaxWidthWrapper from "@/components/atoms/MaxWidthWrapper";

export default function DashboardPage() {
  return (
    <MaxWidthWrapper className="mb-8 mt-24 text-center max-w-5xl">
      <Dashboard />
    </MaxWidthWrapper>
  );
}

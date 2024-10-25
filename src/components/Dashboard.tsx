import Link from "next/link";
import React, { ReactElement } from "react";
import { buttonVariants } from "./ui/button";

const Dashboard = (): ReactElement => {
  return (
    <div>
      <div className="mx-auto mb-10 sm:max-w-lg">
        <p className="mt-5 text-gray-600 sm:text-lg">Dashboard</p>
        <Link
          href="/dashboard/1245"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
          })}
        >
          File 1
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

import Link from "next/link";
import MaxWidthWrapper from "../atoms/MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
/* import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server' */
import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import { DarkModeToggle } from "./DarkModeToggle";

const Navbar = () => {
  // const { getUser } = getKindeServerSession();
  const user = false; //getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-gray-700">
          <Link href="/" className="flex z-40 font-semibold">
            <span>Chat AI</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            <DarkModeToggle />
            {!user ? (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
                {/*  <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </RegisterLink> */}
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? "Your Account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../shared/Logo";
import { pageLinks } from "@/constants";
import { cn } from "@/lib/utils";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import { UserButton, useAuth } from "@clerk/nextjs";
import LogInButton from "./LogInButton";
import MobileMenu from "./MobileMenu/MobileMenu";
const Navbar = () => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <header className="mx-auto max-w-[1440px] lg:border-b lg:border-default-50 dark:lg:border-gray-850">
      <div className="flex h-[92px] items-center justify-between bg-white-100 px-6 dark:bg-gray-900 md:px-0 lg:py-7">
        <Link href="/">
          <Logo extraClasses="fill-gray-900 dark:fill-white-50 ml-[-10px]" />
        </Link>

        <div className="flex items-center justify-center gap-2.5">
          <div className="flex items-center justify-center text-base text-gray-700 dark:text-white-200">
            <ul className="hidden items-center justify-center gap-[30px] lg:flex">
              {pageLinks.map(({ href, label }) => (
                <Link href={href} key={href} className="flex items-center">
                  <li className={cn(pathname === href ? "text-primary" : "text-gray-700 hover:text-primary dark:text-white-200")}>{label}</li>
                </Link>
              ))}

              <Link href="/profile" className={`${!isSignedIn ? "hidden" : ""} `}>
                <li className={cn(pathname === "/profile" ? "text-primary" : "text-gray-700 hover:text-primary dark:text-white-200")}>Profile</li>
              </Link>
            </ul>

            {/* theme switcher icons on mobile screen */}
            <div className="flex items-center justify-center self-center lg:!hidden">
              <ThemeSwitch />
            </div>

            <div className={`${isSignedIn ? "hidden" : "hidden lg:block"} `}>
              <LogInButton classes="w-[80px] ml-2 md:ml-8 md:w-[110px] h-8 md:h-11 px-5 bg-primary text-white-200 rounded justify-center items-center gap-2 inline-flex text-center font-semibold" />
            </div>

            <div className="ml-4 flex items-center gap-5 md:ml-7">
              {/* clerk button */}
              <UserButton afterSignOutUrl="/" />

              {/* vertical divider */}
              <div className="hidden h-9 w-[1px] bg-default-50 dark:bg-gray-850 lg:flex"></div>

              {/* theme switcher icons on large screens */}
              <div className="hidden h-6 w-6 items-center justify-center gap-2.5 lg:flex">
                <ThemeSwitch />
              </div>
            </div>
          </div>

          {/* hamburger menu on mobile */}
          <div className="flex h-6 w-6 items-center justify-center lg:!hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../shared/Logo";
import { pageLinks } from "@/constants";
import { cn } from "@/lib/utils";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import { UserButton } from "@clerk/nextjs";
import LogInButton from "./LogInButton";
import MobileMenu from "./MobileMenu/MobileMenu";
import { useAuth } from "@clerk/nextjs";
const Navbar = () => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <header className="max-w-[1440px] mx-auto lg:border-b lg:border-default-50 dark:lg:border-gray-850 lg:border-opacity-40">
      <div className="px-6 md:px-0 dark:bg-gray-900 lg:py-7 h-[92px] bg-white justify-between items-center flex">
        <Link href="/">
          <Logo extraClasses="fill-gray-900 dark:fill-white-50 ml-[-10px]" />
        </Link>

        <div className="justify-center items-center gap-2.5 flex">
          <div className="flex items-center justify-center text-gray-700 dark:text-white-200 text-base-medium">
            <ul className="hidden lg:flex gap-[30px] justify-center items-center">
              {pageLinks.map(({ href, label }) => (
                <Link href={href} key={href} className="flex items-center">
                  <li className={cn(pathname === href ? "text-primary" : "text-gray-700 hover:text-primary dark:text-white-200")}>{label}</li>
                </Link>
              ))}

              <Link href="/profile" className={`${!isSignedIn ? "hidden" : ""} `}>
                <li className={cn(pathname === "/profile" ? "text-primary" : "text-gray-700 hover:text-primary dark:text-white-200")}>Profile</li>
              </Link>
            </ul>

            {/* theme switcher icons on mobile screen*/}
            <div className="lg:!hidden flex justify-center items-center self-center">
              <ThemeSwitch />
            </div>

            <div className={`${isSignedIn ? "hidden" : "hidden lg:block"} `}>
              <LogInButton classes="w-[80px] ml-2 md:ml-8 md:w-[110px] h-8 md:h-11 px-5 bg-primary text-white-200 rounded justify-center items-center gap-2 inline-flex text-center font-semibold" />
            </div>

            <div className="flex items-center gap-5 ml-4 md:ml-7">
              {/* clerk button */}
              <UserButton afterSignOutUrl="/" />

              {/* vertical divider */}
              <div className="hidden lg:flex w-[1px] h-9 bg-default-50 dark:bg-gray-850"></div>

              {/* theme switcher icons on large screens */}
              <div className="hidden w-6 h-6 justify-center items-center gap-2.5 lg:flex">
                <ThemeSwitch />
              </div>
            </div>
          </div>

          {/* hamburger menu on mobile */}
          <div className="w-6 h-6 flex justify-center items-center lg:!hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

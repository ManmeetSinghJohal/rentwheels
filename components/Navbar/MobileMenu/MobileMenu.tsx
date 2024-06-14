"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { pageLinks } from "@/constants";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import HomeIcon from "./HomeIcon";
import SearchIcon from "./SearchIcon";
import PlusIcon from "./PlusIcon";
import MenuIcon from "../MenuIcon";
import { X } from "lucide-react";
import LogInButton from "../LogInButton";
import { useUser } from "@clerk/nextjs";
import LogOutButton from "./LogoutButton";

const MobileMenu = () => {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transparent p-0 cursor-pointer outline-none h-auto rounded-none hover:bg-transparent">
          <MenuIcon
            size={24}
            extraClasses="stroke-gray-700 dark:stroke-gray-200"
          />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[350px] bg-white-200 dark:bg-gray-850 dark:border-none rounded-[10px] px-5 py-6"
        isCustomCloseIcon={true}
      >
        <DialogHeader className="mb-[30px]">
          <Link href="/" className="items-center">
            <Logo
              extraClasses="fill-gray-900 dark:fill-white-50"
              isFixed={true}
            />
          </Link>

          <DialogClose className="absolute right-[16px] top-[12px]">
            <X className="dark:text-default-50" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="mb-5">
          <ul className="w-full flex flex-col gap-2 justify-center items-center">
            {pageLinks.map(({ href, label, icon }) => (
              <Link
                href={href}
                key={href}
                className={`${cn(
                  pathname === href
                    ? "bg-primary shadow-inner text-white-200"
                    : "text-gray-700 dark:text-white-200"
                )} w-full p-3 rounded justify-start gap-1.5 flex items-center text-sm font-medium`}
                onClick={closeMenu}
              >
                {icon === "Home" && (
                  <HomeIcon
                    size={18}
                    extraClasses={`${cn(
                      pathname === href
                        ? "fill-white-50"
                        : "fill-gray-700 dark:fill-white-50"
                    )}`}
                  />
                )}

                {icon === "Search" && (
                  <SearchIcon
                    size={18}
                    extraClasses={`${cn(
                      pathname === href
                        ? "fill-white-50"
                        : "fill-gray-700 dark:fill-white-50"
                    )}`}
                  />
                )}

                {icon === "Plus" && (
                  <PlusIcon
                    size={18}
                    extraClasses={`${cn(
                      pathname === href
                        ? "fill-white-50"
                        : "fill-gray-700 dark:fill-white-50"
                    )}`}
                  />
                )}

                <li className="">{label}</li>
              </Link>
            ))}
          </ul>
        </div>

        <DialogFooter className="flex sm:flex-col sm:space-x-0 gap-2.5 items-center">
          <div className={`${isSignedIn ? "hidden" : "w-full"}`}>
            <LogInButton
              classes="w-full text-center text-primary dark:text-blue-300 leading-[21px] rounded border border-default-50 dark:border-none py-3.5 text-sm font-semibold bg-white-50 dark:bg-gray-700"
              onClick={closeMenu}
            />
          </div>

          {/* if logged in */}
          <div
            className={`${
              isSignedIn
                ? "w-full justify-center flex flex-col gap-2.5"
                : "hidden"
            }`}
          >
            <Link
              href="/profile"
              onClick={closeMenu}
              className="w-full flex items-center justify-center text-center text-primary dark:text-blue-300 leading-[21px] rounded border border-default-50 gap-1.5 dark:border-none py-3.5 text-sm font-semibold bg-white-50 dark:bg-gray-700"
            >
              <Image
                src={user?.imageUrl || ""}
                alt="profile"
                width={20}
                height={20}
                className={`${!user?.hasImage && "hidden"} rounded-full`}
              />
              My Profile
            </Link>

            <LogOutButton
              classes="w-full text-center text-white-50 leading-[21px] rounded py-3.5 text-sm font-semibold bg-red-500 h-auto"
              onClick={closeMenu}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;

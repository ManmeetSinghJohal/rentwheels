"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { pageLinks } from "@/constants";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

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
        <Button className="h-auto cursor-pointer rounded-none bg-transparent p-0 outline-none hover:bg-transparent">
          <MenuIcon size={24} extraClasses="stroke-gray-700 dark:stroke-gray-200" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[350px] rounded-[10px] bg-white-200 px-5 py-6 dark:border-none dark:bg-gray-850" isCustomCloseIcon={true}>
        <DialogHeader className="mb-[30px]">
          <Link href="/" className="items-center">
            <Logo extraClasses="fill-gray-900 dark:fill-white-50" isFixed={true} />
          </Link>

          <DialogClose className="absolute right-[16px] top-[12px]">
            <X className="dark:text-default-50" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="mb-5">
          <ul className="flex w-full flex-col items-center justify-center gap-2">
            {pageLinks.map(({ href, label, icon }) => (
              <Link href={href} key={href} className={`${cn(pathname === href ? "bg-primary shadow-inner text-white-200" : "text-gray-700 dark:text-white-200")} flex w-full items-center justify-start gap-1.5 rounded p-3 text-sm font-medium`} onClick={closeMenu}>
                {icon === "Home" && <HomeIcon size={18} extraClasses={`${cn(pathname === href ? "fill-white-50" : "fill-gray-700 dark:fill-white-50")}`} />}

                {icon === "Search" && <SearchIcon size={18} extraClasses={`${cn(pathname === href ? "fill-white-50" : "fill-gray-700 dark:fill-white-50")}`} />}

                {icon === "Plus" && <PlusIcon size={18} extraClasses={`${cn(pathname === href ? "fill-white-50" : "fill-gray-700 dark:fill-white-50")}`} />}

                <li className="">{label}</li>
              </Link>
            ))}
          </ul>
        </div>

        <DialogFooter className="flex items-center gap-2.5 sm:flex-col sm:space-x-0">
          <div className={`${isSignedIn ? "hidden" : "w-full"}`}>
            <LogInButton classes="w-full text-center text-primary dark:text-blue-300 leading-[21px] rounded border border-default-50 dark:border-none py-3.5 text-sm font-semibold bg-white-50 dark:bg-gray-700" onClick={closeMenu} />
          </div>

          {/* if logged in */}
          <div className={`${isSignedIn ? "flex w-full flex-col justify-center gap-2.5" : "hidden"}`}>
            <Link href="/profile" onClick={closeMenu} className="flex w-full items-center justify-center gap-1.5 rounded border border-default-50 bg-white-50 py-3.5 text-center text-sm font-semibold leading-[21px] text-primary dark:border-none dark:bg-gray-700 dark:text-blue-300">
              <Image src={user?.imageUrl || ""} alt="profile" width={20} height={20} className={`${!user?.hasImage && "hidden"} rounded-full`} />
              My Profile
            </Link>

            <LogOutButton classes="w-full text-center text-white-50 leading-[21px] rounded py-3.5 text-sm font-semibold bg-red-500 h-auto" onClick={closeMenu} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;

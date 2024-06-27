"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useUser } from "@clerk/nextjs";
import { Loader2, X } from "lucide-react";

import ProfileImageDialog from "./ProfileImageDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { debounce, showToast } from "@/lib/utils";

const UserProfileDialog = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUsername(user.username || "");
    }
  }, [user]);

  if (!isSignedIn) {
    return null;
  }

  const imageUrl = user.imageUrl;

  const setFullName = debounce((fullName: string) => {
    const [first, ...rest] = fullName.split(" ");
    setFirstName(first || "");
    setLastName(rest.join(" ") || "");
  }, 300);

  const updateUser = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!firstName || !lastName || !username) {
      console.error("Invalid user data:", { firstName, lastName, username });
      return;
    }

    try {
      setIsLoading(true);

      await user.update({
        firstName,
        lastName,
        username,
      });
      showToast("Success", "User updated successfully");

      setOpen(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      showToast("Error", "Failed to update user");
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageDialogOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
    setOpenImageDialog(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-[110px] bg-secondary text-center text-xs font-bold text-white-50 hover:bg-primary">Edit Profile</Button>
        </DialogTrigger>

        <DialogContent className="rounded-[10px] border-none bg-white-50 px-4 py-10 dark:bg-gray-850 sm:max-w-[359px] lg:max-w-[500px] lg:p-[50px]" isCustomCloseIcon={true}>
          <form onSubmit={updateUser}>
            <DialogHeader className="mb-[30px] lg:mb-9">
              <DialogTitle className="base-bold dark:text-white-50">Edit Profile</DialogTitle>
              <DialogDescription className="body-medium text-gray-400">Please enter your info</DialogDescription>
            </DialogHeader>

            <DialogClose className="absolute right-4 top-10 lg:right-[50px] lg:top-[50px]">
              <X className="text-gray-800 dark:text-white-200" />
              <span className="sr-only">Close</span>
            </DialogClose>

            <div className="mb-9 flex flex-col gap-[30px]">
              <div className="flex items-center justify-start gap-[18px]">
                <Image src={imageUrl} alt="profile-picture" width={71} height={71} className="h-[71px] w-[71px] rounded-full lg:h-[86px] lg:w-[86px]" />
                <Button type="button" className="h-11 w-[150px] rounded-[7px] bg-white-100 text-center text-xs font-semibold text-blue-100 dark:bg-gray-800" onClick={(e) => handleImageDialogOpen(e)}>
                  Upload new picture
                </Button>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-3">
                <Label htmlFor="name" className="font-semibold dark:text-white-50">
                  Full Name
                </Label>
                <Input className="body-bold h-[46px] w-full rounded-md bg-white-200 dark:bg-gray-800 dark:text-white-200" id="name" value={`${firstName} ${lastName}`} onChange={(e) => setFullName(e.target.value)} />
              </div>

              <div className="flex w-full flex-col items-start justify-start gap-3">
                <Label htmlFor="role" className="font-semibold dark:text-white-50">
                  Username
                </Label>

                <Input className="body-bold h-[46px] w-full rounded-md bg-white-200 dark:bg-gray-800 dark:text-white-200" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>

            <DialogFooter className="justify-center">
              <Button type="submit" className="h-14 w-full rounded-[10px] bg-primary px-5 text-white-50">
                {isLoading ? (
                  <div className="flex">
                    <Loader2 className="mr-2 animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  <div>Update Profile</div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Cover Image Dialog */}
      <ProfileImageDialog open={openImageDialog} onOpenChange={setOpenImageDialog} onDialogClose={() => setOpen(true)} hidden={true} />
    </>
  );
};

export default UserProfileDialog;

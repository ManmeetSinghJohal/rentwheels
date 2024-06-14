"use client";

import { useEffect, useState } from "react";
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
          <Button className="w-[110px] bg-secondary hover:bg-primary text-center text-white-50 text-xs font-bold">Edit Profile</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[359px] lg:max-w-[500px] bg-white-50 dark:bg-gray-850 border-none rounded-[10px] px-4 py-10 lg:p-[50px]" isCustomCloseIcon={true}>
          <form onSubmit={updateUser}>
            <DialogHeader className="mb-[30px] lg:mb-9">
              <DialogTitle className="base-bold dark:text-white-50">Edit Profile</DialogTitle>
              <DialogDescription className="body-medium text-gray-400">Please enter your info</DialogDescription>
            </DialogHeader>

            <DialogClose className="absolute right-4 top-10 lg:right-[50px] lg:top-[50px]">
              <X className="text-gray-800 dark:text-white-200" />
              <span className="sr-only">Close</span>
            </DialogClose>

            <div className="flex flex-col gap-[30px] mb-9">
              <div className="flex items-center justify-start gap-[18px]">
                <Image src={imageUrl} alt="profile-picture" width={71} height={71} className="rounded-full w-[71px] h-[71px] lg:w-[86px] lg:h-[86px]" />
                <Button type="button" className="w-[150px] h-11 bg-white-100 dark:bg-gray-800 rounded-[7px] text-center text-blue-100 text-xs font-semibold" onClick={(e) => handleImageDialogOpen(e)}>
                  Upload new picture
                </Button>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-3">
                <Label htmlFor="name" className="body-semibold dark:text-white-50">
                  Full Name
                </Label>
                <Input className="w-full h-[46px] bg-white-200 dark:bg-gray-800 dark:text-white-200 body-bold rounded-md" id="name" value={`${firstName} ${lastName}`} onChange={(e) => setFullName(e.target.value)} />
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-3">
                <Label htmlFor="role" className="body-semibold dark:text-white-50">
                  Username
                </Label>

                <Input className="w-full h-[46px] bg-white-200 dark:bg-gray-800 dark:text-white-200 body-bold rounded-md" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>

            <DialogFooter className="justify-center">
              <Button type="submit" className="h-14 w-full px-5 bg-primary rounded-[10px] text-white-50">
                {isLoading ? (
                  <div className="flex">
                    <Loader2 className="animate-spin mr-2" />
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

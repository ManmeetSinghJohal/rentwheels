"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import { useDropzone } from "react-dropzone";
import { X, Loader2 } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { isBased64Image, showToast, handleImageUpload } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { updateUserProfileImg } from "@/lib/actions/userActions";

type ProfileImageDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onDialogClose?: () => void;
  hidden: boolean;
};

const ProfileImageDialog = ({ open, onOpenChange, onDialogClose, hidden = false }: ProfileImageDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const onImageChange = (newImage: string) => {
    setImageUrl(newImage);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    handleImageUploadForDropzone(acceptedFiles[0]);
  }, []);

  const handleImageUploadForDropzone = (file: File) => {
    const fileReader = new FileReader();
    if (file && file.type.includes("image")) {
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        setImageUrl(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.includes("image")) return;
      handleImageUpload(file, onImageChange);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      setIsUploaded(true);
    }
  }, [files]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const blob = imageUrl;

    try {
      setIsLoading(true);
      const hasImageChanged = isBased64Image(blob);

      if (hasImageChanged) {
        if (!isSignedIn) {
          console.error("You need to be signed in to add a profile image.");
          redirect("/login");
        }

        const imgRes = await user.setProfileImage({ file: imageUrl });

        if (!imgRes) {
          throw new Error("Failed to set profile image to Clerk");
        }

        try {
          await updateUserProfileImg({
            userId: user.id,
            profileImg: imgRes.publicUrl,
          });
          console.log("Image saved to user profile");
          showToast("Success!", "Your profile image has been successfully added.");
        } catch (error) {
          console.error("Failed to update user profile image:", error);
          showToast("Error", "Failed to update user profile image.");
        }
      }
      handleClose();
    } catch (error) {
      showToast("Error", "Failed to add profile image");
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsUploaded(false);
    }
  };

  const handleClose = () => {
    onOpenChange?.(false);
    onDialogClose?.();

    router.refresh();
  };

  return (
    <div className={hidden ? "hidden" : ""}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="rounded-[10px] border-none bg-white-50 px-4 py-10 dark:bg-gray-850 sm:max-w-[359px] lg:max-w-[500px] lg:p-[50px]" isCustomCloseIcon={true}>
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-[37px] lg:mb-12">
              <DialogTitle className="base-bold dark:text-white-50">Update Profile Image</DialogTitle>
              <DialogDescription className="body-medium text-gray-400">Please select a new picture</DialogDescription>
            </DialogHeader>

            <DialogClose className="absolute right-4 top-10 lg:right-[50px] lg:top-[50px]" onClick={handleClose}>
              <X className="text-gray-800 dark:text-white-200" />
              <span className="sr-only">Close</span>
            </DialogClose>

            <div className="mb-6 flex flex-col gap-[30px] lg:mb-[34px]">
              <div className="flex w-full flex-col items-start justify-start gap-3">
                <Label htmlFor="image" className="font-bold dark:text-white-50">
                  Upload Image
                </Label>

                {/* Drop files component here */}
                <Input {...getInputProps()} type="file" accept="image/*" className="hidden" onChange={(e) => onFileInputChange(e)} ref={fileInputRef} />
                <div {...getRootProps()} className="flex h-[183px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed dark:border-gray-400">
                  {isUploaded ? (
                    <Image src={imageUrl} alt="Uploaded image" width={150} height={100} className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Image src="/assets/icons/Upload.svg" alt="upload icon" width={30} height={30} />
                      <h1 className="font-plusJakartaSans text-[14px] font-medium dark:text-gray-400">
                        Drag and drop images, or <span className="font-semibold text-primary">Browse</span>
                      </h1>
                      <p className="font-plusJakartaSans text-[12px] font-normal text-gray-400 dark:text-white-100">High resolution images (png, jpg, gif)</p>
                    </div>
                  )}
                </div>
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
                  <div>Save Image</div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileImageDialog;

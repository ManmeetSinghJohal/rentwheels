"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "react-dropzone";
import { X, Loader2 } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { isBased64Image, showToast, handleImageUpload } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { updateUserCoverImg } from "@/lib/actions/user.action";

type CoverImageDialogProps = {
  onCoverImageUpdated: (newCoverImageUrl: string) => void;
};

const CoverImageDialog = ({ onCoverImageUpdated }: CoverImageDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { startUpload } = useUploadThing("media");

  const { isSignedIn, user } = useUser();

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

  const uploadImage = async (blob: string, files: File[]): Promise<string> => {
    if (!isSignedIn) {
      throw new Error("You need to be signed in to add a cover image.");
    }

    // Upload the image to Uploadthing
    let imgUrl = "";
    try {
      const imgRes = await startUpload(files);
      if (!imgRes || !imgRes[0].url) {
        throw new Error("Image upload failed");
      }
      imgUrl = imgRes[0].url;
      setImageUrl(imgUrl);
    } catch (error) {
      console.error("Image upload error:", error);
      throw new Error("Failed to upload image");
    }

    // Update user cover image in database
    try {
      await updateUserCoverImg({
        userId: user.id,
        coverImg: imgUrl,
      });
      showToast("Success!", "Your cover image has been successfully added.");
    } catch (error) {
      console.error("Failed to update user cover image:", error);
      showToast("Error", "Failed to update user cover image.");
      throw new Error("Failed to update cover image on profile");
    }

    return imgUrl;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const blob = imageUrl;

    try {
      setIsLoading(true);
      const hasImageChanged = isBased64Image(blob);

      if (hasImageChanged) {
        const newCoverImageUrl = await uploadImage(blob, files);
        onCoverImageUpdated(newCoverImageUrl);
      }
      setOpen(false);
    } catch (error) {
      const errorMessage = (error as Error).message;
      showToast("Error", errorMessage);
    } finally {
      setIsLoading(false);
      setIsUploaded(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute z-5 right-[13px] bottom-2.5 text-white-50 bg-white-50 h-6 bg-opacity-40 text-[10px] font-normal rounded-[5px] hover:bg-white-50 hover:bg-opacity-60 py-1.5 lg:right-[50px]">Edit Cover</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[359px] lg:max-w-[500px] bg-white-50 dark:bg-gray-850 border-none rounded-[10px] px-4 py-10 lg:p-[50px]" isCustomCloseIcon={true}>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-[37px] lg:mb-12">
            <DialogTitle className="base-bold dark:text-white-50">Edit Cover Image</DialogTitle>
            <DialogDescription className="body-medium text-gray-400">Please upload a new cover image</DialogDescription>
          </DialogHeader>

          <DialogClose className="absolute right-4 top-10 lg:right-[50px] lg:top-[50px]">
            <X className="text-gray-800 dark:text-white-200" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="flex flex-col gap-[30px] mb-6 lg:mb-[34px]">
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <Label htmlFor="image" className="body-semibold dark:text-white-50">
                Upload Image
              </Label>

              {/* Drop files component here */}
              <Input {...getInputProps()} type="file" accept="image/*" className="hidden" onChange={(e) => onFileInputChange(e)} ref={fileInputRef} />
              <div {...getRootProps()} className="w-full border-dashed dark:border-gray-400 rounded-md border-2 h-[183px] flex flex-col gap-4 items-center justify-center cursor-pointer">
                {isUploaded ? (
                  <Image src={imageUrl} alt="Uploaded image" width={150} height={100} className="object-cover" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Image src="/assets/icons/Upload.svg" alt="upload icon" width={30} height={30} className="object-cover" />
                    <h1 className="font-plusJakartaSans font-medium text-[14px] dark:text-gray-400">
                      Drag and drop images, or <span className="text-primary font-semibold">Browse</span>
                    </h1>
                    <p className="font-plusJakartaSans font-normal text-[12px] text-gray-400 dark:text-white-100">High resolution images (png, jpg, gif)</p>
                  </div>
                )}
              </div>
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
                <div>Update Cover</div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageDialog;

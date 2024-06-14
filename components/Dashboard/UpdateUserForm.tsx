"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/utils";
import { User } from "@prisma/client";
import { UpdateUserSchema } from "@/lib/validations";
import { updateClerkUser } from "@/lib/actions/clerk.action";
import { useUploadThing } from "@/lib/uploadthing";

const UpdateUserForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing("media");

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      name: user?.name,
      role: user?.role || "USER",
      picture: user?.picture || "",
    },
  });

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files ? event.target.files[0] : null;
      if (!selectedFile || !selectedFile.type.includes("image")) {
        setFile(null);
        form.setValue("picture", "");
        return;
      }

      setFile(selectedFile);
      form.setValue("picture", selectedFile.name);
    },
    [form]
  );

  const uploadFile = async (file: File) => {
    const imgRes = await startUpload([file]);
    if (!imgRes || !imgRes[0].url) {
      throw new Error("Failed to upload picture");
    }
    return imgRes[0].url;
  };

  const onSubmit = async (data: z.infer<typeof UpdateUserSchema>) => {
    try {
      setIsLoading(true);
      let pictureUrl = file ? await uploadFile(file) : "";

      const userData = {
        ...data,
        picture: pictureUrl || user.picture,
        userId: user.clerkId,
      };

      const { isSuccess } = await updateClerkUser(userData);
      if (!isSuccess) {
        throw new Error("Failed to update user on Clerk");
      }

      showToast("Success", "User updated successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      showToast("Error", "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* Form fields */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Picture Field */}
        <FormField
          control={form.control}
          name="picture"
          render={() => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <>
                  <Input {...form.register("picture")} type="file" id="picture" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <label htmlFor="picture" className="bg-gray-100 text-gray-700 h-[56px] dark:bg-gray-700 dark:text-white-50 flex justify-center items-center rounded-[7px] cursor-pointer" aria-label="Upload picture">
                    {file?.name || "Upload Picture"}
                  </label>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl className="dark:bg-gray-700 border-0 outline-none">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="bg-white-200 text-gray-700 dark:bg-gray-700 h-[56px] rounded-[7px] dark:text-white-50 border-0 outline-none">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white-200 z-10 text-gray-700 dark:bg-gray-700 dark:text-white-50 border-0 outline-none">
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-1/3 mt-5 p-8 bg-primary text-white-50 font-bold font-plusJakartaSans text-[16px] border-none rounded-lg cursor-pointer">
          {isLoading ? (
            <div className="flex">
              <Loader2 className="animate-spin mr-2" />
              Saving...
            </div>
          ) : (
            <div>Update User</div>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
function startUpload(arg0: File[]) {
  throw new Error("Function not implemented.");
}

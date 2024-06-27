"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadThing } from "@/lib/uploadthing";

import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/utils";
import { createClerkUser } from "@/lib/actions/clerk.action";
import { Loader2 } from "lucide-react";
import { CreateUserSchema } from "@/lib/validations";

const CreateUserForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing("media");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      picture: "",
      role: "USER",
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

  const onSubmit = async (data: z.infer<typeof CreateUserSchema>) => {
    try {
      setIsLoading(true);
      const pictureUrl = file ? await uploadFile(file) : "";

      const userData = { ...data, picture: pictureUrl };

      const { isSuccess } = await createClerkUser(userData);
      if (!isSuccess) {
        throw new Error("Failed to create user on Clerk");
      }

      showToast("Success", `User created successfully`);
      form.reset();
    } catch (error) {
      console.error(error);
      showToast("Error", "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap items-center justify-evenly gap-1">
        {/* Form fields */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-5 w-1/3">
              <FormLabel>Username</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} className="h-[56px] rounded-[7px] bg-white-200 text-gray-850" placeholder="Add a username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First Name Field */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="mb-5 w-1/3">
              <FormLabel>First Name</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} value={field.value} className="h-[56px] rounded-[7px] bg-white-200 text-gray-850" placeholder="John" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name Field */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="mb-5 w-1/3">
              <FormLabel>Last Name</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} value={field.value} className="h-[56px] rounded-[7px] bg-white-200 text-gray-850" placeholder="Doe" />
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
            <FormItem className="mb-5 w-1/3">
              <FormLabel>Email</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} value={field.value} className="h-[56px] rounded-[7px] bg-white-200 text-gray-850" placeholder="Add an email" />
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
            <FormItem className="mb-5 w-1/3">
              <FormLabel htmlFor="picture">Picture</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <>
                  <Input {...form.register("picture")} type="file" id="picture" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <label htmlFor="picture" className="flex h-[56px] cursor-pointer items-center justify-center rounded-[7px] bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white-50" aria-label="Upload picture">
                    {file?.name || "Upload Picture"}
                  </label>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="mb-5 w-1/3">
              <FormLabel>Role</FormLabel>
              <FormControl className="border-0 outline-none dark:bg-gray-700">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-[56px] rounded-[7px] border-0 bg-white-200 text-gray-700 outline-none dark:bg-gray-700 dark:text-white-50">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="z-10 border-0 bg-white-200 text-gray-700 outline-none dark:bg-gray-700 dark:text-white-50">
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-5 w-1/3 cursor-pointer rounded-lg border-none bg-primary p-8 font-plusJakartaSans text-[16px] font-bold text-white-50">
          {isLoading ? (
            <div className="flex">
              <Loader2 className="mr-2 animate-spin" />
              Saving...
            </div>
          ) : (
            <div>Create New User</div>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateUserForm;

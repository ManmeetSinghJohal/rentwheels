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
      let pictureUrl = file ? await uploadFile(file) : "";

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
            <FormItem className="w-1/3 mb-5">
              <FormLabel>Username</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} className="bg-white-200 text-gray-850 h-[56px] rounded-[7px]" placeholder="Add a username" />
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
            <FormItem className="w-1/3 mb-5">
              <FormLabel>First Name</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} value={field.value} className="bg-white-200 text-gray-850 h-[56px] rounded-[7px]" placeholder="John" />
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
            <FormItem className="w-1/3 mb-5">
              <FormLabel>Last Name</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} value={field.value} className="bg-white-200 text-gray-850 h-[56px] rounded-[7px]" placeholder="Doe" />
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
            <FormItem className="w-1/3 mb-5">
              <FormLabel>Email</FormLabel>
              <FormControl className="dark:bg-gray-700">
                <Input {...field} value={field.value} className="bg-white-200 text-gray-850 h-[56px] rounded-[7px]" placeholder="Add an email" />
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
            <FormItem className="w-1/3 mb-5">
              <FormLabel htmlFor="picture">Picture</FormLabel>
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

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-1/3 mb-5">
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
            <div>Create New User</div>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateUserForm;

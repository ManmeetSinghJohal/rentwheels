"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "react-dropzone";
import { useUser } from "@clerk/nextjs";

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form";
import { AddCarSchema } from "@/lib/validations";
import { Button } from "../ui/button";
import { isBased64Image } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { addCar } from "@/lib/actions/car.action";
import { carCapacities, carTransmissions, carTypes } from "@/constants";
import FormInput from "./sharedFields/FormInput";
import FormSelect from "./sharedFields/FormSelect";
import FormCombobox from "./sharedFields/FormCombobox";
import FormLocation from "./sharedFields/FormLocation";
import { getBlurData } from "@/lib/actions/utils.action";

const AddCarForm = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { startUpload } = useUploadThing("media");

  const { user: userId } = useUser();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    handleImageUploadForDropzone(acceptedFiles[0]);
  }, []);

  const handleImageUploadForDropzone = (file: File) => {
    const fileReader = new FileReader();
    if (file && file.type.includes("image")) {
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        form.setValue("imgUrl", imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const form = useForm<z.infer<typeof AddCarSchema>>({
    resolver: zodResolver(AddCarSchema),
    defaultValues: {
      title: "",
      type: "",
      price: 0,
      capacity: "",
      transmission: "",
      location: "",
      fuelCapacity: 0,
      description: "",
      imgUrl: "",
    },
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      setIsUploaded(true);
    }
  }, [files]);

  const onSubmit = async (values: z.infer<typeof AddCarSchema>) => {
    const blob = values.imgUrl;

    try {
      setIsLoading(true);
      const hasImageChanged = isBased64Image(blob);

      if (hasImageChanged) {
        const userIdString = userId?.id;
        if (!userIdString) {
          console.error("You need to be signed in to add a car.");
          redirect("/login");
        }
        const imgRes = await startUpload(files);
        if (imgRes && imgRes[0].url) {
          values.imgUrl = imgRes[0].url;
        }

        const { blurDataURL } = await getBlurData(values.imgUrl);

        const carData = {
          title: values.title,
          type: values.type,
          price: Number(values.price),
          capacity: Number(values.capacity),
          transmission: values.transmission,
          location: values.location,
          fuelCapacity: Number(values.fuelCapacity),
          description: values.description,
          images: values.imgUrl,
          blurDataURL: blurDataURL,
          userId: userIdString,
        };
        addCar(carData);
        router.push("/");
        toast({
          title: "Success!",
          description: "Your car has been successfully added.",
          variant: "default",
          className: "dark:bg-gray-850 dark:text-white-50 bg-white-200 text-gray-900",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsUploaded(false);
      form.reset();
    }
  };

  return (
    <div className="w-full px-6 py-10 dark:bg-gray-850 rounded-[10px]">
      <h1 className="font-plusJakartaSans font-bold text-[20px] text-gray-900 dark:text-white-50">Add a Car for Rent</h1>
      <p className="mt-[10px] text-gray-400 font-plusJakartaSans text-[14px] font-medium">Please enter your car info</p>
      <div className="mt-[34px] space-y-8">
        <h1 className="text-primary font-plusJakartaSans font-extrabold text-[18px]">CAR INFO</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <div className=" sm:grid sm:grid-cols-2 sm:gap-8 space-y-4 sm:space-y-0 ">
              <FormInput form={form} name="title" label="Car Model" labelClassName="font-bold text-[14px] sm:text-[16px]" placeholder="Enter your car model" />
              <FormCombobox form={form} name="type" label="Car Type" labelClassName="font-bold text-[14px] sm:text-[16px]" placeholder="Search by Type" constant={carTypes} />
              <FormInput form={form} name="price" label="Rent Price" labelClassName="font-bold text-[14px] sm:text-[16px]" placeholder="Price in dollar" />
              <FormSelect form={form} name="capacity" label="Car Capacity" labelClassName="font-bold text-[14px] sm:text-[16px]" placeholder="Select Capacity" constant={carCapacities} />
              <FormSelect form={form} name="transmission" label="Transmission" labelClassName="font-bold text-[14px] sm:text-[16px]" placeholder="Select Transmission" constant={carTransmissions} />
              <FormLocation form={form} name="location" label="Location" labelClassName="sm:text-[16px] text-[14px]" placeholder="Search your City" />
              <FormInput form={form} name="fuelCapacity" label="Fuel Capacity" labelClassName="font-bold text-[14px] sm:text-[16px]" placeholder="Fuel Cacity in Liters" />
              <FormInput form={form} name="description" label="Short Description" labelClassName="font-bold text-[14px] sm:text-[16px]" placeholder="Enter a short description" />
            </div>

            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-plusJakartaSans font-bold text-[16px] dark:text-white-50">Upload Images</FormLabel>
                  <FormControl>
                    <>
                      <Input {...getInputProps()} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, field.onChange)} ref={fileInputRef} />
                      <div {...getRootProps()} className="border-dashed dark:border-gray-400 rounded-md border-2 h-[327px] flex flex-col gap-4 items-center justify-center cursor-pointer">
                        {isUploaded ? (
                          <Image src={field.value} alt="Uploaded image" width={300} height={200} objectFit="contain" />
                        ) : (
                          <div className="flex flex-col items-center">
                            <Image src="/assets/icons/Upload.svg" alt="upload icon" width={30} height={30} />
                            <h1 className="font-plusJakartaSans font-medium text-[14px] dark:text-gray-400">
                              Drag and drop images, or <span className="text-primary font-semibold">Browse</span>
                            </h1>
                            <p className="font-plusJakartaSans font-normal text-[12px] text-gray-400 dark:text-white-100">High resolution images (png, jpg, gif)</p>
                          </div>
                        )}
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex sm:justify-end">
              <Button className="sm:w-[148px] h-[56px] w-full sm:px-5 text-white-50 font-bold font-plusJakartaSans text-[16px] rounded-[10px]" type="submit">
                {isLoading ? (
                  <div className="flex">
                    <Loader2 className="animate-spin mr-2" />
                    Uploading...
                  </div>
                ) : (
                  <div>Register Car</div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddCarForm;

import { toast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";
import { Booking, Car, User } from "@prisma/client";
import { getResourceNameById } from "./actions/resource.action";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isBased64Image = (imageData: string) => {
  const regex = /^\s*data:(image\/(png|jpg|jpeg|gif|bmp));base64,/;
  return regex.test(imageData);
};

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);
  console.log("current url", currentUrl);
  if (value) {
    currentUrl[key] = value;
  } else {
    delete currentUrl[key];
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
export const showToast = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: "default",
    className: "dark:bg-gray-850 dark:text-white-50 bg-white-200 text-gray-900",
  });
};

export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const handleImageUpload = (file: File, onImageChange: (dataUrl: string) => void) => {
  const fileReader = new FileReader();

  fileReader.onload = (event) => {
    const imageDataUrl = event.target?.result?.toString() || "";
    onImageChange(imageDataUrl);
  };

  fileReader.onerror = (error) => {
    console.error("Error reading file:", error);
    showToast("Error", "Error reading file");
  };

  fileReader.readAsDataURL(file);
};

export function formatPickUpTime(hour: string): string {
  const parsedHour = parseInt(hour, 10);
  if (parsedHour < 12) {
    return `${hour} AM`;
  } else {
    return `${parsedHour - 12} PM`;
  }
}
export function howManyDays(pickUpDate: string, dropOffDate: string): number {
  const date1 = new Date(pickUpDate);
  const date2 = new Date(dropOffDate);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export const handleError = (error: unknown, message: string, id?: number): never => {
  const errorMessage = id ? `${message} ${id}` : message;
  console.error(errorMessage, error instanceof Error ? error.message : error);
  throw new Error(errorMessage);
};

export const getTitleFromUrl = async (url: string) => {
  const segments = url.split("/").filter(Boolean);

  if (segments.length === 1) {
    // Only one segment (e.g., "dashboard")
    return capitalizeFirstLetter(segments[0]);
  }

  const resource = segments[segments.length - 1];
  const actionOrId = segments.length > 2 ? segments[segments.length - 2] : null;

  // Handling cases like "/dashboard/users/new"
  if (resource === "new" && actionOrId !== null) {
    return `New ${capitalizeFirstLetter(actionOrId?.slice(0, -1))}`;
  }

  // Handling cases like "/dashboard/users/1"
  if (!isNaN(parseInt(resource)) && actionOrId !== null) {
    const name = await getResourceNameById(actionOrId, resource);
    return `${capitalizeFirstLetter(actionOrId.slice(0, -1))}: ${name}`;
  }

  // Default case, like "/dashboard/users"
  return capitalizeFirstLetter(resource);
};

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getResourceType = (resource: User | Booking | Car): "user" | "booking" | "car" => {
  if (isUserResource(resource)) {
    return "user";
  } else if (isBookingResource(resource)) {
    return "booking";
  } else if (isCarResource(resource)) {
    return "car";
  }
  throw new Error("Unknown resource type");
};

const isUserResource = (resource: any): resource is User => {
  return "clerkId" in resource;
};

const isBookingResource = (resource: any): resource is Booking => {
  return "pickupDateTime" in resource;
};

const isCarResource = (resource: any): resource is Car => {
  return "rentPrice" in resource;
};

export const setProfilePicture = (user: any) => {
  return user?.publicMetadata.picture || user?.imageUrl || "images/default-profile.png";
};

"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { getResourceType, showToast } from "@/lib/utils";
import { Booking, Car, User } from "@prisma/client";

type AdminDeleteDialogProps = {
  resource: User | Booking | Car;
  url: string;
};

const AdminDeleteDialog = ({ resource, url }: AdminDeleteDialogProps) => {
  const resourceType = useRef(getResourceType(resource));
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const description = `This action cannot be undone. This will permanently delete this ${resourceType.current}.`;

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsLoading(true);

    let clerkId = null;
    if (resourceType.current === "user") {
      clerkId = (resource as User).clerkId;
    }

    try {
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ id: resource.id, clerkId, resourceType: resourceType.current }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!result.isSuccess) {
        throw new Error(`Failed to delete ${resourceType.current}`);
      }

      showToast("Success", `${resourceType.current} deleted successfully`);
    } catch (error) {
      showToast("Error", `Failed to delete ${resourceType.current}`);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-50 text-gray-500 dark:border-gray-600 dark:bg-gray-850 dark:text-white-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-3">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel className="mt-0 outline-none">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="text-white-50">
            {isLoading ? (
              <div className="flex">
                <Loader2 className="mr-2 animate-spin" />
                Processing...
              </div>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminDeleteDialog;

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AdminCardProps = {
  item: {
    id: string;
    title: string;
    number: number;
    change: number;
  };
};

const AdminCard = ({ item }: AdminCardProps) => {
  return (
    <Card className="flex w-full items-center justify-between rounded-lg bg-white-50 p-4 drop-shadow-md dark:border-gray-850 dark:bg-gray-700 sm:p-6">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold dark:text-gray-100">{item.title === "Revenue" ? `$${item.number.toLocaleString()}` : item.number.toLocaleString()}</CardTitle>
        <CardDescription className="paragraph-medium md:base-medium dark:text-gray-300">{item.title}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center rounded-lg bg-green-200 p-4 text-lg text-green-700">{<p>{item.change}%</p>}</CardContent>
    </Card>
  );
};

export default AdminCard;

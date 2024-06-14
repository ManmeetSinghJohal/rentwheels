import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="flex items-center justify-between dark:border-gray-850 bg-white-50 dark:bg-gray-700 drop-shadow-md p-4 sm:p-6 rounded-lg w-full">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold dark:text-gray-100">{item.title === "Revenue" ? `$${item.number.toLocaleString()}` : item.number.toLocaleString()}</CardTitle>
        <CardDescription className="paragraph-medium dark:text-gray-300 md:base-medium">{item.title}</CardDescription>
      </CardHeader>
      <CardContent className="bg-green-200 flex justify-center items-center p-4 rounded-lg text-green-700 text-lg">{<p>{item.change}%</p>}</CardContent>
    </Card>
  );
};

export default AdminCard;

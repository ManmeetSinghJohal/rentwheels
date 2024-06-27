"use server";

import { prisma } from "@/prisma/client";

export const getResourceNameById = async (resource: string, id: string) => {
  let name = "";
  try {
    switch (resource) {
      case "users": {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        name = user?.name || "";
        break;
      }
      case "bookings": {
        const booking = await prisma.booking.findUnique({
          where: { id: Number(id) },
          include: {
            user: true,
            car: true,
          },
        });
        name = `${booking?.user?.name}, ${booking?.car?.title} ${booking?.car?.type}` || "";
        break;
      }
      case "cars": {
        const car = await prisma.car.findUnique({ where: { id: Number(id) } });
        name = `${car?.title} ${car?.type}` || "";
        break;
      }
      default:
        console.error("Invalid resource:", resource);
    }
  } catch (error) {
    console.error("Error fetching resource:", error);
  }
  return name;
};

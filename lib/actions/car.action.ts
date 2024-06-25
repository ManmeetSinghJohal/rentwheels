"use server";

import { prisma } from "@/prisma/client";
import { AddCarParams, CarWithFavorite, CarsWithOwnerResponse, SearchCarsResponse } from "@/types";
import { handleError } from "../utils";

interface Filters {
  searchParams: { [key: string]: string | undefined };
  perPage?: number;
  page?: number;
}

// Get filtered cars
export const getFilteredCars = async (filters: Filters) => {
  try {
    const filterObject: { [key: string]: any } = {};
    Object.keys(filters.searchParams).forEach((key) => {
      switch (key) {
        case "type":
          filterObject["type"] = {
            in: filters.searchParams.type?.toLowerCase()?.split(","),
          };
          break;
        case "capacity":
          filterObject["capacity"] = {
            in: filters.searchParams.capacity?.split(",").map(Number),
          };
          break;
        case "rentPrice":
          filterObject["rentPrice"] = {
            lte: Number(filters.searchParams.rentPrice),
          };
          break;
        case "location":
          filterObject["location"] = {
            in: filters.searchParams.location?.split(","),
          };
          break;
      }
    });

    // Ensure page is at least 1
    const page = Math.max(1, filters.page ?? 1);
    const perPage = filters.perPage ?? 10;
    // Query to find cars based on the filters
    const cars = await prisma.car.findMany({
      where: filterObject,
      take: perPage,
      skip: (page - 1) * perPage, // This will now always be a non-negative number
    });

    // Query to get the total count of cars based on the filters
    const totalCarsCount = await prisma.car.count({
      where: filterObject,
    });

    return { cars, totalCarsCount };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      throw new Error(`Error getting filtered cars: ${error.message}`);
    }
  }
};

// Get all cars
export const getAllCars = async () => {
  try {
    const cars = await prisma.car.findMany({
      take: 16, // Retrieve only the first 16 cars
    });
    return cars;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting all cars");
  }
};

// Get all cars with owner
export const getAllCarsWithOwner = async (page = 1, limit = 10): Promise<CarsWithOwnerResponse> => {
  try {
    const offset = (page - 1) * limit;
    const cars = await prisma.car.findMany({
      skip: offset,
      take: limit,
      include: {
        owner: true,
      },
    });

    const totalCount = await prisma.car.count();

    return {
      cars,
      totalCount,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error getting all cars");
  }
};

// Get a car by id
export const getCarById = async (id: number) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id,
      },
    });
    return car;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting car by id");
  }
};

// Delete a Car
export const deleteCar = async (id: number) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new Error(`Car not found for id: ${id}`);
    }

    return await prisma.car.delete({
      where: {
        id: car.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting car by id");
  }
};

// Get all my cars
export const getMyOwnedCars = async (userId: number) => {
  try {
    const userWithCars = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        carsForRent: true,
      },
    });

    return userWithCars ? userWithCars.carsForRent : [];
  } catch (error) {
    console.error(`Error fetching owned cars for user ${userId}:`, error);
    throw new Error(`Error fetching owned cars for user ${userId}`);
  }
};

// Get my rented cars
export const getMyRentedCars = async (userId: number): Promise<CarWithFavorite[]> => {
  try {
    const myRentedCars = await prisma.car.findMany({
      where: {
        bookings: {
          some: {
            userId,
          },
        },
      },
    });
    return myRentedCars;
  } catch (error) {
    console.error(`Error fetching rented cars for user ${userId}:`, error);
    throw new Error(`Error getting rented cars for user ${userId}`);
  }
};

export const getAllCarsWithFavorites = async (userId: number): Promise<CarWithFavorite[]> => {
  try {
    const carsWithFavorites = await prisma.$queryRaw<CarWithFavorite[]>`
      SELECT c.*,
             (CASE WHEN f.id IS NOT NULL THEN TRUE ELSE FALSE END) as "isFavorite"
      FROM "cars" as c
      LEFT JOIN (
        SELECT *
        FROM "favorites"
        WHERE "userId" = ${userId}
      ) as f ON c.id = f."carId"
    `;

    return carsWithFavorites;
  } catch (error) {
    console.error("Error fetching cars with favorites:", error);
    throw new Error("Error fetching cars with favorites");
  }
};

// search all cars by title, type, price, capacity, transmission, location, ownerName, status
export const searchCars = async (searchTerm: string): Promise<SearchCarsResponse> => {
  try {
    const cars = await prisma.car.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            type: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            owner: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        owner: true,
      },
    });

    return { cars, totalCount: cars.length };
  } catch (error) {
    handleError(error, "Error searching cars");
    return { cars: [], totalCount: 0 };
  }
};

// Add a new car
export const addCar = async ({ title, type, price, capacity, transmission, location, fuelCapacity, description, images, blurDataURL, userId }: AddCarParams) => {
  try {
    const newCar = await prisma.car.create({
      data: {
        title,
        type,
        rentPrice: price,
        capacity,
        transmission,
        location,
        fuelCapacity,
        description,
        images: [images],
        blurDataURL: [blurDataURL],
        ownerId: userId,
      },
    });

    return newCar;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding new car");
  }
};

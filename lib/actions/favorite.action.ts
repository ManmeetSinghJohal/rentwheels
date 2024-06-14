// @ts-nocheck

"use server";

import { prisma } from "@/prisma/client";
import { NotFoundError, DatabaseError } from "@/lib/errors";
import { Favorite } from "@prisma/client";
import { FavoriteParams } from "@/types";

export const createFavorite = async ({ userId, carId }: FavoriteParams): Promise<Favorite | null> => {
  try {
    const existingFavorite = await findFavorite(userId, carId);

    if (existingFavorite) {
      throw new Error("Favorite already exists");
    }

    try {
      const favorite = await prisma.favorite.create({
        data: {
          userId,
          carId,
        },
      });

      return favorite;
    } catch (error) {
      console.error("Error creating favorite:", error);
      throw new Error("Failed to create favorite");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeFavorite = async ({ userId, carId }: FavoriteParams): Promise<Favorite | null> => {
  const favorite = await findFavorite(userId, carId);

  if (!favorite) {
    throw new NotFoundError(`Favorite not found for user id: ${userId} and car id: ${carId}`);
  }

  return deleteFavoriteById(favorite.id);
};

const findFavorite = async (userId: number, carId: number): Promise<Favorite | null> => {
  try {
    return await prisma.favorite.findUnique({
      where: {
        userId_carId: {
          userId,
          carId,
        },
      },
    });
  } catch (error) {
    console.error(`Error finding favorite for user id: ${userId} and car id: ${carId}`, error);
    return null;
  }
};

const deleteFavoriteById = async (id: number): Promise<Favorite> => {
  try {
    return await prisma.favorite.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting favorite with id: ${id}`, error);
    throw new DatabaseError("Failed to delete favorite");
  }
};

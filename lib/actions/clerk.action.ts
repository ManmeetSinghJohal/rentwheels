"use server";

import { prisma } from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs";

import { CreateClerkUserParams, DeleteClerkUserParams, DeleteClerkUserResponse, UpdateClerkUserParams } from "@/types";

// Delete a Clerk User from Admin
export const deleteClerkUser = async (userData: DeleteClerkUserParams): Promise<DeleteClerkUserResponse> => {
  const { clerkId } = userData;

  if (!clerkId) {
    throw new Error("Clerk ID is missing");
  }

  try {
    await clerkClient.users.deleteUser(clerkId);
    return { isSuccess: true };
  } catch (error) {
    throw new Error("Error deleting Clerk user");
  }
};

// Create a User on Clerk from Admin
export const createClerkUser = async (userData: CreateClerkUserParams) => {
  const { firstName, lastName, username, email, picture, role } = userData;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    await clerkClient.users.createUser({
      firstName,
      lastName,
      username,
      emailAddress: [email],
      publicMetadata: {
        role,
        picture,
      },
    });

    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating Clerk user");
  }
};

// Update a user on Clerk from Admin
export const updateClerkUser = async (userData: UpdateClerkUserParams) => {
  const { name, username, email, role, picture, userId } = userData;
  const [firstName, lastName] = name.split(" ");
  try {
    await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
      username,
      publicMetadata: {
        role,
        picture,
        email,
      },
    });

    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    throw new Error("Error updating Clerk user");
  }
};

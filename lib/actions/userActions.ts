"use server";

import { User } from "@prisma/client";
import { prisma } from "@/prisma/client";
import { handleError } from "../utils";
import { CreateUserParams, SearchUsersResponse, UpdateUserCoverImgParams, UpdateUserParams, UpdateUserProfileImgParams, UsersResponse } from "@/types";

// Create user
export const createUser = async (userData: CreateUserParams): Promise<User> => {
  const { clerkId, name, username, email, picture, role } = userData;

  try {
    const user = await prisma.user.create({
      data: {
        clerkId,
        name: name || "",
        username,
        email,
        picture,
        role,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user");
  }
};

export const updateUser = async (userData: UpdateUserParams): Promise<User> => {
  const { clerkId, name, username, email, role, picture } = userData;

  try {
    const user = await prisma.user.update({
      where: { clerkId },
      data: {
        name,
        username,
        email,
        role: role || "USER",
        picture,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user");
  }
};

export const updateUserCoverImg = async ({ userId, coverImg }: UpdateUserCoverImgParams): Promise<User> => {
  try {
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        coverImg,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user cover image");
  }
};

export const updateUserProfileImg = async ({ userId, profileImg }: UpdateUserProfileImgParams): Promise<User> => {
  try {
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        picture: profileImg || "",
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user profile image");
  }
};

// Delete User via Clerk webhook
export const deleteUser = async (clerkId: string): Promise<User> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) {
      throw new Error(`User not found for id: ${clerkId}`);
    }

    return await prisma.user.delete({
      where: { clerkId },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting user");
  }
};

// Get user by Id
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.error(`User not found for id: ${id}`);
      return null;
    }

    return user;
  } catch (error) {
    handleError(error, "Error getting user by id", id);
    return null;
  }
};

// Get user by clerkId
export const getUserByClerkId = async (clerkId: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      console.error(`User not found for clerkId: ${clerkId}`);
      return null;
    }

    return user;
  } catch (error) {
    handleError(error, "Error getting user by clerkId");
    return null;
  }
};

// Get all users
export const getAllUsers = async (page = 1, limit = 10): Promise<UsersResponse> => {
  try {
    const offset = (page - 1) * limit;
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
    });

    const totalCount = await prisma.user.count();

    return {
      users,
      totalCount,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error getting all users");
  }
};

// search user by name, username, email
export const searchUsers = async (searchTerm: string): Promise<SearchUsersResponse> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return { users, totalCount: users.length };
  } catch (error) {
    handleError(error, "Error searching users");
    return { users: [], totalCount: 0 };
  }
};

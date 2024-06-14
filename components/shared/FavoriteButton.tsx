"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useUser } from "@clerk/nextjs";

import { FavoriteButtonProps } from "@/types";
import { showToast } from "@/lib/utils";
import { createFavorite, removeFavorite } from "@/lib/actions/favorite.action";

const FavoriteButton = ({ carId, initialIsFavorite = false }: FavoriteButtonProps) => {
  const { isSignedIn, user } = useUser();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const toggleFavorite = async () => {
    if (!isSignedIn) {
      showToast("You are not logged in", "Please sign in to favorite a car");
      return;
    }

    try {
      const userId = +((user.publicMetadata.userId as string) || "0");

      const newIsFavorite = !isFavorite;
      setIsFavorite(newIsFavorite);

      if (newIsFavorite) {
        await createFavorite({ userId, carId });
      } else {
        await removeFavorite({ userId, carId });
      }
    } catch (error) {
      console.error(error);
      setIsFavorite(isFavorite);
      showToast("Failed to toggle favorite", "Please try again");
    }
  };

  return (
    <button onClick={toggleFavorite}>
      <Image src={isFavorite ? "/icons/heart-red.svg" : "/icons/heart-outline.svg"} width={24} height={24} alt={isFavorite ? "Unfavorite" : "Favorite"} />
    </button>
  );
};

export default FavoriteButton;

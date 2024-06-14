"use server";

import sharp from "sharp";

interface SearchLocation {
  searchText: any;
}

interface PlacePrediction {
  description: string;
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: string[]; //
    secondary_text: string;
  };
  terms: string[];
  types: string[];
  matched_substrings: string[];
}

export const searchLocation = async ({ searchText }: SearchLocation): Promise<PlacePrediction[]> => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const result = await response.json();

  return result.predictions;
};

export const getBlurData = async (url: string) => {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const { width, height } = await sharp(buffer).metadata();
  const imageBuffer = await sharp(buffer).resize(10, 10).webp().toBuffer();
  const blurDataURL = `data:image/webp;base64,${imageBuffer.toString("base64")}`;
  return { width, height, blurDataURL };
};

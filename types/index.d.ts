import React from "react";
import { Car, Booking, User, Role } from "@prisma/client";

// type StyleField = string | CSSProperties | ((args: CallbackArguments) => string | CSSProperties);

export type SearchParamProps = {
  params?: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export interface CarWithFavorite extends Car {
  isFavorite?: boolean;
}

export interface FavoriteButtonProps {
  carId: number;
  initialIsFavorite: boolean | undefined;
}

export interface TransmissionIconProps {
  width: number;
  height: number;
  alt: string;
  extraClasses?: string;
}

export interface FavoriteParams {
  userId: number;
  carId: number;
}

export interface CarProps {
  id: number;
  title: string;
  type: string;
  rentPrice: number;
  location: string;
  images: string[];
  ownerId: string;
  address: string;
  // pickUpDate: pickUpDate;
  // pickUpTime: pickUpTime;
  // dropOffDate: dropOffDate;
  // dropOffTime: dropOffTime;
}

export type MyCarsProps = {
  cars: CarWithFavorite[] | [];
  title: string;
  withButton?: boolean;
  buttonText?: string;
};

export interface NewBooking {
  userId: number;
  carId: number;
  pickupDateTime: Date;
  dropoffDateTime: Date;
  pickupAddress: string;
  latitude: number;
  longitude: number;
  placeId: string;
}

export type TableColumn = {
  header: string;
  accessor: string | ((data: any) => React.ReactNode);
};

export type AdminTableProps = {
  data: any[];
  columns: TableColumn[];
  count: number;
};

export type BookingWithUserAndCar = Booking & {
  user: {
    name: string;
    email: string;
    picture: string;
  };
  car: {
    title: string;
    owner: {
      name: string;
      picture: string;
    };
  };
};

export type CarTableProps = {
  cars: Car[];
  count: number;
};

export type UserTableProps = {
  users: User[];
  count: number;
};

export type BookingTableProps = {
  bookings: Booking[];
  count: number;
};

export type CarWithOwner = Car & {
  owner: User;
};

// export type BookingTableProps = {
//   query?: string;
// };

export type DeleteClerkUserParams = {
  clerkId: string | null;
};

export type DeleteClerkUserResponse = {
  isSuccess: boolean;
};

export type UpdateUserParams = {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  picture: string;
};

export type CreateUserParams = {
  clerkId: string;
  name: string | undefined;
  username: string;
  email: string;
  picture: string;
  role?: Role;
};

export type UpdateUserProfileImgParams = {
  userId: string;
  profileImg: string | null;
};

export type UpdateUserCoverImgParams = {
  userId: string;
  coverImg: string;
};

export type UpdateClerkUserParams = {
  name: string;
  username: string;
  email: string;
  role: string | undefined;
  userId: string;
  picture: string;
};

export type CreateClerkUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  picture: string;
  role: string | undefined;
};

export type UsersResponse = {
  users: User[];
  totalCount: number;
};

export type CarsWithOwnerResponse = {
  cars: CarWithOwner[];
  totalCount: number;
};

export type BookingsWithUserAndCarOwnerResponse = {
  bookings: BookingWithUserAndCar[];
  totalCount: number;
};

export type SearchUsersResponse = {
  users: User[];
  totalCount: number;
};

export type SearchBookingsResponse = {
  bookings: Booking[];
  totalCount: number;
};

export type SearchCarsResponse = {
  cars: CarWithOwner[];
  totalCount: number;
};

export interface AddCarParams {
  title: string;
  type: string;
  price: number;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  description: string;
  images: string;
  blurDataURL: string;
  userId: string;
}

export interface Filters {
  searchParams: { [key: string]: string | string[] | undefined };
  page?: number;
  perPage?: number;
}

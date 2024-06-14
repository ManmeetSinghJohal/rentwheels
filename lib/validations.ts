import * as z from "zod";

export const PickUpDropOffSchema = z.object({
  location: z.string(),
  pickUpDate: z.date(),
  pickUpTime: z.string(),
  dropOffDate: z.date(),
  dropOffTime: z.string(),
});

export const AddCarSchema = z.object({
  title: z.string(),
  type: z.string(),
  price: z.string().transform(Number),
  capacity: z.string(),
  transmission: z.string(),
  location: z.string(),
  fuelCapacity: z.string().transform(Number),
  description: z.string(),
  imgUrl: z.string(),
});

export const SearchInputSchema = z.object({
  location: z.string(),
  availableFrom: z.date(),
  availableTo: z.date(),
});

export const CreateUserSchema = z.object({
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  picture: z.string().optional(),
  role: z.enum(["ADMIN", "USER"]),
});

export const UpdateUserSchema = z.object({
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name is required"),
  role: z.enum(["ADMIN", "USER"]),
  picture: z.string(),
});

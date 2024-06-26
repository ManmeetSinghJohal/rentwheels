// "use server";

// import { prisma } from "@/prisma/client";
// import { BookingsWithUserAndCarOwnerResponse, SearchBookingsResponse } from "@/types";
// import { handleError } from "../utils";
// import Stripe from "stripe";
// import { CarProps } from "@/types";
// import { redirect } from "next/navigation";
// import { howManyDays, formatPickUpTime } from "../utils";
// import { getCarById } from "./car.action";
// import { getUserByClerkId } from "./user.action";

// export const checkoutRentCar = async (bookingInfo: any) => {
//   const { userId, carId, carPrice, carName, carType, location, pickUpDate, pickUpTime, dropOffDate, dropOffTime, imageUrl } = bookingInfo;
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//   const formattedPickUpTime = formatPickUpTime(pickUpTime);
//   const formattedDropOffTime = formatPickUpTime(dropOffTime);
//   const sumDays = howManyDays(pickUpDate, dropOffDate);
//   const price = Number(carPrice) * 100 * Number(sumDays);
//   const rentDescription = `You rented a ${carName}-${carType} at ${location}.
//   From ${pickUpDate.toLocaleDateString()} at ${formattedPickUpTime} till ${dropOffDate.toLocaleDateString()} at ${formattedDropOffTime}.
//   Enjoy the ride and drive carefully. Thank you for using our service.
//   `;

//   try {
//     const car = await getCarById(carId);
//     if (!car) {
//       throw new Error("Car not found");
//     }
//     const ownerId = await getUserByClerkId(car.ownerId);

//     if (!ownerId) {
//       throw new Error("Owner not found");
//     }

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: carName,
//               description: rentDescription,
//             },
//             unit_amount: price,
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         rentCarId: carId,
//         ownerId: ownerId.id,
//         location,
//         type: carType,
//       },
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
//       cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
//     });

//     await createBooking(bookingInfo, ownerId, session);

//     redirect(session.url!);
//   } catch (error) {
//     throw error;
//   }
// };
// // Create a booking

// export const createBooking = async (bookingInfo: any, ownerId: any, session: any) => {
//   const { userId, carId, carPrice, carName, location, pickUpDate, pickUpTime, dropOffDate, dropOffTime, imageUrl } = bookingInfo;

//   try {
//     const booking = await prisma.booking.create({
//       data: {
//         userId,
//         carId,
//         location,
//         pickupDate: pickUpDate,
//         pickupTime: pickUpTime,
//         dropoffDate: dropOffDate,
//         dropoffTime: dropOffTime,
//         pickupAddress: location,
//         latitude: 0,
//         longitude: 0,
//         placeId: "",
//       },
//     });
//     return booking;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error creating booking");
//   }
// };

// // Get all bookings
// export const getAllBookings = async (page = 1, limit = 10): Promise<BookingsWithUserAndCarOwnerResponse> => {
//   try {
//     const offset = (page - 1) * limit;
//     const bookings = await prisma.booking.findMany({
//       skip: offset,
//       take: limit,
//       include: {
//         car: {
//           include: {
//             owner: true,
//           },
//         },
//         user: true,
//       },
//     });
//     const totalCount = await prisma.booking.count();

//     return {
//       bookings,
//       totalCount,
//     };
//   } catch (error) {
//     handleError(error, "Error getting bookings");
//     return { bookings: [], totalCount: 0 };
//   }
// };

// // search booking by name, username, email, car name, car model
// export const searchBookings = async (searchTerm: string): Promise<SearchBookingsResponse> => {
//   try {
//     const bookings = await prisma.booking.findMany({
//       where: {
//         OR: [
//           {
//             user: {
//               name: {
//                 contains: searchTerm,
//                 mode: "insensitive",
//               },
//             },
//           },
//           {
//             user: {
//               username: {
//                 contains: searchTerm,
//                 mode: "insensitive",
//               },
//             },
//           },
//           {
//             user: {
//               email: {
//                 contains: searchTerm,
//                 mode: "insensitive",
//               },
//             },
//           },
//           {
//             car: {
//               title: {
//                 contains: searchTerm,
//                 mode: "insensitive",
//               },
//             },
//           },
//           {
//             car: {
//               type: {
//                 contains: searchTerm,
//                 mode: "insensitive",
//               },
//             },
//           },
//           {
//             car: {
//               owner: {
//                 name: {
//                   contains: searchTerm,
//                   mode: "insensitive",
//                 },
//               },
//             },
//           },
//         ],
//       },
//       include: {
//         car: {
//           include: {
//             owner: true,
//           },
//         },
//         user: true,
//       },
//     });

//     return { bookings, totalCount: bookings.length };
//   } catch (error) {
//     handleError(error, "Error searching bookings");
//     return { bookings: [], totalCount: 0 };
//   }
// };

// // Delete a booking
// export const deleteBooking = async (id: number) => {
//   try {
//     const booking = await prisma.booking.findUnique({
//       where: { id },
//     });

//     if (!booking) {
//       console.error(`Booking not found for id: ${id}`);
//       return null;
//     }

//     return await prisma.booking.delete({
//       where: {
//         id: booking.id,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error deleting booking");
//   }
// };

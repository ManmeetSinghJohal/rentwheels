// import { bookCar } from "@/lib/actions/stripeCarRentOrder";
// import { NextResponse } from "next/server";
// import stripe from "stripe";

// export async function POST(req: Request) {
//   const body = await req.text();
//   const sig = req.headers.get("stripe-signature") as string;
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   if (!sig) return new Response("No signature", { status: 400 });

//   try {
//     const event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as stripe.Checkout.Session;

//       const { metadata } = session;

//       if (metadata) {
//         const { userId, carId, pickupDateTime, dropoffDateTime, pickupAddress, latitude, longitude, placeId } = metadata;

//         try {
//           const newBooking = await bookCar({
//             userId: parseInt(userId),
//             carId: parseInt(carId),
//             pickupDateTime: new Date(pickupDateTime),
//             dropoffDateTime: new Date(dropoffDateTime),
//             pickupAddress,
//             latitude: parseFloat(latitude),
//             longitude: parseFloat(longitude),
//             placeId,
//           });

//           return NextResponse.json({ message: "Success", newBooking });
//         } catch (error) {
//           // console.error("Error booking car:", error);
//           // return NextResponse.json({ message: "Error booking car", error });
//         }
//       }
//     }

//     return new Response("Success", { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Webhook Error", error });
//   }
// }

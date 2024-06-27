// "use client";

// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { loadStripe } from "@stripe/stripe-js";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Car } from "@prisma/client";
// import { useUser } from "@clerk/nextjs";
// import * as z from "zod";

// import { Form } from "@/components/ui/form";
// import { useToast } from "@/components/ui/use-toast";
// import { openHours } from "@/constants";
// import { PickUpDropOffSchema } from "@/lib/validations";
// import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
// import { Button } from "@/components/ui/button";
// import FormCalendar from "../form/sharedFields/FormCalendar";
// import FormSelect from "./sharedFields/FormSelect";
// import FormLocation from "./sharedFields/FormLocation";
// import { checkoutRentCar, createBooking } from "@/lib/actions/booking.action";

// interface PickUpDropOffProps {
//   title: string;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   car: Car;
// }

// const RentalForm = ({ title, open, onOpenChange, car }: PickUpDropOffProps) => {
//   const { toast } = useToast();
//   const { user } = useUser();
//   const userId = user?.publicMetadata.userId;

//   loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

//   const form = useForm<z.infer<typeof PickUpDropOffSchema>>({
//     resolver: zodResolver(PickUpDropOffSchema),
//     defaultValues: {
//       location: "",
//       pickUpDate: undefined,
//       pickUpTime: "",
//       dropOffDate: undefined,
//       dropOffTime: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof PickUpDropOffSchema>) {
//     const { location, pickUpDate, pickUpTime, dropOffDate, dropOffTime } = values;

//     const bookingInfo = {
//       userId: userId!,
//       carId: car.id,
//       carPrice: car.rentPrice,
//       carName: car.title,
//       carType: car.type,
//       location,
//       pickUpDate,
//       pickUpTime,
//       dropOffDate,
//       dropOffTime,
//       imageUrl: car.images[0],
//     };

//     try {
//       await checkoutRentCar(bookingInfo);

//       onOpenChange(false);
//       toast({
//         title: "Success!",
//         description: "Your order has been placed.",
//         variant: "default",
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       form.reset();
//     }
//   }

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);
//     if (query.get("success")) {
//       console.log("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
//     }
//   }, []);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="dark:bg-gray-850 dark:border-none rounded-[10px] w-full pb-10 px-4 sm:px-[50px] sm:pb-[50px] mt-[194px] max-w-lg">
//         <DialogHeader className="pt-10 sm:pt-[50px]">
//           <DialogTitle className="text-[18px] -mb-2 sm:text-[20px] font-bold leading-normal font-plusJakartaSans text-gray-900 dark:text-white-50">Add Pickup & Drop-Off Info</DialogTitle>
//           <DialogDescription className="text-gray-400 font-plusJakartaSans text-[14px] font-medium">Please enter your info</DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-[24px] pt-[30px] sm:pt-[40px]">
//               <FormLocation form={form} name="location" label="Pick-Up Location" labelClassName="text-[14px] sm:text-[16px] font-semibold" placeholder="Location Address" hasLabelIcon={true} />

//               <div className="flex w-full gap-[10px]">
//                 <FormCalendar type="date" form={form} name="pickUpDate" label="Pick-Up Date" placeholder="Select your date" />
//                 <FormSelect form={form} name="pickUpTime" label="Pick-Up Time" placeholder="Select your time" constant={openHours} leftImageUrl={true} labelClassName="text-[14px] sm:text-[16px] font-semibold leading-normal text-gray-900 dark:text-white-50" selectTriggerClassName="font-medium" />
//               </div>
//               <div className="flex gap-[10px]">
//                 <FormCalendar form={form} name="dropOffDate" label="Drop-Off Date" placeholder="Select your date" />
//                 <FormSelect
//                   form={form}
//                   name="dropOffTime"
//                   label="Drop-Off Time"
//                   placeholder="Select your time"
//                   constant={openHours}
//                   leftImageUrl={true}
//                   labelClassName="gap-2 font-plusJakartaSans text-[14px] sm:text-[16px] font-semibold leading-normal text-gray-900 dark:text-white-50"
//                   selectTriggerClassName="font-medium"
//                 />
//               </div>
//               <DialogFooter>
//                 <Button type="submit" className="w-full text-white-50 font-plusJakartaSans bg-primary h-[56px] rounded-[10px] z-0">
//                   {title}
//                 </Button>
//               </DialogFooter>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RentalForm;

import { Metadata } from "next";

import AddCarForm from "@/components/form/CarForm";

export const metadata: Metadata = {
  title: "Add New Car",
  description: "Post a new car on RentWheels",
};

const NewCar = () => {
  return (
    <section className="rounded-[10px] bg-white-50 sm:mx-[86px] sm:mb-[56px] sm:mt-[36px]">
      <AddCarForm />
    </section>
  );
};

export default NewCar;

import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";

import ProfilePanel from "@/components/Profile/ProfilePanel";
import MyCars from "@/components/Profile/MyCars";
import { getMyRentedCars, getMyOwnedCars } from "@/lib/actions/car.action";
import { CarWithFavorite } from "@/types";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Your personal profile page on RentWheels",
};

const Profile = async () => {
  const user = await currentUser();
  let bookedCars: CarWithFavorite[] | [] = [];
  let ownedCars: CarWithFavorite[] | [] = [];

  if (user?.publicMetadata.userId) {
    const userId = Number(user.publicMetadata.userId);

    [bookedCars, ownedCars] = await Promise.all([getMyRentedCars(userId), getMyOwnedCars(userId)]);
  }

  return (
    <section className="px-6 py-6 bg-white-200 dark:bg-gray-900">
      <h1 className="base-bold dark:text-white-50 mb-6 lg:mb-[31px] ">My Profile</h1>

      <div className="flex flex-col items-center">
        <ProfilePanel />
        <MyCars cars={bookedCars} title="Rented Cars" />
        <MyCars cars={ownedCars} title="My Owned Cars" withButton={true} buttonText="Add New Car" />
      </div>
    </section>
  );
};

export default Profile;

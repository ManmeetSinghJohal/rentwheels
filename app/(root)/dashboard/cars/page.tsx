import Link from "next/link";

import Pagination from "@/components/Dashboard/Pagination";
import { getAllCarsWithOwner, searchCars } from "@/lib/actions/car.action";
import { Button } from "@/components/ui/button";
import AdminSearch from "@/components/Dashboard/AdminSearch";
import CarTable from "@/components/Dashboard/CarTable";

const CarsPage = async ({ searchParams }: any) => {
  const query = searchParams.query;
  const page = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = 5;

  const { cars, totalCount } = query ? await searchCars(query) : await getAllCarsWithOwner(page, itemsPerPage);

  return (
    <div className="p-5 mt-5 mx-5 text-gray-700 dark:text-white-200 dark:bg-gray-850 bg-white-50 rounded-lg">
      <div className="flex p-2 items-center justify-between">
        <AdminSearch placeholder="Search for a car..." />

        <Link href="/dashboard/cars/new">
          <Button className="px-3 py-2 bg-primary text-white rounded-md cursor-pointer">+ Car</Button>
        </Link>
      </div>

      <CarTable cars={cars} count={totalCount} />

      <Pagination count={totalCount} limit={itemsPerPage} />
    </div>
  );
};

export default CarsPage;

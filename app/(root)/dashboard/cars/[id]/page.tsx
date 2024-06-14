import { getCarById } from "@/lib/actions/car.action";
import Image from "next/image";
import UpdateCarForm from "@/components/Dashboard/UpdateCarForm";

type ShowCarPageParams = {
  params: {
    id: string;
  };
};

const ShowCarPage = async ({ params }: ShowCarPageParams) => {
  const { id } = params;
  const car = await getCarById(+id);

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="flex gap-12 mt-5">
      <div className="w-1/3 bg-gray-200 p-5 rounded-lg font-bold text-gray-500 h-auto flex flex-col items-center justify-center">
        {/* Car Image  */}
        <div className="w-full h-72 relative rounded-lg overflow-hidden mb-5 flex justify-center items-center">{/* <Image src={car.images[0] || "/images/default-car.png"} width={250} height={250} alt="car-picture" className="rounded-full" /> */}</div>
        <div>{car.title}</div>
      </div>
      <div className="w-2/3 bg-gray-200 p-5 rounded-lg">
        <UpdateCarForm car={car} />
      </div>
    </div>
  );
};

export default ShowCarPage;

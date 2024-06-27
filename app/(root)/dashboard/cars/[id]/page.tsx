import { getCarById } from "@/lib/actions/car.action";
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
    <div className="mt-5 flex gap-12">
      <div className="flex h-auto w-1/3 flex-col items-center justify-center rounded-lg bg-gray-200 p-5 font-bold text-gray-500">
        {/* Car Image  */}
        <div className="relative mb-5 flex h-72 w-full items-center justify-center overflow-hidden rounded-lg">{/* <Image src={car.images[0] || "/images/default-car.png"} width={250} height={250} alt="car-picture" className="rounded-full" /> */}</div>
        <div>{car.title}</div>
      </div>
      <div className="w-2/3 rounded-lg bg-gray-200 p-5">
        <UpdateCarForm car={car} />
      </div>
    </div>
  );
};

export default ShowCarPage;

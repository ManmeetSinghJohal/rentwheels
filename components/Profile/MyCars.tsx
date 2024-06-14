import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { MyCarsProps } from "@/types";

const MyCars = ({ cars, title, withButton = false, buttonText }: MyCarsProps) => {
  return (
    <div className="w-full flex flex-col gap-5 bg-white-200 dark:bg-gray-900">
      <p className="paragraph-semibold text-gray-400">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {withButton && (
        <div className="mt-[30px] w-full flex items-center justify-center">
          <Button className="w-full lg:w-[228px] h-14 px-5 bg-secondary hover:bg-primary dark:group-hover:text-white-50 text-base text-white-50 text-center">{buttonText}</Button>
        </div>
      )}
    </div>
  );
};

export default MyCars;

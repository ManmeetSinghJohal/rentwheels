import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { MyCarsProps } from "@/types";

const MyCars = ({ cars, title, withButton = false, buttonText }: MyCarsProps) => {
  return (
    <div className="flex w-full flex-col gap-5 bg-white-200 dark:bg-gray-900">
      <p className="paragraph-semibold text-gray-400">{title}</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {withButton && (
        <div className="mt-[30px] flex w-full items-center justify-center">
          <Button className="h-14 w-full bg-secondary px-5 text-center text-base text-white-50 hover:bg-primary dark:group-hover:text-white-50 lg:w-[228px]">{buttonText}</Button>
        </div>
      )}
    </div>
  );
};

export default MyCars;

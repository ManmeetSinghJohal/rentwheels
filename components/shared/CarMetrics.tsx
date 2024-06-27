import Image from "next/image";
import TransmissionIcon from "./TransmissionIcon";
import { CarWithFavorite } from "@/types";

interface CarMetricsProps {
  car: CarWithFavorite;
  smallScreen?: boolean;
  classes?: string;
  extraClasses?: string;
}

export const CarMetrics = ({ car, smallScreen, classes, extraClasses }: CarMetricsProps) => {
  const metrics = [
    {
      id: 1,
      src: "/images/gas-station.svg",
      alt: "gasstation-icon",
      text: car.fuelCapacity,
    },
    {
      id: 2,
      src: "",
      alt: "transmission-icon",
      text: car.transmission,
    },
    { id: 3, src: "/images/user.svg", alt: "user-icon", text: car.capacity },
  ];

  return (
    <div className={classes}>
      {metrics.map((metric) => (
        <div key={metric.id} className="flex items-center gap-1">
          {metric.alt === "transmission-icon" ? <TransmissionIcon width={smallScreen ? 14 : 24} height={smallScreen ? 14 : 24} alt={metric.alt} extraClasses={extraClasses} /> : <Image src={metric.src} width={smallScreen ? 14 : 24} height={smallScreen ? 14 : 24} alt={metric.alt} />}

          <p className={`${smallScreen ? "text-[12px]" : "text-[14px]"} sm:body-regular text-gray-400`}>{metric.text}</p>
        </div>
      ))}
    </div>
  );
};

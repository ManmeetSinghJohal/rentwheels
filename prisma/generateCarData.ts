type CarRental = {
  title: string;
  type: string;
  rentPrice: number;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  description: string;
  images: string[];
  ownerId: string;
};

function generateExtendedCarObjects(numObjects: number): CarRental[] {
  const objects: CarRental[] = [];

  const titles = ["Audi A4", "BMW 3 Series", "Mercedes C-Class", "Toyota Corolla", "Honda Civic", "Tesla Model 3", "Ford Mustang", "Chevrolet Camaro", "Porsche 911", "Nissan Altima", "Volkswagen Golf", "Renault Clio", "Peugeot 208", "Fiat 500", "Hyundai Elantra"];
  const types = ["Sedan", "SUV", "Electric", "Coupe", "Hybrid", "Hatchback", "Sports"];
  const transmissions = ["Manual", "Automatic"];
  const locations = ["Berlin", "Munich", "Paris", "Rome", "London", "New York", "Tokyo", "Sydney", "Cape Town", "Rio de Janeiro", "Toronto", "Moscow", "Dubai", "Beijing", "Seoul"];
  const imageFiles = [
    "audi_a4.jpg",
    "bmw_3_series.jpg",
    "mercedes_c_class.jpg",
    "toyota_corolla.jpg",
    "honda_civic.jpg",
    "tesla_model_3.jpg",
    "ford_mustang.jpg",
    "chevrolet_camaro.jpg",
    "porsche_911.jpg",
    "nissan_altima.jpg",
    "volkswagen_golf.jpg",
    "renault_clio.jpg",
    "peugeot_208.jpg",
    "fiat_500.jpg",
    "hyundai_elantra.jpg",
  ];

  const baseDescription = [
    "This car combines excellent performance with a comfortable interior and advanced technology.  Ideal for both city driving and long-distance travel, it offers a smooth ride, ample space, and efficient fuel consumption. Safety features include ABS, airbags, and a robust security system. The vehicle's entertainment system provides a great audio experience, making every journey enjoyable. Perfect for families, individuals, or business trips, it's a top choice for anyone seeking a reliable and stylish car.",
    "Blending luxury with performance, this car offers a refined driving experience. Its high-quality interior, equipped with the latest technology, ensures a comfortable ride. Efficient in urban settings and capable on longer journeys, it boasts outstanding fuel economy and advanced safety systems including collision detection and lane assist. The premium sound system enhances every trip, making it ideal for business or leisure travel.",
    "This vehicle stands out with its sleek design and powerful engine, providing an exhilarating driving experience. It's well-suited for both quick city trips and adventurous road journeys. The spacious interior is coupled with cutting-edge infotainment features, ensuring both driver and passengers enjoy the ride. With top-tier safety features and eco-friendly efficiency, it's a popular choice among discerning drivers.",
    "This compact car is perfect for urban environments, offering agility and easy parking. Despite its size, the interior is surprisingly spacious, providing a comfortable ride. It comes with essential safety features and a fuel-efficient engine, making it a cost-effective option. The car's modern infotainment system keeps you connected on the go, making it a great choice for city dwellers.",
    "A symbol of sophistication, this car features an elegant design and a powerful yet smooth drive. The luxurious interior is crafted with attention to detail, offering maximum comfort. It's equipped with an array of safety features and a state-of-the-art navigation system. Ideal for those who value style and comfort, this car is a perfect blend of tradition and innovation.",
    "This SUV is built for adventure, with a robust exterior and a spacious, durable interior. It's equipped with 4-wheel drive and advanced off-road capabilities, making it perfect for exploring the great outdoors. Inside, you'll find a comfortable cabin with plenty of room for passengers and cargo, along with safety features that give you confidence on any terrain.",
    "This sports car delivers an adrenaline-pumping driving experience with its high-performance engine and aerodynamic design. The cockpit is designed for the driver, with intuitive controls and a focus on ergonomics. It's a perfect match for those who crave speed and precision, offering an exhilarating ride without compromising on safety and reliability.",
    "This family-friendly car combines space and versatility with comfort and safety. The interior is designed to accommodate busy lifestyles, offering flexible seating and ample storage. Equipped with child safety features and an efficient engine, it's an ideal choice for family outings and daily commutes. The car's entertainment system keeps everyone entertained, making every journey a pleasure.",
    "This electric car represents the future of driving, with zero emissions and cutting-edge technology. Its impressive battery range and fast-charging capabilities make it a practical choice for daily use. The quiet, smooth ride is complemented by a minimalist yet comfortable interior, featuring advanced driver-assistance systems for a safer driving experience.",
    "This classic car combines timeless design with modern technology. Restored to its original glory, it features a vintage exterior with a fully updated interior, including contemporary safety and entertainment systems. A joy to drive, it appeals to collectors and enthusiasts alike, offering a unique blend of history and modernity.",
    "With its bold styling and efficient hybrid engine, this car is a standout in both aesthetics and performance. The interior is designed with sustainable materials, reflecting a commitment to environmental responsibility. It offers a quiet, smooth ride with low emissions, making it a smart choice for eco-conscious drivers. Advanced safety features and a user-friendly infotainment system complete the package.",
  ];

  for (let i = 0; i < numObjects; i++) {
    const car: CarRental = { 
      title: titles[Math.floor(Math.random() * titles.length)],
      type: types[Math.floor(Math.random() * types.length)],
      rentPrice: parseFloat((Math.random() * (150 - 50) + 50).toFixed(2)),
      capacity: [2, 4, 5, 8][Math.floor(Math.random() * 4)],
      transmission: transmissions[Math.floor(Math.random() * transmissions.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      fuelCapacity: Math.floor(Math.random() * (70 - 40) + 40),
      description: baseDescription[Math.floor(Math.random() * baseDescription.length)],
      images: [imageFiles[Math.floor(Math.random() * imageFiles.length)]],
      ownerId: `user-${(i + 1).toString().padStart(3, "0")}`,
    };
    objects.push(car);
  }

  return objects;
}

// Generate 60 unique objects
const extendedCars = generateExtendedCarObjects(100);
// console.log(extendedCars.slice(0, 3)); // Display the first 3 for brevity
console.log(extendedCars);

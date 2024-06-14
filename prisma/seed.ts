import { cars } from "./carData";
import { prisma } from "./client";

async function main() {
  // Reset the database
  await prisma.booking.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();

  // Create three users, one admin and two regular
  const adminUser = await prisma.user.create({
    data: {
      name: "Luke Skywalker",
      username: "justluke",
      email: "luke@example.com",
      clerkId: "user_2ZkptiabiFLs42TITwVOJVuKevx",
      role: "ADMIN",
      picture: "https://utfs.io/f/445b0c9b-1b0c-40cd-af17-ab4e1caea942-y7aey0.png",
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      name: "Peter Parker",
      username: "peterparker",
      email: "peter@example.com",
      clerkId: "user_01234",
      role: "USER",
      picture: "https://utfs.io/f/60427bc5-476e-4a77-b73d-d18f434f9900-7ofwf2.png",
    },
  });

  const regularUser2 = await prisma.user.create({
    data: {
      name: "James Bond",
      username: "007",
      email: "007@example.com",
      clerkId: "user_56789",
      role: "USER",
      picture: "https://utfs.io/f/84db6b43-ad82-4d13-8bdc-4eab62c924ff-z6lz5s.png",
    },
  });

  // Create an array of owner IDs
  const ownerIds = [adminUser.clerkId, regularUser.clerkId];
  const createdCars = [];

  for (const car of cars) {
    const randomOwnerId = ownerIds[Math.floor(Math.random() * ownerIds.length)];
    const createdCar = await prisma.car.create({
      data: {
        ...car,
        ownerId: randomOwnerId as string,
      },
    });
    createdCars.push(createdCar);
  }

  // Shuffle the createdCars array
  const shuffledCars = shuffleArray([...createdCars]);

  // Select first five cars (or the total number of cars if less than five)
  const selectedCars = shuffledCars.slice(0, Math.min(5, shuffledCars.length));

  // Iterate over the selected cars to create favorites and bookings
  for (const car of selectedCars) {
    await prisma.favorite.create({
      data: {
        userId: regularUser2.id,
        carId: car.id,
      },
    });

    // Create bookings for regularUser 2
    await prisma.booking.create({
      data: {
        userId: regularUser2.id,
        carId: car.id,
        location: "Berlin",
        pickupDate: new Date(),
        dropoffDate: new Date(),
        pickupTime: "12:00",
        dropoffTime: "12:00",
        pickupAddress: "Some Address",
        latitude: 52.520008,
        longitude: 13.404954,
        placeId: "ChIJAVkDPzdOqEcRcDteW0YgIQQ",
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any,
    });
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

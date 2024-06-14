/*
  Warnings:

  - A unique constraint covering the columns `[userId,carId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_carId_key" ON "favorites"("userId", "carId");

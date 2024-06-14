/*
  Warnings:

  - You are about to drop the column `dropoffDateTime` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `pickupDateTime` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `dropoffDate` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffTime` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupDate` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupTime` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "dropoffDateTime",
DROP COLUMN "pickupDateTime",
ADD COLUMN     "dropoffDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dropoffTime" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "pickupDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pickupTime" TEXT NOT NULL;

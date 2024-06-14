import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "../prisma/client";
import { getAllBookings, searchBookings, deleteBooking } from "../lib/actions/booking.action";

vi.mock("../prisma/client", () => ({
  prisma: {
    booking: {
      findMany: vi.fn(),
      delete: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Booking Actions", () => {
  const mockBookings = [{ id: 1, user: {}, car: {} }];
  const mockTotalCount = mockBookings.length;

  describe("getAllBookings", () => {
    it("should fetch all bookings successfully", async () => {
      (prisma.booking.findMany as any).mockResolvedValue(mockBookings);
      (prisma.booking.count as any).mockResolvedValue(mockTotalCount);

      const result = await getAllBookings();

      expect(result.bookings).toEqual(mockBookings);
      expect(result.totalCount).toEqual(mockTotalCount);
      expect(prisma.booking.findMany).toBeCalledTimes(1);
      expect(prisma.booking.count).toBeCalledTimes(1);
    });

    it("should throw an error when fetching bookings fails", async () => {
      (prisma.booking.findMany as any).mockRejectedValue(new Error("Database error"));

      await expect(getAllBookings()).rejects.toThrow("Error getting bookings");
      expect(prisma.booking.findMany).toBeCalledTimes(1);
    });

    it("should return empty array and 0 when no bookings are found", async () => {
      (prisma.booking.findMany as any).mockResolvedValue([]);
      (prisma.booking.count as any).mockResolvedValue(0);

      const result = await getAllBookings();
      expect(result.bookings).toEqual([]);
      expect(result.totalCount).toEqual(0);
      expect(prisma.booking.findMany).toBeCalledTimes(1);
    });
  });

  describe("searchBookings", () => {
    it("should return bookings based on search term", async () => {
      const searchTerm = "test";
      (prisma.booking.findMany as any).mockResolvedValue(mockBookings);
      (prisma.booking.count as any).mockResolvedValue(mockTotalCount);

      const result = await searchBookings(searchTerm);
      expect(result.bookings).toEqual(mockBookings);
      expect(result.totalCount).toEqual(mockTotalCount);
      expect(prisma.booking.findMany).toBeCalledWith(
        expect.objectContaining({
          where: expect.any(Object),
        })
      );
    });

    it("should throw an error when search fails", async () => {
      const searchTerm = "test";
      (prisma.booking.findMany as any).mockRejectedValue(new Error("Database error"));

      await expect(searchBookings(searchTerm)).rejects.toThrow("Error searching bookings");
      expect(prisma.booking.findMany).toBeCalledTimes(1);
    });

    it("should return empty array and 0 when no bookings are found", async () => {
      const searchTerm = "test";
      (prisma.booking.findMany as any).mockResolvedValue([]);

      const result = await searchBookings(searchTerm);
      expect(result.bookings).toEqual([]);
      expect(result.totalCount).toEqual(0);
      expect(prisma.booking.findMany).toBeCalledWith(
        expect.objectContaining({
          where: expect.any(Object),
        })
      );
    });
  });

  // Test deleteBooking
  describe("deleteBooking", () => {
    it("should delete a booking successfully", async () => {
      const mockBookingId = 1;
      (prisma.booking.findUnique as any).mockResolvedValue({ id: mockBookingId });
      (prisma.booking.delete as any).mockResolvedValue({ id: mockBookingId });

      const booking = await deleteBooking(mockBookingId);
      expect(booking).toEqual({ id: mockBookingId });
      expect(prisma.booking.delete).toBeCalledWith(
        expect.objectContaining({
          where: expect.any(Object),
        })
      );
    });

    it("should throw an error when deleting a booking fails", async () => {
      const mockBookingId = 1;
      (prisma.booking.findUnique as any).mockResolvedValue({ id: mockBookingId });
      (prisma.booking.delete as any).mockRejectedValue(new Error("Database error"));

      await expect(deleteBooking(mockBookingId)).rejects.toThrow("Error deleting booking");
      expect(prisma.booking.delete).toBeCalledTimes(1);
    });

    it("should return null when no booking is found", async () => {
      const mockBookingId = 1;
      (prisma.booking.findUnique as any).mockResolvedValue(null);

      const result = await deleteBooking(mockBookingId);

      expect(result).toBeNull();
      expect(prisma.booking.findUnique).toHaveBeenCalledWith({ where: { id: mockBookingId } });
      expect(prisma.booking.delete).not.toHaveBeenCalled();
    });
  });
});

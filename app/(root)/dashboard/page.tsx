import BookingTable from "@/components/Dashboard/BookingTable";
import { getAllBookings } from "@/lib/actions/booking.action";
import AdminCards from "@/components/Dashboard/AdminCards";

const Dashboard = async () => {
  const page = 1;
  const itemsPerPage = 5;
  const { bookings, totalCount } = await getAllBookings(page, itemsPerPage);

  return (
    <>
      <AdminCards />

      <h1 className="p-5 text-[12px] sm:text-[16px] font-semibold text-gray-900 dark:text-white-200">Latest Bookings</h1>

      <div className="w-full p-5 mt-5 mx-5 dark:bg-gray-850 bg-white-50 rounded-lg flex flex-col gap-5">
        <BookingTable bookings={bookings} count={totalCount} />
      </div>
    </>
  );
};

export default Dashboard;

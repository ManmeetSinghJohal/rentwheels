import BookingTable from "@/components/Dashboard/BookingTable";
// import { getAllBookings } from "@/lib/actions/booking.action";
import AdminCards from "@/components/Dashboard/AdminCards";

const Dashboard = async () => {
//   const page = 1;
//   const itemsPerPage = 5;
//   const { bookings, totalCount } = await getAllBookings(page, itemsPerPage);

  const bookings: any[] = [];
  const totalCount = 0;

  return (
    <>
      <AdminCards />

      <h1 className="p-5 text-[12px] font-semibold text-gray-900 dark:text-white-200 sm:text-[16px]">Latest Bookings</h1>

      <div className="mx-5 mt-5 flex w-full flex-col gap-5 rounded-lg bg-white-50 p-5 dark:bg-gray-850">
        <BookingTable bookings={bookings} count={totalCount} />
      </div>
    </>
  );
};

export default Dashboard;

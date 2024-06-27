// import Pagination from "@/components/Dashboard/Pagination";
// import { getAllBookings, searchBookings } from "@/lib/actions/booking.action";
// import AdminSearch from "@/components/Dashboard/AdminSearch";
// import BookingTable from "@/components/Dashboard/BookingTable";

// const BookingsPage = async ({ searchParams }: any) => {
//   const query = searchParams.query;
//   const page = parseInt(searchParams.page || "1", 10);
//   const itemsPerPage = 5;

//   const { bookings, totalCount } = query ? await searchBookings(query) : await getAllBookings(page, itemsPerPage);

//   return (
//     <div className="mx-5 mt-5 rounded-lg bg-white-50 p-5 text-gray-700 dark:bg-gray-850 dark:text-white-200">
//       <div className="flex items-center justify-between p-2">
//         <AdminSearch placeholder="Search for a Booking..." />
//       </div>

//       <BookingTable bookings={bookings} count={totalCount} />

//       <Pagination count={totalCount} limit={itemsPerPage} />
//     </div>
//   );
// };

// export default BookingsPage;
import React from "react";

const BookingsPage = () => {
  return <div>BookingsPage</div>;
};

export default BookingsPage;

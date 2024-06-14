import AdminCard from "./AdminCard";
import { dashboardCards } from "@/constants";

const AdminCards = () => {
  return (
    <div className="w-full p-5 my-5 mx-5 dark:bg-gray-850 bg-white-50 rounded-lg">
      <div className="flex items-center justify-between gap-3">
        {dashboardCards.map((item) => (
          <AdminCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AdminCards;

import AdminCard from "./AdminCard";
import { dashboardCards } from "@/constants";

const AdminCards = () => {
  return (
    <div className="m-5 w-full rounded-lg bg-white-50 p-5 dark:bg-gray-850">
      <div className="flex items-center justify-between gap-3">
        {dashboardCards.map((item) => (
          <AdminCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AdminCards;

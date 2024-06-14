import { Users, LifeBuoy, Calendar, BarChartBig, Files, Settings2, HelpCircle } from "lucide-react";

export const menuItems = [
  {
    id: 1,
    title: "Resources",
    list: [
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <Users />,
      },
      {
        title: "Cars",
        path: "/dashboard/cars",
        icon: <LifeBuoy />,
      },
      {
        title: "Bookings",
        path: "/dashboard/bookings",
        icon: <Calendar />,
      },
    ],
  },
  {
    id: 2,
    title: "Analytics",
    list: [
      {
        title: "Charts",
        path: "/dashboard/charts",
        icon: <BarChartBig />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <Files />,
      },
    ],
  },
  {
    id: 3,
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <Settings2 />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <HelpCircle />,
      },
    ],
  },
];

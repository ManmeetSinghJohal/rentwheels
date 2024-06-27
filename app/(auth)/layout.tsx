import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex justify-center pt-[80px]">
      {children}
    </main>
  );
};

export default Layout;

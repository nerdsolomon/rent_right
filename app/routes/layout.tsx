import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import Leftbar from "~/components/layout/leftbar";
import Navbar from "~/components/layout/navbar";
import Rightbar from "~/components/layout/rightbar";
import { DataProvider } from "~/data";

const Layout = () => {
  const location = useLocation();
  const [isOpen, onClose] = useState(false);

  return (
    <DataProvider>
      {location.pathname == "/" ? (
        <main className="h-screen">
          <Outlet />
        </main>
      ) : (
        <div className="flex flex-col h-screen">
          <Navbar isOpen={isOpen} onClose={onClose}/>
          <div className="flex">
            <Leftbar isOpen={isOpen} onClose={onClose}/>
            <main className="h-screen w-full ml-2 mr-2 lg:ml-20 lg:mr-20 scrollbar-hide flex-1 overflow-y-auto bg-green-100">
              <Outlet />
            </main>
            <Rightbar/>
          </div>
        </div>
      )}
    </DataProvider>
  );
};

export default Layout;

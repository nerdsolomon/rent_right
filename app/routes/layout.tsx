import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { AddProperty } from "~/components/layout/addproperty";
import Leftbar from "~/components/layout/leftbar";
import Navbar from "~/components/layout/navbar";
import Rightbar from "~/components/layout/rightbar";
import { DataProvider } from "~/hooks/useData";
import { RequireAuth } from "~/hooks/useRequireAuth";

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
        <RequireAuth>
          <div className="flex flex-col h-screen">
            <Navbar isOpen={isOpen} onClose={onClose} />
            <div className="flex">
              <Leftbar isOpen={isOpen} onClose={onClose} />
              <main className="h-screen w-full lg:ml-20 lg:mr-20 lg:pb-20 flex-1 overflow-y-auto scrollbar-hidden bg-blue-100">
                <Outlet />
              </main>
              <Rightbar />
            </div>
          </div>
          <AddProperty/>
        </RequireAuth>
      )}
    </DataProvider>
  );
};

export default Layout;

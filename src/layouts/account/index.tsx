// import * as React from "react";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
// import { DefaultSidebar } from "./Sidebar";

const AccountLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Appbar />
      <main className="flex-1">
        <div className=" ">
          {/* <div className="mx-16  py-6 sm:px-6 lg:px-1"> */}
          {/* <Dashboard /> */}
          <Outlet />
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} EduLearn. All rights reserved.
          </p>
          {/* Add additional footer links here */}
        </div>
      </footer>
    </div>
  );
};

export default AccountLayout;

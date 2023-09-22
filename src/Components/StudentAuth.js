import React from "react";
import { Outlet } from "react-router-dom";

const StudentAuth = () => {
  return (
    <div className="flex flex-col max-w-[100vw] min-h-[100vh] items-center justify-center relative ">

      <Outlet />
    </div>
  );
};

export default StudentAuth;

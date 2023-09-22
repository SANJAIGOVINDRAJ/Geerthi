import React, { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Schedule from "./Schedule";
import { Outlet } from "react-router-dom";

const EditPage = () => {
  return (
    <div className="flex flex-col max-w-[100vw] min-h-[100vh] items-center justify-center  ">
      <Outlet />
    </div>
  );
};

export default EditPage;

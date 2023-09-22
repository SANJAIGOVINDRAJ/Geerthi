import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StaffReg = () => {
  const navigate = useNavigate();
  const Formik = useFormik({
    initialValues: {
      Name: "",
      Password: "",
      Email: "",
      admin: false,
      role : "staff"
    },
    onSubmit: async (values) => {
      if (values.Email === "" || values.Password === "" || values.Name ==="") {
        return toast.warning("Fill the Contents", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      const result = await axios
        .post("http://localhost:8000/staff", values, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() =>
          toast.success("Succesfully Registered", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        )
        .then(() => navigate("/staff"));
      console.log(result.data);
    },
  });
  return (
    <div className=" bg-white p-10 flex flex-col gap-8 mt-20 rounded-md  items-center justify-center px-20">
      <div className=" w-4/5 border-b-2 border-slate-300 my-2 flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-14 h-14 text-slate-600 drop-shadow-xl  "
        >
          <path
            fill-rule="evenodd"
            d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
            clip-rule="evenodd"
          />
          <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
        </svg>
        <p className="mb-10 text-slate-600 font-semibold uppercase tracking-widest">
          Faculty Details
        </p>
      </div>{" "}
      <div className=" flex justify-between items-center ml-8 ">
        <label className=" mr-5">Name:</label>
        <input
          type="text"
          name="Name"
          id="Name"
          value={Formik.values.Name}
          onChange={Formik.handleChange}
          className="p-2 px-2  border-2 w-60 text-slate-400 font-medium border-slate-300 outline-none rounded-lg focus:border-4 focus:border-slate-400 focus:ring-4 focus:ring-slate-300"
        />
      </div>
      <div className=" flex justify-between items-center ml-8 ">
        <label className=" mr-5">Email:</label>
        <input
          type="email"
          name="Email"
          id="Email"
          value={Formik.values.Email}
          onChange={Formik.handleChange}
          className="p-2 px-2  border-2 w-60 text-slate-400 font-medium border-slate-300 outline-none rounded-lg focus:border-4 focus:border-slate-400 focus:ring-4 focus:ring-slate-300"
        />
      </div>
      <div className=" block">
        <label className=" mr-5">Password:</label>
        <input
          type="password"
          name="Password"
          id="Password"
          value={Formik.values.Password}
          onChange={Formik.handleChange}
          className="p-2 px-2  border-2 w-60 text-slate-400 font-medium border-slate-300 outline-none rounded-lg focus:border-4 focus:border-slate-400 focus:ring-4 focus:ring-slate-300"
        />
      </div>
      <button
        type="Submit"
        onClick={Formik.handleSubmit}
        className=" bg-slate-600 rounded-lg  shadow-md uppercase hover:shadow-2xl hover:shadow-slate-600 text-slate-100 p-3 px-5"
      >
        Register
      </button>
      <Link
        to={"/staff"}
        className=" -mt-5 text-xs active:text-red-500 underline"
      >
        Already have an Account
      </Link>
    </div>
  );
};

export default StaffReg;

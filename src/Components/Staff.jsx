import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Staff = () => {
  const [input, setinput] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/staff")
      .then((response) => {
        return response.data;
      })
      .then((data) => setinput(data));
  }, []);
  const Formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: async (values) => {
      if (values.Email === "" || values.Password === "") {
        return toast.warning("Fill the Email and Password", {
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
      const filtered = await input.filter(
        (fil) => fil.Email === values.Email && fil.Password === values.Password
      );
      console.log(filtered);
      filtered[0]?.Email && filtered[0]?.Password
        ? localStorage.setItem("Email", values.Email)
        : toast.error("Email or Password is Wrong", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      filtered[0]?.Email &&
        filtered[0]?.Password &&
        toast.success("Succesfully Logged In", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      filtered[0]?.Email &&
        filtered[0]?.Password &&
        navigate("/home", {
          state: {
            admin: filtered[0].admin,
          },
        });
    },
  });
  return (
    <div className=" bg-white p-10 flex flex-col gap-8 mt-20 h-[70vh] rounded-md  items-center justify-center">
      <div className=" w-4/5 border-b-2 border-slate-300 my-5 flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-14 h-14 text-slate-600 drop-shadow-xl "
        >
          <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
        </svg>
        <p className="mb-10 text-slate-600 font-semibold uppercase tracking-widest">
          Faculty Details
        </p>
      </div>
      <div className=" block ml-8">
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
      <div className=" flex justify-between items-center ">
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
        className=" bg-slate-600 rounded-lg my-5 shadow-md uppercase hover:shadow-2xl hover:shadow-slate-600 text-slate-100 p-3 px-5"
      >
        Log In
      </button>
      <Link
        to={"/staffreg"}
        className=" -mt-10 text-xs active:text-red-500 underline"
      >
        Register Account
      </Link>
    </div>
  );
};

export default Staff;

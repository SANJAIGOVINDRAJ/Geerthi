import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentLogin = () => {
  const [input, setinput] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/student")
      .then((response) => {
        return response.data;
      })
      .then((data) => setinput(data));
  }, []);

  const Formik = useFormik({
    initialValues: {
      Password: "",
      Email: "",
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
      filtered[0]?.Email && filtered[0]?.Password && navigate("/home",{
        state : {
          role : "student"
        }
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
          class="w-14 h-14 text-slate-600 drop-shadow-xl"
        >
          <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
          <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
          <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
        </svg>
        <p className="mb-10 text-slate-600 font-semibold uppercase tracking-widest">
          Student Login
        </p>
      </div>
      <div className=" block ml-8">
        <label className=" mr-5"> Email:</label>
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
        <label className=" mr-5"> Password:</label>
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
        Login
      </button>
      <Link
        to={"/studentRegister"}
        className=" -mt-10 text-xs active:text-red-500 underline"
      >
        Register Account
      </Link>
    </div>
  );
};

export default StudentLogin;

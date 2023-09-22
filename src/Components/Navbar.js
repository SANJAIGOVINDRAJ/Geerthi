import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [show, setshow] = useState(false);
  const [input, setinput] = useState(false);
  const [summa, setsumma] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/staff")
      .then((response) => {
        return response.data;
      })
      .then((data) =>
        data.filter((fil) => fil.Email === localStorage.getItem("Email"))
      )
      .then((data) => data.filter((fil) => fil.admin === true)).then((data) => setsumma(data[0]))
  });
  return (
    <div className=" fixed p-6  top-0 bg-slate-600 w-full px-20 flex items-center shadow-xl justify-between ">
      <div className=" text-4xl font-bold text-slate-100 ">
        Bishop Heber College (Autonomous)
      </div>
      <div className=" flex gap-10">
        <button
          onClick={() => setshow(!show)}
          className=" text-slate-100 uppercase font-bold tracking-wider"
        >
          {show ? (
            <Link to={"/home"}>Home</Link>
          ) : (
            <Link
              to={"/edit"}
              className={` ${
                summa && summa.admin ? "visible" : "invisible"
              }`}
            >
              Edit
            </Link>
          )}
        </button>
        <div
          onClick={() => setinput(!input)}
          className=" relative flex gap-2 items-center justify-center bg-white p-3 cursor-pointer rounded-md underline underline-offset-2 decoration-slate-300 tracking-wider"
        >
          <p className=" text-slate-600 font-semibold">
            {localStorage.getItem("Email")}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-slate-600"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clip-rule="evenodd"
            />
          </svg>
          {input && (
            <div
              className=" absolute top-14 z-50 bg-white px-20 p-2 rounded-lg shadow-2xl "
              onClick={() => {
                localStorage.clear();
                toast.success("Successfully Looged Out!", {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                navigate("/");
              }}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

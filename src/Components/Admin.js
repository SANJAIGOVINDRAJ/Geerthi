import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Admin = () => {
  const [input, setinput] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/staff")
      .then((response) => {
        return response.data;
      })
      .then((data) => setinput(data));
      console.log(input)
  }, []);
  const Formik = useFormik({
    initialValues: {
      admin: true,
      Email: "",
    },
    onSubmit: async (values) => {
        if (values.Email === "") {
            return toast.warning("Select the Email", {
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
            (fil) => fil.Email === values.Email
          );
          console.log(filtered);
          filtered[0]?.id 
            ? axios.put(`http://localhost:8000/staff/${filtered[0].id}`, {...filtered[0], admin : true})
            : toast.error("Email is Wrong", {
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
          <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
        </svg>
        <p className="mb-10 text-slate-600 font-semibold uppercase tracking-widest">
          Make Admin
        </p>
      </div>
      <div className=" flex justify-between items-center ">
        <label className=" mr-5">Admin:</label>
        <select
          className="p-2 px-2  border-2 w-60 text-slate-400 font-medium border-slate-300 outline-none rounded-lg focus:border-4 focus:border-slate-400 focus:ring-4 focus:ring-slate-300"
          id="Email"
          name="Email"
          value={Formik.values.Email}
          onChange={Formik.handleChange}
        >
          <option className=" p-5">
            {Formik.values.staff ? Formik.values.staff : "Select the Staff"}
          </option>
          {input &&
            input.map((sub) => (
              <option key={sub.id} className=" p-5">
                {sub.Email}
              </option>
            ))}
        </select>
      </div>
      <button
        type="Submit"
        onClick={Formik.handleSubmit}
        className=" bg-slate-600 rounded-lg my-5 shadow-md uppercase hover:shadow-2xl hover:shadow-slate-600 text-slate-100 p-3 px-5"
      >
        Admin
      </button>
    </div>
  );
};

export default Admin;

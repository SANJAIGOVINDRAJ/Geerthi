import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Course = () => {
  const [input, setinput] = useState("");
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
      course: "",
      staff: "",
    },
    onSubmit: async (values) => {
      if (values.course === "" || values.course === "") {
        return toast.warning("Fill the Course Details", {
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
        .post("http://localhost:8000/course", values, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          toast.success("Successfully  Registered", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          Formik.values.course = "";
          Formik.values.staff = "";
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
          class="w-14 h-14  text-slate-600 drop-shadow-xl  "
        >
          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
        </svg>
        <p className="mb-10 text-slate-600 font-semibold uppercase tracking-widest">
          Course Details
        </p>
      </div>
      <div className=" block">
        <label className=" mr-5">Course Name:</label>
        <input
          type="text"
          name="course"
          id="course"
          value={Formik.values.course}
          onChange={Formik.handleChange}
          placeholder="Course Name "
          className="p-2 px-2  border-2 w-60 placeholder:text-slate-400 text-slate-400 font-medium border-slate-300 outline-none rounded-lg focus:border-4 focus:border-slate-400 focus:ring-4 focus:ring-slate-300"
        />
      </div>
      <div className=" flex justify-between items-center ml-14 ">
        <label className=" mr-5">Faculty:</label>
        <select
          className="p-2 px-2  border-2 w-60 text-slate-400 font-medium border-slate-300 outline-none rounded-lg focus:border-4 focus:border-slate-400 focus:ring-4 focus:ring-slate-300"
          id="staff"
          name="staff"
          value={Formik.initialValues.staff}
          onChange={Formik.handleChange}
        >
          <option className=" p-5">
            {Formik.values.staff ? Formik.values.staff : "Select the Staff"}
          </option>
          {input &&
            input.map((sub) => (
              <option key={sub.id} className=" p-5">
                {sub.Name}
              </option>
            ))}
        </select>
      </div>
      <button
        type="Submit"
        onClick={Formik.handleSubmit}
        className=" bg-slate-600 rounded-lg my-5 shadow-md uppercase hover:shadow-2xl hover:shadow-slate-600 text-slate-100 p-3 px-5"
      >
        Add Course
      </button>
    </div>
  );
};

export default Course;

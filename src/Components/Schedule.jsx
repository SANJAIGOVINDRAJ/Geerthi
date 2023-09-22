import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

const Schedule = (data) => {
  const days = ["I", "II", "III", "IV", "V" , "VI"];
  const timeslots = ["I", "II", "III", "IV", "V"];

  const [input, setinput] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/course")
      .then((response) => {
        return response.data;
      })
      .then((data) => setinput(data));
  }, []);
  const Formik = useFormik({
    initialValues: {
      Subject: "",
      Day: "",
      Time: "",
    },
    onSubmit: async (values) => {
      const result = await axios.post(
        "http://localhost:8000/timetableData",
        values,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(result.data);
      Formik.values.Day = ""
      Formik.values.Subject = ""
      Formik.values.Time = ""
    },
  });
  console.log(data)
  return (
    <div>
      <div className=" flex  flex-col gap-10 items-center justify-center w-[70vw]  shadow-md bg-white mt-20 p-10 rounded-lg">
        <div className=" w-4/5 border-b-2 border-slate-300 my-5 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-14 h-14 mb-10 text-slate-500 drop-shadow-xl  "
          >
            <path
              fill-rule="evenodd"
              d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div className=" flex gap-28 w-full items-center justify-center">
          {" "}
          <div className=" flex flex-col gap-10 items-center justify-center">
            <div className=" flex gap-2 flex-col items-center justify-center w-full">
              <label className="  text-slate-600 font-semibold uppercase tracking-wider">Course</label>
              <select
                className="p-2 px-2  border-2 w-96 text-slate-400 font-medium border-slate-300 outline-none rounded-lg focus:border-4 focus:border-slate-400 focus:ring-4 focus:ring-slate-300"
                id="Subject"
                name="Subject"
                value={Formik.initialValues.Subject}
                onChange={Formik.handleChange}
              >
                <option className=" p-5">
                  {Formik.values.Subject
                    ? Formik.values.Subject
                    : "Select the Subject"}
                </option>
                {input &&
                  input.map((sub) => (
                    <option key={sub.id} className=" p-5">
                      {sub.course} - {sub.staff}
                    </option>
                  ))}
              </select>
            </div>

            <div className=" flex gap-14 ">
              <div className=" flex gap-2 flex-col items-center justify-end">
                <label className="text-slate-600 font-semibold uppercase tracking-wider">Day</label>
                <select
                  className="p-2 px-2  border-2 w-32 text-slate-400 font-medium border-slate-300 outline-none rounded-lg focus:border-4 focus:border-slate-400 focus:ring-4 focus:ring-slate-300"
                  id="Day"
                  name="Day"
                  value={Formik.initialValues.Day}
                  onChange={Formik.handleChange}
                >
                  <option className=" p-5">
                    {Formik.values.Day ? Formik.values.Day : "Select"}
                  </option>
                  {days.map((sub) => (
                    <option key={sub} className=" p-5">
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" flex gap-2 flex-col items-center">
                <label className="text-slate-600 font-semibold uppercase tracking-wider">Period</label>
                <select
                  className="p-2 px-2  border-2 w-32 text-slate-400 font-medium border-slate-300 outline-none rounded-lg focus:border-4 focus:border-slate-400 focus:ring-4 focus:ring-slate-300"
                  id="Time"
                  name="Time"
                  value={Formik.initialValues.Time}
                  onChange={Formik.handleChange}
                >
                  <option className=" p-5">
                    {Formik.values.Time
                      ? Formik.values.Time
                      : "Select"}
                  </option>
                  {timeslots.map((sub) => (
                    <option key={sub} className=" p-5">
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={Formik.handleSubmit}
          className=" bg-slate-600 rounded-lg shadow-md my-5 uppercase hover:shadow-2xl hover:shadow-slate-600 text-slate-100 p-3 px-5"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Schedule;

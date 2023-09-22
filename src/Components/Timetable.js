import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Timetable = () => {
  const days = ["I", "II", "III", "IV", "V", "VI"];
  const time = ["I", "II", "III", "IV", "V"];
  const [show, setshow] = useState(false);
  const [timetableData, settimetableData] = useState(null);
  const location = useLocation()
  useEffect(() => {
    axios
      .get("http://localhost:8000/timetableData")
      .then((response) => {
        return response.data;
      })
      .then((data) => settimetableData(data));

  }, []);
  
  const removeUser = async (id) => {
    const res = await axios
      .delete(`http://localhost:8000/timetableData/${id}`)
      .then(() => {
        axios
          .get("http://localhost:8000/timetableData")
          .then((response) => {
            return response.data;
          })
          .then((data) => settimetableData(data));
      });
    console.log("Item successfully deleted.");
  };

  return (
    <div className=" flex flex-col max-w-[100vw] h-[100vh] items-center justify-center  ">
      <table class="table-fixed bg-white rounded-xl shadow-lg mt-20">
        <thead>
          <div>
            <th className="w-40 text-center p-5 border border-t-0 text-slate-200 rounded-tl-xl uppercase tracking-widest border-b-0 border-l-0 bg-slate-600 border-slate-300">
              Schedule
            </th>
            {time.map((t) => (
              <th
                className=" text-center  text-slate-200 last:rounded-tr-xl border border-t-0 border-r-0 border-b-0 bg-slate-600 border-slate-300 w-60  p-5"
                key={t}
              >
                {t}
              </th>
            ))}
          </div>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr className=" flex  " key={day}>
              <td className=" w-40 last:rounded-bl-xl tracking-widest text-center p-5 border bg-slate-600 flex items-center justify-center uppercase  border-l-0 border-b-0 border-r-0 font-semibold text-slate-200 border-slate-300">
                {day}
              </td>
              {time.map((timeslot) => (
                <div
                  className="w-60 text-center p-3 border  border-b-0 border-r-0 border-slate-300"
                  key={timeslot}
                >
                  {timetableData?.map((data) => {
                    if (data.Day === day && data.Time === timeslot) {
                      return (
                        <div
                          className="bg-slate-200/80 relative hover:shadow-xl cursor-pointer shadow rounded-lg p-3"
                          key={data.id}
                          onClick={() => setshow(!show)}
                        >
                          <div className=" font-bold">
                            {data.Subject.split("-")[0]}
                          </div>
                          <div className=" text-slate-500 text-xs">
                            {data.Subject.split("-")[1]}
                          </div>
                          { !location?.state.role == "student" && (show && (
                            <div className=" absolute bg-white w-20 h-10 flex gap-5 items-center justify-center z-50 shadow-2xl shadow-slate-600 rounded-lg  right-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                                onClick={() => removeUser(data.id)}
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Timetable;

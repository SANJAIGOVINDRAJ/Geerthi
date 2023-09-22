import React from "react";
import Timetable from "./Components/Timetable";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import EditPage from "./Components/EditPage";
import AuthPage from "./Components/AuthPage";
import Selection from "./Components/Selection";
import Staff from "./Components/Staff";
import Student from "./Components/Student";
import Course from "./Components/Course";
import Schedule from "./Components/Schedule";
import AuthSelection from "./Components/AuthSelection";
import StudentAuth from "./Components/StudentAuth";
import StudentLogin from "./Components/StudentLogin";
import StaffAuth from "./Components/StaffAuth";
import StaffReg from "./Components/StaffReg";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./Components/Admin";
const App = () => {
  return (
    <div className=" bg-slate-100">
      <Navbar />
      <Routes>
        <Route element={<AuthSelection />}>
          <Route path="/" element={<AuthPage />} />
          <Route  element={<StudentAuth />}>
            <Route path="/studentRegister" element={<Student />} />
            <Route path="/student" element={<StudentLogin />} />
          </Route>
          <Route element={<StaffAuth />}>
            <Route path="/staff" element={<Staff />} />
            <Route path="/staffreg" element={<StaffReg />} />
          </Route>
        </Route>
        <Route path="/home" element={<Timetable />} />
        <Route element={<EditPage />}>
          <Route path="/edit" element={<Selection />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/course" element={<Course />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};
export default App;

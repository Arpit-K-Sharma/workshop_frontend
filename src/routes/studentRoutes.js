import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentProfile from "pages/student/studentProfile";

const StudentRoutes = (
  <Routes>
    <Route path="/student" element={<StudentProfile />} />
  </Routes>
);

export default StudentRoutes;

import ProtectedSchool from "@/utils/protectedSchoo";
import { SchoolContextProvider } from "context/AdminSchoolContext";
import ClassDetails from "pages/admin/admin_pages/class_details/classDetails";
import ClassAttendancePage from "pages/admin/admin_pages/school_pages/classAttendance";
import SchoolCourses from "pages/admin/admin_pages/school_pages/schoolCourses";
import SchoolProfile from "pages/admin/admin_pages/school_pages/schoolProfile";
import SchoolDashboard from "pages/school/schoolOverview";
import SchoolCalendar from "pages/student/schoolAcademicCalendar";
import SchoolClasses from "pages/school/schoolClasses";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { NewSchoolContextProvider } from "context/NewSchoolContext";
import SchoolCoursesPage from "pages/school/coursesPage";
import NewSchoolCalendar from "pages/school/schoolCalendar";
import NewSchoolProfile from "pages/school/schoolProfile";

const SchoolRoutesProtection = (
  <NewSchoolContextProvider>
    <Routes>
      <Route element={<ProtectedSchool />}>
        {/* <Route path="/admin/" element={< />} /> */}
        <Route path="/school" element={<SchoolDashboard />} />
        <Route path="/school/classes" element={<SchoolClasses />} />
        <Route path="/school/classes/:classId" element={<ClassDetails />} />
        <Route path="/school/courses" element={<SchoolCoursesPage />} />
        <Route path="/school/calendar" element={<NewSchoolCalendar />} />
        <Route path="/school/profile" element={<NewSchoolProfile />} />
        <Route
          path="/class/attendance/:classId"
          element={<ClassAttendancePage />}
        />
      </Route>
    </Routes>
  </NewSchoolContextProvider>
);

export default SchoolRoutesProtection;

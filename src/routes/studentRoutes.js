import { Route, Routes } from "react-router-dom";
import StudentsProfile from "pages/student/studentProfile";
import ProtectedStudent from "@/utils/protectedStudent";
import StudentDashboard from "pages/student/studentDashboard";
import ClassesDashboard from "pages/student/studentClasses";
import StudentAttendance from "pages/student/individualStudentPage";
import SchoolCalendar from "pages/student/schoolAcademicCalendar";
import AssignmentPage from "pages/student/assignmentPage";

const StudentRoutes = (
  <Routes>
    <Route element={<ProtectedStudent />}>
      <Route key="student" path="/student" element={<StudentDashboard />} />
      <Route
        key="student"
        path="/student/classes"
        element={<ClassesDashboard />}
      />
      <Route
        key="student"
        path="/student/profile"
        element={<StudentsProfile />}
      />
      <Route
        key="attendance"
        path="/student/attendances/:studentId"
        element={<StudentAttendance />}
      />
      <Route
        key="assignment"
        path="/student/assignment"
        element={<AssignmentPage />}
      />
      <Route
        key="attendance"
        path="/student/calendar"
        element={<SchoolCalendar />}
      />
    </Route>
  </Routes>
);

export default StudentRoutes;

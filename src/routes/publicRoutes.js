import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import SignInPage from "pages/authentication/login";
import AboutUs from "pages/aboutus/aboutus";
import Courses from "pages/courses/courses";
import MentorLogin from "pages/authentication/mentorlogin";
import StudentProfile from "pages/student/studentProfile";
import ClassesDashboard from "pages/student/studentClasses";
import StudentDashboard from "pages/student/studentDashboard";
import ContactUs from "pages/contactus/contactus";

const PublicRoutes = [
  <Routes>
    <Route key="landing" path="/" element={<LandingPage />} />,
    <Route key="auth" path="/login" element={<SignInPage />} />,
    <Route key="auth" path="/mlogin" element={<MentorLogin />} />,
    <Route key="aboutus" path="/about" element={<AboutUs />} />,
    <Route key="courses" path="/courses" element={<Courses />} />,
    <Route key="student" path="/student" element={<StudentDashboard />} />
    <Route
      key="student"
      path="/student/classes"
      element={<ClassesDashboard />}
    />
    <Route key="student" path="/student/profile" element={<StudentProfile />} />
    <Route key="contact" path="/contact" element={<ContactUs />} />
  </Routes>,
];

export default PublicRoutes;

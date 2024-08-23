import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import SignInPage from "pages/authentication/login";
import AboutUs from "pages/aboutus/aboutus";
import Courses from "pages/courses/courses";

const PublicRoutes = [
  <Routes>
    <Route key="landing" path="/" element={<LandingPage />} />,
    <Route key="auth" path="/login" element={<SignInPage />} />,
    <Route key="aboutus" path="/about" element={<AboutUs />} />,
    <Route key="courses" path="/courses" element={<Courses />} />,
  </Routes>,
];

export default PublicRoutes;

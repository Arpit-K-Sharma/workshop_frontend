import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import SignInPage from "pages/authentication/login";

const PublicRoutes = [
  <Routes>
    <Route key="landing" path="/" element={<LandingPage />} />,
    <Route key="auth" path="/login" element={<SignInPage />} />,
  </Routes>,
];

export default PublicRoutes;

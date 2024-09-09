import ProtectedSchool from "@/utils/protectedSchoo";
import { SchoolContextProvider } from "context/SchoolContext";
import SchoolDashboard from "pages/school/schoolOverview";
import React from "react";
import { Route, Routes } from "react-router-dom";

const SchoolRoutesProtection = (
  <SchoolContextProvider>
    <Routes>
      <Route element={<ProtectedSchool />}>
        {/* <Route path="/admin/" element={< />} /> */}
        <Route path="/school" element={<SchoolDashboard />} />
      </Route>
    </Routes>
  </SchoolContextProvider>
);

export default SchoolRoutesProtection;

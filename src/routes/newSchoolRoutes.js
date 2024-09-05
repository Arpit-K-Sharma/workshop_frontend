import ProtectedSchool from "@/utils/protectedSchoo";
import React from "react";
import { Route, Routes } from "react-router-dom";

const SchoolRoutesProtection = (
  <Routes>
    <Route element={<ProtectedSchool />}>
      {/* <Route path="/admin/" element={< />} /> */}
    </Route>
  </Routes>
);

export default SchoolRoutesProtection;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import LoomMaster from "../pages/Loom/LoomMaster";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/looms" element={<LoomMaster />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
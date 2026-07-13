import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import LoomMaster from "../pages/Loom/LoomMaster";
import PartyMaster from "../pages/Party/PartyMaster";
import BeamReceipt from "../pages/Beam/BeamReceipt/BeamReceipt";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/looms" element={<LoomMaster />} />
          <Route path="/parties" element={<PartyMaster />} />
          <Route path="/beam-receipts" element={<BeamReceipt />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

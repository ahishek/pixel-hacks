import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import CCDetails from "./pages/CCDetails";
import MerchantApps from "./pages/MerchantApps";
import LoadingTransition from "./pages/LoadingTransition";
import SuccessState from "./pages/SuccessState";
import ManageTokens from "./pages/ManageTokens";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/cc-details" replace />} />
          <Route path="/cc-details" element={<CCDetails />} />
          <Route path="/merchant-apps" element={<MerchantApps />} />
          <Route path="/loading-transition" element={<LoadingTransition />} />
          <Route path="/success-state" element={<SuccessState />} />
          <Route path="/manage-tokens" element={<ManageTokens />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
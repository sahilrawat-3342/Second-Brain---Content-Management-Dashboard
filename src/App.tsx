import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import SharedBrain from "./Pages/SharedBrain";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/share/:hash" element={<SharedBrain />} />
    </Routes>
  </BrowserRouter>
}
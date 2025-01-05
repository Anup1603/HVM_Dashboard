import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Approval from "./pages/Approval";
import Denied from "./pages/Denied";
import Requested from "./pages/Requested";
import axios from "../src/axiosInstance";
import { useEffect, useState } from "react";

import LandingPage from "./screens/LandingPage";
import AuthPage from "./screens/AuthPage";
import ProfilePage from "./screens/ProfilePage";
import useFetchVisitorData from "./connections/useFetchVisitorData";
import useFetchHospitalData from "./connections/useFetchHospitalData";

function App() {
  const [visitors, setVisitors] = useState([]);
  const [approvedVisitors, setApprovedVisitors] = useState([]);
  const [deniedVisitors, setDeniedVisitors] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);

  useFetchHospitalData(setHospitalData);

  const registorHospital = async (details) => {
    try {
      const { data } = await axios.post(`/api/hospital/register`, details, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHospitalData([...hospitalData, data]);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  const loginHospital = async (details) => {
    try {
      const { data } = await axios.post(`/api/hospital/login`, details, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHospitalData([...hospitalData, data]);
      localStorage.setItem("hospital", JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid email or password. Please try again!");
      return false;
    }
  };

  useFetchVisitorData(setVisitors, setApprovedVisitors, setDeniedVisitors);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/auth/:authMode"
          element={
            <AuthPage
              registorHospital={registorHospital}
              loginHospital={loginHospital}
            />
          }
        />

        <Route path="/auth/hospitalProfile" element={<ProfilePage />} />

        <Route
          path="/auth/:hospitalId/requested"
          element={
            <Requested
              visitors={visitors}
              setApprovedVisitors={setApprovedVisitors}
              setDeniedVisitors={setDeniedVisitors}
            />
          }
        />
        <Route
          path="/auth/:hospitalId/approval"
          element={<Approval approvedVisitors={approvedVisitors} />}
        />
        <Route
          path="/auth/:hospitalId/denied"
          element={<Denied deniedVisitors={deniedVisitors} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

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

function App() {
  const [visitors, setVisitors] = useState([]);
  const [approvedVisitors, setApprovedVisitors] = useState([]);
  const [deniedVisitors, setDeniedVisitors] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);

  const fetchHospitalData = async () => {
    try {
      const { data } = await axios.get(`/api/hospital`);
      setHospitalData(data);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  useEffect(() => {
    fetchHospitalData();
  }, []);

  const registorHospital = async (details) => {
    try {
      const { data } = await axios.post(`/api/hospital/register`, details, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Hospital Register Data:", data);
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
      console.log("Hospital Login Data:", data);
      localStorage.setItem("hospital", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  const hospitalLocalStorage = JSON.parse(localStorage.getItem("hospital"));

  const fetchVisitorData = async () => {
    try {
      if (!hospitalLocalStorage || !hospitalLocalStorage._id) {
        console.warn("Hospital data is not available in localStorage.");
        return;
      }

      const response = await axios.get(
        `/api/visitors/${hospitalLocalStorage._id}`
      );

      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setVisitors(
        sortedData.filter((visitor) => visitor.isApproved === "Pending")
      );

      setApprovedVisitors(
        sortedData.filter((visitor) => visitor.isApproved === "Yes")
      );

      setDeniedVisitors(
        sortedData.filter((visitor) => visitor.isApproved === "No")
      );
    } catch (error) {
      console.warn("Error fetching visitor data:", error);
    }
  };

  useEffect(() => {
    fetchVisitorData();
    const interval = setInterval(() => {
      fetchVisitorData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
              hospitalLocalStorage={hospitalLocalStorage}
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

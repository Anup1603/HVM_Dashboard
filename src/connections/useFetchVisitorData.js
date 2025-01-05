import { useEffect } from "react";
import axios from "../axiosInstance";

const fetchVisitorData = async (setVisitors, setApprovedVisitors, setDeniedVisitors) => {
    try {
        // Parse localStorage data
        const hospitalLocalStorage = JSON.parse(localStorage.getItem("hospital"));

        // Check if hospital data is valid
        if (!hospitalLocalStorage || !hospitalLocalStorage._id) {
            console.warn("Hospital data is not available or invalid in localStorage.");
            return; // Exit the function if data is missing or invalid
        }

        // Fetch visitor data using the hospital ID
        const response = await axios.get(`/api/visitors/${hospitalLocalStorage._id}`);

        // Sort data by `createdAt` in descending order
        const sortedData = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Set state for visitors based on their approval status
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
        console.error("Error fetching visitor data:", error); // Log the error for debugging
    }
};

const useFetchVisitorData = (setVisitors, setApprovedVisitors, setDeniedVisitors) => {
    useEffect(() => {
        // Call the fetchVisitorData function initially
        fetchVisitorData(setVisitors, setApprovedVisitors, setDeniedVisitors);

        // Set up an interval to refetch data every second
        const interval = setInterval(() => {
            fetchVisitorData(setVisitors, setApprovedVisitors, setDeniedVisitors);
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [setVisitors, setApprovedVisitors, setDeniedVisitors]);
};

export default useFetchVisitorData;

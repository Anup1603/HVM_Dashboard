import { useEffect } from "react";
import axios from "../axiosInstance";

const fetchHospitalData = async (setHospitalData) => {
    try {
        const { data } = await axios.get(`/api/hospital`);
        setHospitalData(data);
    } catch (error) {
        console.error("Error fetching hospital data:", error);
    }
};

const useFetchHospitalData = (setHospitalData) => {
    useEffect(() => {
        fetchHospitalData(setHospitalData);

        const interval = setInterval(() => {
            fetchHospitalData(setHospitalData);
        }, 1000);

        return () => clearInterval(interval);
    }, [setHospitalData]);
};

export default useFetchHospitalData;
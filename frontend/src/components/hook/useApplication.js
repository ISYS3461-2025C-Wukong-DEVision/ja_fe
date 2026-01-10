import { getApplications, createApplication } from "../../services/applicationService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useApplication = () => {
    const [myApplied, setMyApplied] = useState([])
    const [create, setCreate] = useState({})

    const fetchMyApplied = async (id) => {
        try {
            const data = {applicantId: id}
            const reponse = await getApplications(data)
            setMyApplied(reponse?.data)
        } catch (error) {
            console.error("Error: ", error.message)
        }
    }

    const createApplied = async () => {
        try {
            const reponse = await createApplication(create) 
            toast.success("Apply job successfully")
            return reponse
        } catch (error) {
            console.error("Error: ", error.message)
        }
    }

    return {
        myApplied, fetchMyApplied, setCreate, create, createApplied 
    }
}
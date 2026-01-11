import { getApplications, createApplication } from "../../services/applicationService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useApplication = () => {
    const [myApplied, setMyApplied] = useState([])
    const [isApplied, setIsApplied] = useState(false)

    const fetchMyApplied = async (id) => {
        try {
            const data = {applicantId: id}
            const reponse = await getApplications(data)
            setMyApplied(reponse?.data)
        } catch (error) {
            console.error("Error: ", error.message)
        }
    }

    const fetchMyAppliedJob = async (id, jobId) => {
        try {
            const data = {applicantId: id, jobPostUuid: jobId}
            const reponse = await getApplications(data)
            setIsApplied(reponse?.data.length == 0 ? false : true)
        } catch (error) {
            console.error("Error: ", error.message)
        }
    }

    const createApplied = async (create) => {
        try {
            const reponse = await createApplication(create) 
            toast.success("Apply job successfully")
            return reponse
        } catch (error) {
            console.error("Error: ", error.message)
        }
    }

    return {
        myApplied, fetchMyApplied, createApplied, fetchMyAppliedJob, isApplied
    }
}
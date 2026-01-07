import { getApplicantById, updateApplicant, createApplicant } from "../../services/applicantService";
import { useState, useEffect } from "react";

export const useProfile = () => {
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false)
    const [editingProfile, setEditingProfile] = useState(null)


    //Logic edit & create profile
    const handSave = async (formData) => {
        try {
            if (editingProfile) {
                const updated = await updateApplicant(editingProfile.id, formData);
                setProfile(updated);
            } else {
                const create = await createApplicant(formData);
                setProfile(create);
            }
            setEditingProfile(null);
        } catch (error) { alert("Saved failed: " + error.message); }
    };

    //Fetch profile 
    const fetchProfile = async (id) => {
        setLoading(true);
        try {
            const data = await getApplicantById(id);
            setProfile(data);
        } catch (error) {console.error("Fetch error", error); }
        finally {setLoading(false);}
    }


    return {
        loading, profile, fetchProfile, 
        handSave, editingProfile, setEditingProfile
    }
}
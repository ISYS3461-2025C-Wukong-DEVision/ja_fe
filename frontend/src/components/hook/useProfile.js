import { getApplicantById, updateApplicant, createApplicant } from "../../services/applicantService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useProfile = () => {
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false)
    const [editingProfile, setEditingProfile] = useState(null)
    const [isProfileOpen, setIsProfileOpen] = useState(false)


    //Logic edit & create profile
    const handSave = async (formData) => {
        try {
            if (editingProfile) {
                const updated = await updateApplicant(editingProfile.id, formData);
                setProfile(updated);
                return updated
            } else {
                const create = await createApplicant(formData);
                setProfile(create);
                return create
            }
            setEditingProfile(null);
        } catch (error) { toast.error("Saved failed: Your objecttive is too long."); }
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
        handSave, editingProfile, setEditingProfile,
        isProfileOpen, setIsProfileOpen
    }
}
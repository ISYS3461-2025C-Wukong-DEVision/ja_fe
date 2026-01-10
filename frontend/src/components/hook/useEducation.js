import { useState } from "react";
import { createEducation, updateEducation, deleteEducation } from "../../services/educationService";

export const useEducation = () => {
    const [editingEducation, setEditingEducation] = useState(null)
    const [isEducationOpen, setIsEducationOpen] = useState(false)

    const educationHandSave = async (userId, formData, onSuccess) => {
        try {
            if (editingEducation) {
                const updated = await updateEducation(userId, editingEducation.id, formData)
                setIsEducationOpen(false);
                if (onSuccess) {
                    await onSuccess();
                }
            }else{
                const create = await createEducation(userId, formData);
                setIsEducationOpen(false);
                if (onSuccess) {
                    await onSuccess();
                }
            }
            setEditingEducation(null);
        } catch (error) { console.error("Saved failed: ", error.message); }
    };

    const educationDelete = async (userId, id) => {
        try {
            await deleteEducation(userId, id);
        } catch (error) {
            console.error("Delete failed: ", error.message);
        }
    }

    return {
        editingEducation, setEditingEducation,
        educationHandSave, educationDelete,
        isEducationOpen, setIsEducationOpen
    }
}
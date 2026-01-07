import { useState } from "react";
import { createWorkExperience, updateWorkExperience, deleteWorkExperience } from "../../services/workExperienceService";

export const useWorkExperience = () => {
    const [editingWorkExperience, setEditingWorkExperience] = useState(null)
    const [isWorkOpen, setIsWorkOpen] = useState(false)

    const workHandSave = async (userId, formData, onSuccess) => {
        try {
            if (editingWorkExperience) {
                const updated = await updateWorkExperience(userId, editingWorkExperience.id, formData);
                setIsWorkOpen(false)
                if (onSuccess) {
                    await onSuccess();
                }
            } else {
                const create = await createWorkExperience(userId, formData);
                setIsWorkOpen(false)
                if (onSuccess) {
                    await onSuccess();
                }
            }
            setEditingWorkExperience(null);
        } catch (error) { alert("Saved failed: " + error.message); }
    };

    const workDelete = async (id, onSuccess) => {
        try {
            await deleteWorkExperience(id);
            if (onSuccess) {
                await onSuccess();
            }
        } catch (error) {
            alert("Delete failed: " + error.message)
        }
    }

    return {
        editingWorkExperience, setEditingWorkExperience,
        workHandSave, workDelete,
        isWorkOpen, setIsWorkOpen
    }
}
import { useState } from "react";
import { createJobPreference, updateJobPreference } from "../../services/jobReferenceService";

export const useJobPreference = () => {
    const [editingJobPreference, setEditingJobPreference] = useState(null)
    const [isJobPreferenceOpen, setIsJobPreferenceOpen] = useState(false)

    const jobPreferenceHandSave = async (userId, formData, onSuccess) => {
        try {
            if (editingJobPreference) {
                const updated = await updateJobPreference(userId, editingJobPreference.id, formData);
                setIsJobPreferenceOpen(false)
                if (onSuccess) {
                    await onSuccess();
                }
            } else {
                const create = await createJobPreference(userId, formData);
                setIsJobPreferenceOpen(false)
                if (onSuccess) {
                    await onSuccess()
                }
            }
            setEditingJobPreference(null);
        } catch (error) { alert("Saved failed: " + error.message); }
    };

    return {
        editingJobPreference, setEditingJobPreference,
        jobPreferenceHandSave, isJobPreferenceOpen, setIsJobPreferenceOpen
    }
}
import { useEffect, useState } from "react";
import { getAllSkill, updateSkill } from "../../services/skillService";

export const useSkill = () => {
    const [skill, setSkill] = useState({})
    const [editingSkill, setEditingSkill] = useState(null)
    const [isSkillOpen, setIsSkillOpen] = useState(null)

    //fetch skill
    const fetchSkill = async () => {
        try {
            const data = await getAllSkill();
            setSkill(data);
        } catch (error) {console.error("Fetch error", error); }
    }

    useEffect(() => {
        fetchSkill()
    }, [])

    //Logic edit skill
    const skillHandSave = async (id, formData, onSuccess) => {
        try {
            const updated = await updateSkill(id, formData);
            setIsSkillOpen(false);
            setEditingSkill(null);
            if (onSuccess) {
                await onSuccess(); // Gọi hàm này để fetch lại dữ liệu bên ngoài
            }
        } catch (error) { alert("Saved failed: " + error.message); }
    };

    return {
        skill, fetchSkill, 
        editingSkill, setEditingSkill, skillHandSave,
        isSkillOpen, setIsSkillOpen
    }
}
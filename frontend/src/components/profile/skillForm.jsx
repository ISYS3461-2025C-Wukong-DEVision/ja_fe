import React, { useState, useEffect } from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";

const SkillForm = ({ userId, allSkills, initialSelectedIds, onSave, onCancel }) => {
    // Lưu trữ danh sách ID đã chọn (dùng để so sánh và đổi màu)
    const [selectedIds, setSelectedIds] = useState([]);

    // Khi truyền editingSkill vô (là array id), đồng bộ vào state local
    useEffect(() => {
        if (initialSelectedIds) {
            setSelectedIds(initialSelectedIds);
        }
    }, [initialSelectedIds]);

    const handleToggleSkill = (skillId) => {
        setSelectedIds(prev => 
            prev.includes(skillId) 
                ? prev.filter(id => id !== skillId) // Nếu trùng -> biến thành xám (loại bỏ khỏi array)
                : [...prev, skillId] // Nếu không trùng -> biến thành tím (thêm vào array)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gọi hàm onSave với 2 tham số: userId và mảng ID (formData)
        // Đúng theo cấu trúc: skillHandSave(id, formData)
        onSave(userId, selectedIds);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Update Skills</h2>
                        <p className="text-sm text-gray-500">Click to select/deselect skills</p>
                    </div>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Danh sách bong bóng kỹ năng */}
                <div className="flex flex-wrap gap-3 max-h-[400px] overflow-y-auto p-2">
                    {allSkills?.data.map((s) => {
                        // So sánh ID của list fetchAll với array ID đang chọn
                        const isSelected = selectedIds.includes(s.id);
                        return (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => handleToggleSkill(s.id)}
                                // Nếu isSelected = true -> Màu tím (primary), ngược lại -> Màu xám
                                className={`px-4 py-2 rounded-full border-2 transition-all duration-200 font-medium text-sm
                                    ${isSelected 
                                        ? 'bg-primary border-primary text-white shadow-md' 
                                        : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-primary/50'
                                    }`}
                            >
                                {s.name}
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-lg active:scale-95 transition-all"
                    >
                        Save Skills
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillForm;
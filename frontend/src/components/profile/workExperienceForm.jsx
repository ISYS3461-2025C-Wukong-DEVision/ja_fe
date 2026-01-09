import React, { useState, useEffect } from 'react';

const WorkExperienceForm = ({ userId, initialData, onSave, onCancel }) => {
    // Khởi tạo state cho Work Experience
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startedAt: '',
        endedAt: ''
    });

    // Cập nhật form khi có dữ liệu ban đầu (Edit mode)
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                // Chuyển đổi định dạng ISO sang YYYY-MM-DD cho input date
                startedAt: initialData.startedAt ? initialData.startedAt.split('T')[0] : '',
                endedAt: initialData.endedAt ? initialData.endedAt.split('T')[0] : ''
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(userId, formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
                <div className="border-b pb-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {initialData ? 'Update Experience' : 'Add Experience'}
                    </h2>
                    <p className="text-sm text-gray-500">Share your professional journey and achievements</p>
                </div>

                {/* Job Title */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">{'Job Title / Position '}{<span className="text-red-500">*</span>}</label>
                    <input 
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                        placeholder="e.g. Senior Frontend Developer"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        required
                    />
                </div>

                {/* Dates Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">{'Started At '}{<span className="text-red-500">*</span>}</label>
                        <input 
                            type="date"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            value={formData.startedAt}
                            onChange={e => setFormData({...formData, startedAt: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Ended At</label>
                        <input 
                            type="date"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            value={formData.endedAt}
                            onChange={e => setFormData({...formData, endedAt: e.target.value})}
                            placeholder="Present"
                        />
                        <p className="text-[10px] text-gray-400 italic">* Leave blank if you are currently working here</p>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea 
                        rows="5"
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" 
                        placeholder="Describe your responsibilities, technologies used, and key accomplishments..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all active:scale-95"
                    >
                        Save Experience
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WorkExperienceForm;
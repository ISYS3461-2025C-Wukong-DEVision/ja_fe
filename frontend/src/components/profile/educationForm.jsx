import React, { useState, useEffect } from 'react';

const EducationForm = ({ userId, initialData, onSave, onCancel }) => {
    // Khởi tạo state cho Education
    const [formData, setFormData] = useState({
        institution: '',
        degreeType: 'BACHELOR', // Mặc định là Bachelor
        gpa: '',
        startedAt: '',
        endedAt: ''
    });

    // Cập nhật form khi có dữ liệu ban đầu (Edit mode)
    useEffect(() => {
        if (initialData) {
            setFormData({
                institution: initialData.institution || '',
                degreeType: initialData.degreeType || 'BACHELOR',
                gpa: initialData.gpa || '',
                // Đảm bảo định dạng date là YYYY-MM-DD để input type="date" hiểu được
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
                        {initialData ? 'Update Education' : 'Add Education'}
                    </h2>
                    <p className="text-sm text-gray-500">Provide details about your academic background</p>
                </div>

                {/* Institution Name */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Institution / University</label>
                    <input 
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                        placeholder="e.g. Harvard University"
                        value={formData.institution}
                        onChange={e => setFormData({...formData, institution: e.target.value})}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Degree Type */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Degree Type</label>
                        <select 
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
                            value={formData.degreeType}
                            onChange={e => setFormData({...formData, degreeType: e.target.value})}
                            required
                        >
                            <option value="BACHELOR">BACHELOR</option>
                            <option value="MASTER">MASTER</option>
                            <option value="DOCTORATE">DOCTORATE</option>
                        </select>
                    </div>

                    {/* GPA */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">GPA (Optional)</label>
                        <input 
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="3.8"
                            value={formData.gpa}
                            onChange={e => setFormData({...formData, gpa: e.target.value})}
                            required
                        />
                    </div>
                </div>

                {/* Dates Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Started At</label>
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
                        />
                    </div>
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
                        Save Education
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EducationForm;
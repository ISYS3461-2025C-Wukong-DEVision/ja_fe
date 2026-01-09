import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { COUNTRIES } from '../../utils/constants';

// Cấu hình Bitmask
const EMPLOYMENT_TYPES = [
    { label: 'Full-time', value: 'FULL_TIME' },
    { label: 'Part-time', value: 'PART_TIME' },
    { label: 'Internship', value: 'INTERNSHIP' },
    { label: 'Contract', value: 'CONTRACT' },
];


const JobPreferenceForm = ({userId, initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        country: '',
        isFresher: false,
        selectedTypes: [], // Lưu array tạm thời để dễ UI
        salaryMin: '',
        salaryMax: ''
    });

    useEffect(() => {
        if (initialData) {
            
            setFormData({
                country: initialData.country || '',
                isFresher: initialData.isFresher || false,
                selectedTypes: initialData.employmentTypes || [],
                salaryMin: initialData.salaryMin || '',
                salaryMax: initialData.salaryMax || ''
            });
        }
    }, [initialData]);

    
    const handleTypeChange = (value) => {
        const newTypes = formData.selectedTypes.includes(value)
            ? formData.selectedTypes.filter(t => t !== value)
            : [...formData.selectedTypes, value];
        setFormData({ ...formData, selectedTypes: newTypes });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Kiểm tra điều kiện lương
        if (Number(formData.salaryMax) < Number(formData.salaryMin)) {
            toast.error("Maximum salary cannot be lower than Minimum salary!", {
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
            return;
        }

        // Chuyển đổi data sang định dạng API mong muốn
        const finalData = {
            ...formData,
            employmentTypes: formData.selectedTypes
        };
        
        // Xóa field tạm trước khi gửi
        delete finalData.selectedTypes;
        
        onSave(userId, finalData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
                <div className="border-b pb-2">
                    <h2 className="text-2xl font-bold text-gray-800">Job Preferences</h2>
                    <p className="text-sm text-gray-500">Tell us what kind of work you are looking for</p>
                </div>

                {/* Country Custom Dropdown */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Preferred Country</label>
                    <div className="relative">
                        <select 
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none bg-white cursor-pointer"
                            value={formData.country}
                            onChange={e => setFormData({...formData, country: e.target.value})}
                            required
                        >
                            <option value="">Select a country</option>
                            {COUNTRIES.map(c => (
                                <option key={c.code} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Is Fresher Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                        <span className="block text-sm font-semibold text-gray-700">Fresher Status</span>
                        <span className="text-xs text-gray-500">Are you a recent graduate?</span>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, isFresher: !formData.isFresher})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.isFresher ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isFresher ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                {/* Employment Types */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Employment Types</label>
                    <div className="grid grid-cols-2 gap-3">
                        {EMPLOYMENT_TYPES.map((type) => (
                            <div 
                                key={type.value}
                                onClick={() => handleTypeChange(type.value)}
                                className={`cursor-pointer p-3 border-2 rounded-xl text-center transition-all ${
                                    formData.selectedTypes.includes(type.value)
                                    ? 'border-primary bg-primary/5 text-primary font-bold'
                                    : 'border-gray-100 bg-white text-gray-500'
                                }`}
                            >
                                {type.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Min Salary ($)</label>
                        <input 
                            type="number"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="e.g. 500"
                            value={formData.salaryMin}
                            onChange={e => setFormData({...formData, salaryMin: e.target.value})}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Max Salary ($)</label>
                        <input 
                            type="number"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="e.g. 2000"
                            value={formData.salaryMax}
                            onChange={e => setFormData({...formData, salaryMax: e.target.value})}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                    <button type="button" onClick={onCancel} className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all active:scale-95">
                        Save Preferences
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobPreferenceForm;
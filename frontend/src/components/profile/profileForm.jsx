import React, { useState, useEffect } from 'react';
import { tokenStorage } from '../../utils/tokenStorage';

const ProfileForm = ({ initialData, setUser, user, onSave, onCancel }) => {
    // Khởi tạo state với các field
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        email: '',
        phone: '',
        objective: ''
    });

    // Cập nhật form khi có dữ liệu ban đầu (để Edit)
    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                address: initialData.address || '',
                city: initialData.city || '',
                country: initialData.country || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                objective: initialData.objective || ''
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const reponse = onSave(formData);

        const updatedUser = { 
            ...user, 
            name: `${formData.firstName} ${formData.lastName}`,
            id: reponse.id
        };

        setUser(updatedUser);
        tokenStorage.setUser({user: updatedUser})
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
                <div className="border-b pb-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {initialData ? 'Update Profile' : 'Create Profile'}
                    </h2>
                    <p className="text-sm text-gray-500">Please fill in your personal information</p>
                </div>

                {/* Name Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">First Name</label>
                        <input 
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="John"
                            value={formData.firstName}
                            onChange={e => setFormData({...formData, firstName: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Last Name</label>
                        <input 
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={e => setFormData({...formData, lastName: e.target.value})}
                            required
                        />
                    </div>
                </div>

                {/* Contact Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <input 
                            type="email"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <input 
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="+84 123 456 789"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                </div>

                {/* Address Group */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Address</label>
                    <input 
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                        placeholder="123 Street Name"
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">City</label>
                        <input 
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="Ho Chi Minh City"
                            value={formData.city}
                            onChange={e => setFormData({...formData, city: e.target.value})}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Country</label>
                        <input 
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                            placeholder="Vietnam"
                            value={formData.country}
                            onChange={e => setFormData({...formData, country: e.target.value})}
                        />
                    </div>
                </div>

                {/* Objective */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-gray-700">Professional Objective</label>
                        {/* Bộ đếm ký tự */}
                        <span className={`text-xs ${formData.objective?.length >= 255 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                            {formData.objective?.length || 0}/255
                        </span>
                    </div>
                    
                    <textarea 
                        rows="4"
                        className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none transition-all ${
                            formData.objective?.length >= 255 ? 'border-orange-400' : 'border-gray-300'
                        }`} 
                        placeholder="Tell us about your career goals..."
                        value={formData.objective}
                        onChange={e => setFormData({...formData, objective: e.target.value})}
                    />
                    
                    {/* Thông báo nhỏ khi chạm giới hạn (Optional) */}
                    {formData.objective?.length >= 255 && (
                        <p className="text-[10px] text-orange-500 mt-1 italic">
                            Maximum length reached (255 characters).
                        </p>
                    )}
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
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
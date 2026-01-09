import React from 'react';

const DayPicker = ({ label, value, onChange, required = false }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            
            <input 
                type="date"
                value={value} // Định dạng yyyy-mm-dd
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="
                    w-full p-2.5 
                    bg-white 
                    border border-gray-300 
                    text-gray-900 text-sm rounded-lg 
                    outline-none transition-all
                    
                    /* Đổi màu viền và bóng khi nhấn vào */
                    focus:ring-2 
                    focus:ring-[#9496FF]/50 
                    focus:border-[#9496FF]
                    
                    /* Đổi màu các thành phần bên trong bảng lịch (nếu trình duyệt hỗ trợ) */
                    accent-[#9496FF]
                "
            />

            {/* CSS bổ sung để làm đẹp icon lịch mặc định của trình duyệt */}
            <style jsx>{`
                /* Đổi màu icon lịch trên Chrome/Edge/Safari */
                input[type="date"]::-webkit-calendar-picker-indicator {
                    cursor: pointer;
                    filter: invert(65%) sepia(35%) saturate(1200%) hue-rotate(205deg) brightness(100%) contrast(100%);
                    /* Đoạn filter này giả lập màu #9496FF cho icon */
                }
                
                /* Đảm bảo chiều cao input bằng nhau trên các trình duyệt */
                input[type="date"] {
                    min-height: 45px;
                }
            `}</style>
        </div>
    );
};

export default DayPicker;
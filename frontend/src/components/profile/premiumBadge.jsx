const PremiumBadge = () => {
  return (
    <div className="flex items-center relative group overflow-hidden px-3 py-0.5 rounded-md font-bold text-white text-[10px] tracking-widest shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer
      /* Màu nền Gradient Thiên hà */
      bg-gradient-to-b from-[#4158D0] via-[#a878e0] to-[#cebcfc]
      /* Hiệu ứng viền phát sáng */
      ring-1 ring-white/30 border border-white/20 border-b-0">
      
      {/* 1. HIỆU ỨNG ÁNH SÁNG LƯỚT TỪ TRÊN XUỐNG */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-white/40 to-transparent -translate-y-full animate-[shimmer-down_2.5s_infinite]" />
      
      {/* 2. LỚP HẠT SAO DÀY ĐẶC & NGẪU NHIÊN */}
      {/* Sử dụng box-shadow để tạo hàng chục hạt sao siêu nhỏ mà không làm nặng DOM */}
      <div className="absolute inset-0 pointer-events-none opacity-90" 
           style={{
             backgroundImage: `
               radial-gradient(1px 1px at 15% 25%, white, transparent),
               radial-gradient(0.5px 0.5px at 40% 15%, white, transparent),
               radial-gradient(1px 1px at 65% 45%, white, transparent),
               radial-gradient(0.5px 0.5px at 85% 20%, white, transparent),
               radial-gradient(0.8px 0.8px at 25% 70%, white, transparent),
               radial-gradient(0.5px 0.5px at 55% 85%, white, transparent),
               radial-gradient(1px 1px at 75% 75%, white, transparent),
               radial-gradient(0.5px 0.5px at 10% 90%, white, transparent),
               radial-gradient(0.7px 0.7px at 90% 90%, white, transparent),
               radial-gradient(0.5px 0.5px at 50% 50%, white, transparent),
               radial-gradient(0.6px 0.6px at 30% 40%, white, transparent),
               radial-gradient(0.8px 0.8px at 70% 10%, white, transparent)
             `,
             backgroundSize: '50% 50%', // Nhân bản lớp hạt sao lên gấp 4 lần
           }} 
      />
      
      <span className="relative z-10 drop-shadow-[0_0_2px_rgba(255,255,255,0.5)] uppercase">
        PREMIUM
      </span>

      <style jsx>{`
        @keyframes shimmer-down {
          0% { transform: translateY(-100%); }
          30% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default PremiumBadge;
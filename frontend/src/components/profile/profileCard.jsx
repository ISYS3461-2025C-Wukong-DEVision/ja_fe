import PremiumBadge from "./premiumBadge";

const ProfileCard = ({ url, percent = 80, size = 140, name, objective, isPremium }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 1. Định nghĩa phần hở (gap) là 20% chu vi
  const gap = 0.2 * circumference;
  // 2. Độ dài thực tế mà thanh tiến trình được phép chạy (80% còn lại)
  const totalAvailable = circumference - gap;
  // 3. Tính toán dashOffset dựa trên độ dài thực tế này
  const progressOffset = totalAvailable - (percent / 100) * totalAvailable;

  return (
    <div className="flex items-center min-w-[270px]">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="relative" style={{ width: size, height: size }}>
          <svg
            className="absolute inset-0"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{ transform: "rotate(126deg)" }} // Xoay để phần khuyết nằm chính xác ở dưới
          >
            {/* Vòng nền xám - Chỉ vẽ phần 80% */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#EEEEEE"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${totalAvailable} ${circumference}`}
              strokeLinecap="round"
            />
            {/* Vòng tiến trình màu xanh - Cũng chỉ chạy trong phần 80% */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#9496FF"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${totalAvailable} ${circumference}`}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
            />
          </svg>

          {/* Avatar */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ padding: strokeWidth + 6 }}
          >
            <img
              src={url}
              alt="avatar"
              className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>
        </div>
        
        {/* Số % hiển thị ở khe hở */}
        <span className="-mt-3 text-[#9496FF] font-bold text-xl relative z-10">
          {percent}%
        </span>
      </div>

      <div className="flex flex-col justify-start items-start space-y-1 ml-2">
        <h3 className="text-[#1A1A40] font-bold text-xl leading-tight whitespace-nowrap">
          {name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 max-w-[180px]">
          {objective}
        </p>
        {isPremium && <PremiumBadge />}
      </div>
    </div>
  );
};

export default ProfileCard;
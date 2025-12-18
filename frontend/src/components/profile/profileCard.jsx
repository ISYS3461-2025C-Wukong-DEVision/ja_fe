import PremiumBadge from "./premiumBadge";

const ProfileCard = ({ url, percent = 80, size = 140, name, objective, isPremium }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Tính toán offset: 
  // Để hở một đoạn ở dưới như hình, chúng ta xoay SVG và điều chỉnh dash
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center">
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative" style={{ width: size, height: size }}>
                {/* SVG Circle */}
                <svg
                className="absolute inset-0 -rotate-[234deg]" // Xoay để phần khuyết nằm ở dưới
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                >
                {/* Vòng nền xám (Optional - có thể ẩn nếu muốn giống hệt hình mẫu) */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#CCCCCC"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * 0.2} // Để khuyết một đoạn
                    strokeLinecap="round"
                />
                {/* Vòng tiến trình màu xanh */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#9496FF"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset + (circumference * 0.2)} 
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
                </svg>

                {/* Avatar - Căn giữa tuyệt đối */}
                <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ padding: strokeWidth + 4 }} // Tạo khoảng cách với vòng tròn
                >
                <img
                    src={url}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
                />
                </div>
            </div>

            <span className="-mt-3 text-primary font-bold text-xl">
                {percent}%
            </span>
        </div>
        <div className="flex flex-col justify-start items-start space-y-2" style={{ height: size +16 }}>
            <h3 className="text-primary-dark font-bold text-2xl leading-tight">{name}</h3>
            <p className="text-gray-500 text">{objective}</p>
            {isPremium && (<PremiumBadge/>)}
        </div>
    </div>
  );
};

export default ProfileCard;
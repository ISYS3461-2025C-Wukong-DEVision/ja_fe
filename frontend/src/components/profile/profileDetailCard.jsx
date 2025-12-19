import PremiumBadge from "./premiumBadge";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ProfileBigCard = ({ url, name, email, address, phone, percent, size, objective, isPremium }) => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth < 783;

    return (
        <div className="p-4 w-full overflow-hidden">
            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} md:gap-6 items-center md:items-start`}>
                
                {/* Ảnh đại diện: Tự động trượt về giữa hoặc sang trái */}
                <motion.div
                    animate={{
                        x: isMobile ? 0 : 0, // Bạn có thể chỉnh độ lệch nếu muốn
                        scale: isMobile ? 0.8 : 1
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex-shrink-0"
                >
                    <img
                        src={url}
                        alt={name}
                        style={{ height: size, width: size }}
                        className="rounded-full border-4 border-primary-light/50 shadow-lg object-cover"
                    />
                </motion.div>

                {/* Khối nội dung: Dùng animate để di chuyển text mượt mà */}
                <motion.div 
                    animate={{
                        y: isMobile ? 0 : 0,
                        textAlign: isMobile ? "center" : "left"
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col space-y-2 w-full max-md:-mt-2"
                >
                    {/* Name & Percent */}
                    <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center md:justify-start justify-center md:space-x-4`}>
                        <span className="text-primary-dark font-bold text-3xl md:text-4xl leading-tight">
                            {name}
                        </span>
                        <span className={`${percent < 80 ? "text-red-500 bg-red-500/10" : "text-green-500 bg-green-500/10"} font-semibold text-md px-2 rounded-full mt-2 md:mt-0`}>
                            {percent}%
                        </span>
                    </div>

                    {isPremium && (
                        <div className={`flex ${isMobile ? "justify-center" : "justify-start"} items-center xl:hidden`}>
                            <PremiumBadge />
                        </div>
                    )}

                    <div className="text-gray-700 space-y-1">
                        <p><span className="font-medium">Address:</span> {address}</p>
                        
                        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center md:justify-start justify-center md:space-x-3 text-gray-600`}>
                            <span>Email: {email}</span>
                            {!isMobile && <span className="text-gray-400">✻</span>}
                            <span>Phone: {phone}</span>
                        </div>
                    </div>

                    <p className="text-gray-500 italic line-clamp-3 mt-2 max-w-2xl mx-auto md:mx-0">
                        <span className="not-italic font-semibold text-gray-700">Target: </span> 
                        {objective}
                    </p>
                </motion.div>   
            </div>
        </div>
    );
};

export default ProfileBigCard;
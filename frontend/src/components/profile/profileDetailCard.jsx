import PremiumBadge from "./premiumBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ProfileBigCard = ({
  url,
  name,
  email,
  address,
  phone,
  percent,
  size,
  objective,
  isPremium
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const layoutTransition = {
    type: "spring",
    stiffness: 200,
    damping: 25
  };

  return (
    <div className="p-4 w-full overflow-hidden">
      <div className="flex flex-row md:gap-6 items-start">

        {/* ===== DESKTOP AVATAR ===== */}
        <AnimatePresence initial={false} mode="popLayout">
          {!isMobile && (
            <motion.div
              key="desktop-avatar"
              layout
              layoutId="profile-avatar"
              initial={hasMounted ? { opacity: 0, x: 120, scale: 0.5 } : false}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 120, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="flex-shrink-0"
            >
              <img
                src={url}
                alt={name}
                style={{ width: size, height: size }}
                className="rounded-full border-4 border-primary-light/50 shadow-lg object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== CONTENT ===== */}
        <motion.div
          layout
          transition={layoutTransition}
          className="flex flex-col w-full"
        >
          {/* ===== MOBILE AVATAR ===== */}
          <AnimatePresence initial={false} mode="popLayout">
            {isMobile && (
              <motion.div
                key="mobile-avatar"
                layout
                layoutId="profile-avatar"
                initial={hasMounted ? { opacity: 0, scale: 0.5 } : false}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="self-center mb-4"
              >
                <img
                  src={url}
                  alt={name}
                  style={{ width: size * 0.8, height: size * 0.8 }}
                  className="rounded-full border-4 border-primary-light/50 shadow-lg object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ===== TEXT ===== */}
          <motion.div
            layout
            transition={layoutTransition}
            animate={{ textAlign: isMobile ? "center" : "left" }}
            className="flex flex-col space-y-2 w-full"
          >
            <div
              className={`flex ${
                isMobile ? "flex-col" : "flex-row"
              } items-center justify-center md:justify-start md:space-x-4`}
            >
              <span className="text-primary-dark font-bold text-3xl md:text-4xl">
                {name}
              </span>
              <span
                className={`${
                  percent < 80
                    ? "text-red-500 bg-red-500/10"
                    : "text-green-500 bg-green-500/10"
                } font-semibold text-md px-2 rounded-full mt-2 md:mt-0`}
              >
                {percent}%
              </span>
            </div>

            {isPremium && (
              <div
                className={`flex ${
                  isMobile ? "justify-center" : "justify-start"
                } xl:hidden`}
              >
                <PremiumBadge />
              </div>
            )}

            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Address:</span> {address}
              </p>
              <div
                className={`flex ${
                  isMobile ? "flex-col" : "flex-row"
                } items-center justify-center md:justify-start md:space-x-3 text-gray-600`}
              >
                <span>Email: {email}</span>
                {!isMobile && <span className="text-gray-400">✻</span>}
                <span>Phone: {phone}</span>
              </div>
            </div>

            <p className="text-gray-500 italic line-clamp-3 mt-2 max-w-2xl mx-auto md:mx-0">
              <span className="not-italic font-semibold text-gray-700">
                Target:
              </span>{" "}
              {objective}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileBigCard;

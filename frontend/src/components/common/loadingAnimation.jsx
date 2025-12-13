import React from "react";

const GearLoader = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`animate-spin ${className}`}
  >
    <path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.48.48,0,0,0,.12-.61l-2-3.46a.48.48,0,0,0-.58-.22l-2.49,1a7.28,7.28,0,0,0-1.63-.94l-.38-2.65A.48.48,0,0,0,11.82,2H8.18a.48.48,0,0,0-.47.4L7.33,5.05a7.28,7.28,0,0,0-1.63.94l-2.49-1a.48.48,0,0,0-.58.22l-2,3.46a.48.48,0,0,0,.12.61L2.86,11.06a7.43,7.43,0,0,0-.05.94,7.43,7.43,0,0,0,.05.94L.75,14.59a.48.48,0,0,0-.12.61l2,3.46a.48.48,0,0,0,.58.22l2.49-1a7.28,7.28,0,0,0,1.63.94l.38,2.65a.48.48,0,0,0,.47.4h3.64a.48.48,0,0,0,.47-.4l.38-2.65a7.28,7.28,0,0,0,1.63-.94l2.49,1a.48.48,0,0,0,.58-.22l2-3.46a.48.48,0,0,0-.12-.61Z" />
  </svg>
);


const LoadingAnimation = ({text = "Loading...",}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative w-24 h-24">
                {/* Gear trái (dưới) */}
                <div className="absolute left-2 top-7 animate-spin">
                    <GearLoader className="w-16 h-16 text-white" />
                </div>

                {/* Gear phải (trên) */}
                <div className="absolute left-11 top-2 animate-spin-reverse">
                    <GearLoader className="w-10 h-10 text-white opacity-70" />
                </div>
            </div>
            <span className="text-md text-white">{text}</span>
        </div>

    );
};

export default LoadingAnimation;

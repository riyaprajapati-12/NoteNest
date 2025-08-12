import React from "react";

const EmptyCard = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 ">
     
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-36 text-yellow-400"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: "rotate(-6deg)" }}
      >
        {/* Notebook cover */}
        <rect x="10" y="8" width="44" height="48" rx="6" ry="6" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="2" />
        {/* Pages */}
        <line x1="20" y1="20" x2="44" y2="20" stroke="#F9A825" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="20" y1="28" x2="44" y2="28" stroke="#F9A825" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="20" y1="36" x2="44" y2="36" stroke="#F9A825" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="20" y1="44" x2="44" y2="44" stroke="#F9A825" strokeWidth="1.5" strokeDasharray="4 2" />
        {/* Spiral rings */}
        <circle cx="14" cy="18" r="1.5" fill="#FBC02D" />
        <circle cx="14" cy="26" r="1.5" fill="#FBC02D" />
        <circle cx="14" cy="34" r="1.5" fill="#FBC02D" />
        <circle cx="14" cy="42" r="1.5" fill="#FBC02D" />
        
      </svg>

      <p className="w-1/2 text-sm font-medium text-yellow-900 text-center leading-7 mt-5 ">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;

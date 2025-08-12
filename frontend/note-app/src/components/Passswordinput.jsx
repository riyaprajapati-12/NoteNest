import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function PasswordInput({ value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full px-4 py-3 border rounded-md placeholder-black focus:outline-yellow-400 focus:ring-1 focus:ring-yellow-400"
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-3 top-3 text-yellow-600 hover:text-yellow-700 focus:outline-none"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
      >
        {isShowPassword ? <FaRegEye size={22} /> : <FaRegEyeSlash size={22} />}
      </button>
    </div>
  );
}


import { getInitials } from "../Utils/helper";

export default function ProfileInfo({ userInfo, onLogout }) {
  const fullName = userInfo?.fullName || "Guest";

  return (
    <div className="flex items-center gap-4  rounded-full px-4 py-2 ">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-400 text-white font-semibold text-lg select-none">
        {getInitials(fullName)}
      </div>
      <div>
        <p className="text-yellow-900 font-semibold">{fullName}</p>
        <button
          className="text-pink-600 hover:text-pink-800 text-sm underline transition"
          onClick={onLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

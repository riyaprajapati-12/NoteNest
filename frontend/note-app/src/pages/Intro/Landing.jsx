import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-16 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 min-h-screen">

      {/* Left: Professional yet colorful SVG illustration */}
      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <rect width="280" height="280" rx="30" fill="#F59E0B" /> {/* warm yellow background */}
          <rect x="40" y="60" width="200" height="160" rx="20" fill="white" />
          <line x1="60" y1="100" x2="220" y2="100" stroke="#DB2777" strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="140" x2="220" y2="140" stroke="#DB2777" strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="180" x2="220" y2="180" stroke="#DB2777" strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="220" x2="220" y2="220" stroke="#DB2777" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="100" r="8" fill="#DB2777" />
          <circle cx="60" cy="140" r="8" fill="#DB2777" />
          <circle cx="60" cy="180" r="8" fill="#DB2777" />
          <circle cx="60" cy="220" r="8" fill="#DB2777" />
          <text
            x="140"
            y="45"
            textAnchor="middle"
            fontSize="30"
            fontWeight="700"
            fill="#DB2777"
            fontFamily="Arial, sans-serif"
            letterSpacing="1.5"
          >
            NoteNest
          </text>
          <text
            x="140"
            y="270"
            textAnchor="middle"
            fontSize="14"
            fill="#B91C68"
            fontFamily="Arial, sans-serif"
          >
            Capture. Organize. Remember.
          </text>
        </svg>
      </div>

      {/* Right: Text & Buttons */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-700 cartoon-font">
          Welcome to <span className="text-pink-600">NoteNest</span> 📝
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
          Simplify your note-taking experience with NoteChan — write, store, and access your notes effortlessly, anytime and anywhere.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 border border-pink-500 text-pink-600 rounded-full hover:bg-pink-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

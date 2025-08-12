import React, { useState } from "react";
import PasswordInput from "../../components/Passswordinput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiosInstance";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/user/signup", {
        fullName: name,
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      setName("");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 px-6"
    >
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-yellow-700 cartoon-font mb-8 text-center">
          Join <span className="text-pink-600">NoteNest</span> 
        </h1>
        <form onSubmit={handleSignUp} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 border rounded-md placeholder-black focus:outline-yellow-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-md placeholder-black focus:outline-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-full transition"
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-pink-600 underline hover:text-pink-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

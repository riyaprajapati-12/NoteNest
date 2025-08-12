import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar({ userInfo, onSearchNote, handleClearSearch, showSearchBar }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <nav className="bg-yellow-400 p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Heading with shinchan-style font */}
        <h1 className="text-3xl font-bold text-red-600 cartoon-font cursor-pointer" onClick={() => navigate('/')}>
          NoteNest
        </h1>

        {/* Search Bar */}
        {showSearchBar && (
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        )}

        {/* User Profile and Logout */}
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </nav>
  );
}

export default Navbar;

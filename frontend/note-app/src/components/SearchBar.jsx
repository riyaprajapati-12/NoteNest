
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className="w-80 flex items-center px-4 bg-yellow-100 rounded-full shadow-md focus-within:ring-2 focus-within:ring-pink-400 transition">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-sm bg-transparent py-2 px-2 placeholder-yellow-700 focus:outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-pink-600 cursor-pointer hover:text-pink-800 mr-3 transition"
          onClick={onClearSearch}
          title="Clear Search"
          aria-label="Clear Search"
        />
      )}
      <FaMagnifyingGlass
        className="text-yellow-700 cursor-pointer hover:text-yellow-900 transition"
        onClick={handleSearch}
        title="Search"
        aria-label="Search"
      />
    </div>
  );
}

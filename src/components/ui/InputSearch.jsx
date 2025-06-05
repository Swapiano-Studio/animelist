import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const InputSearch = ({ dropdownValue }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearch("");
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    // Push search query to URL (?q=...)
    if (dropdownValue === "Anime") {
      navigate(`/anime?q=${encodeURIComponent(search)}`);
    } else {
      navigate(`/manga?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <li>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${dropdownValue}...`}
          className="px-3 py-1 rounded bg-[#23232b] text-white focus:outline-none focus:ring-2 focus:ring-red-400 w-32 md:w-48"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600"
        >
        </button>
      </form>
    </li>
  );
};

export default InputSearch;
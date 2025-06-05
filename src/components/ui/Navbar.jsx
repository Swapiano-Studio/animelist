import React, { useState, useEffect } from "react";
import InputSearch from "./InputSearch";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Anime");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.startsWith("/manga")) {
      setDropdownValue("Manga");
    } else if (location.pathname.startsWith("/anime")) {
      setDropdownValue("Anime");
    }
  }, [location.pathname]);

  const handleDropdownSelect = (value) => {
    setDropdownOpen(false);
    if (value === "Anime") {
      setDropdownValue("Anime");
      navigate("/anime");
    } else if (value === "Manga") {
      setDropdownValue("Manga");
      navigate("/manga");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#18181b] px-4 sm:px-6 py-3 sm:py-4 w-full shadow">
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Link to={`/`} className="flex items-center gap-2">
            <span className="hidden sm:inline text-base sm:text-lg md:text-xl font-bold text-white whitespace-nowrap">
              Novacode Anime
            </span>
          </Link>
        </div>
        <ul className="flex flex-row gap-2 sm:gap-6 text-white font-medium items-center text-sm sm:text-base md:text-lg">
          <li className="relative">
            <button
              className="hover:text-red-400 transition flex items-center gap-1 text-sm sm:text-base md:text-lg"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              {dropdownValue}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-32 bg-[#23232b] rounded shadow-lg z-20">
                <button
                  onClick={() => handleDropdownSelect("Anime")}
                  className={`block w-full text-left px-4 py-2 text-white hover:bg-red-500 transition rounded-t ${
                    dropdownValue === "Anime" ? "font-bold bg-red-500" : ""
                  } text-sm sm:text-base md:text-lg`}
                >
                  Anime
                </button>
                <button
                  onClick={() => handleDropdownSelect("Manga")}
                  className={`block w-full text-left px-4 py-2 text-white hover:bg-red-500 transition rounded-b ${
                    dropdownValue === "Manga" ? "font-bold bg-red-500" : ""
                  } text-sm sm:text-base md:text-lg`}
                >
                  Manga
                </button>
              </div>
            )}
          </li>
          <InputSearch dropdownValue={dropdownValue} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

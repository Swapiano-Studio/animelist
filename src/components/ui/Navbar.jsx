import React, { useState, useEffect, useRef } from "react";
import InputSearch from "./InputSearch";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Anime");
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-red-400"
            >
              <path d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7A1 1 0 0 0 3 11h1v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3h2v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 .707-1.707l-7-7z" />
            </svg>
            <span className="hidden sm:inline text-base sm:text-lg md:text-xl font-bold text-white whitespace-nowrap">
              Novacode Anime
            </span>
          </Link>
        </div>
        <ul className="flex flex-row gap-2 sm:gap-6 text-white font-medium items-center text-sm sm:text-base md:text-lg">
          <li className="relative" ref={dropdownRef}>
            <button
              className="hover:text-red-400 transition flex items-center gap-1 text-sm sm:text-base md:text-lg px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
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
              <div className="absolute left-0 mt-2 w-36 bg-[#23232b] rounded shadow-lg z-20 border border-white/10 flex flex-col py-1">
                <button
                  onClick={() => handleDropdownSelect("Anime")}
                  className={`block w-full text-left px-4 py-2 text-white transition rounded-t text-sm sm:text-base md:text-lg hover:bg-red-500 hover:font-bold focus:bg-red-500 focus:font-bold`}
                  style={{
                    background:
                      dropdownValue === "Anime" && !dropdownOpen
                        ? "#ef4444"
                        : undefined,
                    fontWeight:
                      dropdownValue === "Anime" && !dropdownOpen ? "bold" : undefined,
                    color:
                      dropdownValue === "Anime" && !dropdownOpen ? "#fff" : undefined,
                  }}
                >
                  Anime
                </button>
                <button
                  onClick={() => handleDropdownSelect("Manga")}
                  className={`block w-full text-left px-4 py-2 text-white transition rounded-b text-sm sm:text-base md:text-lg hover:bg-red-500 hover:font-bold focus:bg-red-500 focus:font-bold`}
                  style={{
                    background:
                      dropdownValue === "Manga" && !dropdownOpen
                        ? "#ef4444"
                        : undefined,
                    fontWeight:
                      dropdownValue === "Manga" && !dropdownOpen ? "bold" : undefined,
                    color:
                      dropdownValue === "Manga" && !dropdownOpen ? "#fff" : undefined,
                  }}
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

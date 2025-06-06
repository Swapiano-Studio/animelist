import React, { useEffect, useState } from "react";
import api from "../../api";
import Loading from "../ui/Loading";

const HeroSection = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await api.get("/seasons/upcoming");
        // Ambil 5 anime teratas
        setUpcoming(response.data.data.slice(0, 5));
      } catch (error) {
        // Error fetching upcoming anime, do nothing (silent)
      }
    };
    fetchUpcoming();
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? upcoming.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrent((prev) => (prev === upcoming.length - 1 ? 0 : prev + 1));
  };

  const anime = upcoming[current];

  return (
    <section className="relative bg-gradient-to-r from-[#1a1a1a] to-[#3a1c2d] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 flex flex-col items-center md:items-start max-w-2xl px-4 md:px-6 py-12 md:mr-auto md:ml-20 w-full">
        <span className="text-red-400 font-semibold mb-2">Upcoming Anime</span>
        {anime ? (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 leading-tight text-center md:text-left">
              {anime.title_english || anime.title}
            </h1>
            <p className="text-gray-200 mb-6 line-clamp-3 max-w-xl text-center md:text-left">
              {anime.synopsis || "No synopsis available."}
            </p>
            
            {/* Mobile: Stacked layout, Desktop: Side by side */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 w-full">
              {/* Prev/Next buttons - smaller size */}
              <div className="flex justify-center gap-3 w-full md:w-auto">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition text-sm"
                  onClick={handlePrev}
                >
                  &larr; Prev
                </button>
                <button
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold border border-white/20 transition text-sm"
                  onClick={handleNext}
                >
                  Next &rarr;
                </button>
              </div>
              
              {/* Watch Trailer button - separated */}
              {anime.trailer?.url && (
                <div className="w-full md:w-auto flex justify-center">
                  <a
                    href={anime.trailer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-center w-full md:w-auto"
                    style={{ maxWidth: "200px" }}
                  >
                    📺 Watch Trailer
                  </a>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-2 justify-center md:justify-start w-full">
              {upcoming.map((a, idx) => (
                <span
                  key={a.mal_id + "-" + idx}
                  className={`w-3 h-3 rounded-full ${
                    idx === current ? "bg-red-500" : "bg-gray-400"
                  }`}
                ></span>
              ))}
            </div>
          </>
        ) : (
          <Loading text="Loading..." />
        )}
      </div>
      {/* Hero image illustration */}
      {anime && (
        <img
          src={
            anime.images?.jpg?.large_image_url || "/src/assets/hero.png"
          }
          alt={anime.title}
          className="absolute right-0 md:right-20 top-1/2 -translate-y-1/2 w-72 h-96 object-cover rounded-xl shadow-lg z-10 hidden md:block"
        />
      )}
    </section>
  );
};

export default HeroSection;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Loading from "../ui/Loading";

const TrendingNow = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await api.get("/watch/episodes/popular");
        setTrending(response.data.data.slice(0, 10));
      } catch (error) {
        // Error fetching trending anime, do nothing (silent)
      }
    };
    fetchTrending();
  }, []);

  return (
    <section className="bg-[#18181c] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Trending Now
        </h2>
        <p className="text-gray-400 mb-6">
          Explore multiple updates for maximum fun
        </p>
        {trending.length === 0 ? (
          <Loading text="Loading..." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trending
              .filter(
                (item) =>
                  item.entry.images?.jpg?.image_url !==
                  "https://cdn.myanimelist.net/images/icon-banned-youtube-rect.png"
              )
              .map((item) => (
                <Link
                  key={item.entry.mal_id}
                  to={`anime/${item.entry.mal_id}`}
                  className="relative group rounded-xl overflow-hidden shadow-lg bg-[#23232b]"
                >
                  <img
                    src={item.entry.images?.jpg?.image_url}
                    alt={item.entry.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition"
                  />
                  <div className="p-2">
                    <h3 className="text-white text-sm font-semibold truncate">
                      {item.entry.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.episodes && item.episodes.length > 0 && (
                        <span className="text-xs text-gray-400">
                          Ep: {item.episodes[0].title}
                        </span>
                      )}
                      {item.region_locked && (
                        <span className="text-xs text-red-400 ml-1">
                          Region Locked
                        </span>
                      )}
                      {item.episodes && item.episodes[0]?.premium && (
                        <span className="text-xs text-yellow-400 ml-1">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingNow;

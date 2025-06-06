import { useState, useEffect } from "react";
import api from "../../api";
import Card from "../ui/Card";

const TopViewShow = () => {
  const [topView, setTopView] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeout;
    let retryCount = 0;
    const maxRetries = 2;
    
    const fetchTopView = async () => {
      try {
        const response = await api.get("/top/anime");
        setTopView(response.data.data.slice(0, 10));
        setIsLoading(false);
      } catch (error) {
        // Silent error handling dengan retry yang lebih efektif
        if (error.response?.status === 429 && retryCount < maxRetries) {
          retryCount++;
          // Exponential backoff: 2s, 4s, 8s
          const delay = Math.pow(2, retryCount) * 1000;
          timeout = setTimeout(fetchTopView, delay);
        } else {
          // Jika sudah mencapai max retry atau error lain, set empty array
          setTopView([]);
          setIsLoading(false);
        }
      }
    };

    // Delay initial request untuk mengurangi collision
    const initialDelay = Math.random() * 1000; // Random delay 0-1 detik
    timeout = setTimeout(fetchTopView, initialDelay);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="bg-[#101014] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Top View Show
          </h2>
          <a href="#" className="text-red-400 text-sm hover:underline">
            View More
          </a>
        </div>
        <p className="text-gray-400 mb-6">
          Explore multiple updates for maximum fun
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="text-gray-400">Loading top anime...</div>
          </div>
        ) : topView.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {topView.map((anime) => (
              <Card key={anime.mal_id} data={anime} type="anime" />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            Unable to load top anime at the moment. Please try again later.
          </div>
        )}
      </div>
    </section>
  );
};

export default TopViewShow;
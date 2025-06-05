import { useState, useEffect } from "react";
import api from "../../api";
import CardItem from "../ui/CardItem";

const TopViewShow = () => {
  const [topView, setTopView] = useState([]);

  useEffect(() => {
    const fetchTopView = async () => {
      try {
        const response = await api.get("/top/anime");
        setTopView(response.data.data.slice(0, 10));
      } catch (error) {
        // Error fetching top view anime, do nothing (silent)
      }
    };
    fetchTopView();
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {topView.map((anime) => (
            <CardItem key={anime.mal_id} data={anime} type="anime" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopViewShow;

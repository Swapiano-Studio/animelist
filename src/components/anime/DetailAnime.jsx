import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import Loading from "../ui/Loading";
import CharacterAnime from "./CharacterAnime";

const DetailAnime = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/anime/${id}`)
      .then((res) => setAnime(res.data.data))
      .catch(() => setAnime(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <Loading text="Loading..." />;
  if (!anime)
    return <div className="text-white p-8 text-center">Anime not found.</div>;

  // Format info
  const year = anime.aired?.from ? new Date(anime.aired.from).getFullYear() : (anime.year || "-");
  const studios = anime.studios?.map((s) => s.name).join(", ") || "-";
  const producers = anime.producers?.map((p) => p.name).join(", ") || "-";
  const genres = anime.genres?.map((g) => g.name).join(", ") || "-";
  const themes = anime.themes?.map((t) => t.name).join(", ") || "-";
  const episodes = anime.episodes ?? "-";
  const duration = anime.duration ?? "-";
  const rating = anime.rating ?? "-";
  const status = anime.status ?? "-";

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col items-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 bg-white/10 text-blue-400 shadow-lg hover:bg-blue-500 hover:text-white transition-colors z-10"
          aria-label="Back"
          style={{ marginBottom: 0 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>
        <img
          src={anime.images?.jpg?.large_image_url}
          alt={anime.title}
          className="w-auto h-[400px] object-cover rounded-2xl shadow-2xl mb-8 mt-8"
        />
        <h1 className="text-3xl font-bold mb-2">
          {anime.title_english || anime.title}
        </h1>
        <ul className="flex flex-col max-w-5xl gap-4 text-gray-400 mb-4 items-center justify-center">
          <li className="flex flex-wrap gap-2 justify-center">
            <span>🎬 {anime.type}</span>
            <span>📅 {year}</span>
            <span>🏢 {studios}</span>
            <span>🔢 {episodes} eps</span>
            <span>⏱️ {duration}</span>
            <span>🔞 {rating}</span>
          </li>
          <li className="flex flex-wrap gap-2 justify-center">
            <span>🏷️ {genres}</span>
            <span>🎭 {themes}</span>
            <span>🏭 {producers}</span>
            <span className="uppercase">{status}</span>
            <span>
              ⭐ {anime.score ?? "-"} ({anime.scored_by ?? "-"} votes)
            </span>
          </li>
        </ul>
        <p className="max-w-5xl text-sm text-justify mb-4">{anime.synopsis}</p>
        {/* Characters Section */}
        {anime && id && <CharacterAnime id={id} />}
      </div>
    </div>
  );
};

export default DetailAnime;

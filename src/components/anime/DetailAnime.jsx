import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import CardItem from "../ui/CardItem";
import Loading from "../ui/Loading";
import CharacterAnime from "./CharacterAnime";

const DetailAnime = () => {
  const { id } = useParams();
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
      <img
        src={anime.images?.jpg?.large_image_url}
        alt={anime.title}
        className="w-auto h-[400px] object-cover rounded-2xl shadow-2xl mb-8"
      />
      <h1 className="text-3xl font-bold mb-2">
        {anime.title_english || anime.title}
      </h1>
      <ul className="flex flex-col gap-4 text-gray-400 mb-4 items-center justify-center">
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
      <p className="max-w-2xl text-center mb-4">{anime.synopsis}</p>
      {/* Characters Section */}
      <CharacterAnime id={id} />
    </div>
  );
};

export default DetailAnime;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import CardItem from "../ui/CardItem";
import Loading from "../ui/Loading";
import CharacterManga from "./CharacterManga";

const DetailManga = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/manga/${id}`)
      .then((res) => setManga(res.data.data))
      .catch(() => setManga(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <Loading text="Loading..." />;
  if (!manga)
    return <div className="text-white p-8 text-center">Manga not found.</div>;

  // Format year, authors, genres, etc.
  const year = manga.published?.from
    ? new Date(manga.published.from).getFullYear()
    : "-";
  const authors = manga.authors?.map((a) => a.name).join(", ") || "-";
  const genres = manga.genres?.map((g) => g.name).join(", ") || "-";
  const serializations =
    manga.serializations?.map((s) => s.name).join(", ") || "-";

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 flex flex-col items-center">
      <img
        src={manga.images?.jpg?.large_image_url}
        alt={manga.title}
        className="w-auto h-[400px] object-cover rounded-2xl shadow-2xl mb-8"
      />
      <h1 className="text-3xl font-bold mb-2">
        {manga.title_english || manga.title}
      </h1>
      <ul className="flex flex-col gap-4 text-gray-400 mb-4 items-center justify-center">
        <li className="flex flex-wrap gap-2 justify-center">
          <span>📚 {manga.type}</span>
          <span>📅 {year}</span>
          <span>✍️ {authors}</span>
          <span>🔢 {manga.chapters ?? "-"} chapters</span>
          <span>📦 {manga.volumes ?? "-"} volumes</span>
        </li>
        <li className="flex flex-wrap gap-2 justify-center">
          <span>🏷️ {genres}</span>
          <span>📰 {serializations}</span>
          <span className="uppercase">{manga.status}</span>
          <span>
            ⭐ {manga.score ?? "-"} ({manga.scored_by ?? "-"} votes)
          </span>
        </li>
      </ul>
      <p className="max-w-2xl text-center mb-4">{manga.synopsis}</p>
      {/* Characters Section */}
      {manga && id && <CharacterManga id={id} />}
    </div>
  );
};

export default DetailManga;

import React from "react";
import { Link } from "react-router-dom";

/**
 * CardItem - Card potrait dinamis untuk anime/manga
 * Props:
 * - data: object (anime/manga)
 * - type: 'anime' | 'manga' (untuk path link)
 * - className: tambahan styling opsional
 */
const CardItem = ({ data, type = 'anime', className = '' }) => {
  if (!data) return null;
  if (type === 'character') {
    return (
      <div className={`flex flex-col bg-[#23232b] rounded-xl shadow-lg hover:scale-105 transition w-full max-w-[200px] h-[290px] overflow-hidden ${className}`}>
        <img
          src={data.images?.jpg?.image_url}
          alt={data.name}
          className="w-full h-[210px] object-cover flex-shrink-0"
        />
        <div className="flex flex-col justify-between p-2 flex-1 min-w-0">
          <h3 className="text-white text-sm font-semibold truncate" title={data.name_kanji || data.name}>
            {data.name}
          </h3>
          <span className="text-xs text-gray-400 truncate">{data.name_kanji}</span>
          <span className="text-xs text-gray-400 truncate">{data.role}</span>
        </div>
      </div>
    );
  }
  const linkPath = `/${type}/${data.mal_id}`;
  return (
    <Link
      to={linkPath}
      className={`flex flex-col bg-[#23232b] rounded-xl shadow-lg hover:scale-105 transition w-full max-w-[200px] h-[290px] overflow-hidden ${className}`}
    >
      <img
        src={data.images?.jpg?.image_url}
        alt={data.title}
        className="w-full h-[210px] object-cover flex-shrink-0"
      />
      <div className="flex flex-col justify-between p-2 flex-1 min-w-0">
        <h3 className="text-white text-sm font-semibold truncate" title={data.title_english || data.title}>
          {data.title_english || data.title}
        </h3>
        <div className="flex flex-col gap-1 mt-1">
          <span className="text-xs text-yellow-400 flex items-center gap-1">⭐ {data.score ?? '-'}</span>
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-gray-400 truncate text-left">{data.published?.from ? new Date(data.published.from).toLocaleDateString() : (data.aired?.from ? new Date(data.aired.from).toLocaleDateString() : '-')}</span>
            <span className="text-xs text-gray-400 truncate text-right ml-2">{data.authors ? data.authors.map(a => a.name).join(', ') : (data.studios ? data.studios.map(s => s.name).join(', ') : '-')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardItem;

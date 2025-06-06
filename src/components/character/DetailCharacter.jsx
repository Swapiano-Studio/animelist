import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import Loading from "../ui/Loading";

const DetailCharacter = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/characters/${id}/full`)
      .then((res) => setCharacter(res.data.data))
      .catch(() => setCharacter(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading text="Loading..." />;
  if (!character)
    return <div className="text-white p-8 text-center">Character not found.</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col items-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 top-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 bg-white/10 text-blue-400 shadow-lg hover:bg-blue-500 hover:text-white transition-colors z-10"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>
        <img
          src={character.images?.jpg?.image_url}
          alt={character.name}
          className="w-auto h-[350px] object-cover rounded-2xl shadow-2xl mb-6 mt-8"
        />
        <h1 className="text-3xl font-bold mb-2 text-center">{character.name}</h1>
        <h2 className="text-lg text-gray-400 mb-4 text-center">{character.name_kanji}</h2>
        <p className="max-w-5xl text-sm text-justify mb-4">{character.about}</p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {character.nicknames && character.nicknames.length > 0 && (
            <div className="bg-[#23232b] px-4 py-2 rounded-lg">
              <span className="font-semibold text-white">Nicknames:</span> {character.nicknames.join(", ")}
            </div>
          )}
          {character.favorites && (
            <div className="bg-[#23232b] px-4 py-2 rounded-lg">
              <span className="font-semibold text-white">Favorites:</span> {character.favorites}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCharacter;

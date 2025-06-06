import { useState, useEffect } from "react";
import api from "../../api";
import Loading from "../ui/Loading";
import Card from "../ui/Card";

const CharacterAnime = ({ id }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api
      .get(`/anime/${id}/characters`)
      .then(async (res) => {
        let chars = res.data.data || [];
        // Fetch first 5 characters immediately
        const firstBatch = chars.slice(0, 5);
        const restBatch = chars.slice(5);
        // Helper for retrying fetch
        const fetchWithRetry = async (mal_id, role, retries = 2) => {
          for (let i = 0; i <= retries; i++) {
            try {
              const detailRes = await api.get(`/characters/${mal_id}/full`);
              return { ...detailRes.data.data, role };
            } catch (err) {
              if (i === retries) return null;
              await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2s before retry
            }
          }
        };
        // Fetch details for first 5
        const firstPromises = firstBatch.map((char) =>
          fetchWithRetry(char.character.mal_id, char.role)
        );
        const firstResults = (await Promise.all(firstPromises)).filter(Boolean);
        if (isMounted) {
          setCharacters(firstResults);
          setLoading(false);
        }
        // Fetch the rest in the background, slower batches
        if (restBatch.length > 0) {
          const batchSize = 1; // smaller batch size
          let details = [];
          for (let i = 0; i < restBatch.length; i += batchSize) {
            const batch = restBatch.slice(i, i + batchSize);
            const batchPromises = batch.map((char) =>
              fetchWithRetry(char.character.mal_id, char.role)
            );
            const batchResults = (await Promise.all(batchPromises)).filter(Boolean);
            details = [...details, ...batchResults];
            if (isMounted) {
              setCharacters((prev) => [...prev, ...batchResults]);
            }
            if (i + batchSize < restBatch.length) {
              await new Promise((resolve) => setTimeout(resolve, 2500)); // 2.5s delay between batches
            }
          }
        }
      })
      .catch(() => {
        if (isMounted) setCharacters([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <Loading text="Loading..." />;

  if (!characters.length)
    return <div className="text-white p-8 text-center">No characters found.</div>;

  const visibleCharacters = showAll ? characters : characters.slice(0, 5);

  return (
    <div className="w-full max-w-5xl mt-4 justify-center">
      <h2 className="text-xl font-bold mb-2">Characters</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {visibleCharacters.map((char) => (
          <Card
            key={char.mal_id}
            data={{
              mal_id: char.mal_id,
              images: char.images,
              name: char.name || "-",
              name_kanji: char.name_kanji || "-",
              role: char.role || "-",
            }}
            type="character"
          />
        ))}
      </div>
      {!showAll && characters.length > 5 && (
        <div className="flex justify-center mt-4">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 bg-white/10 text-blue-400 shadow-lg hover:bg-blue-500 hover:text-white transition-colors z-10"
            onClick={() => setShowAll(true)}
            aria-label="See More"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterAnime;

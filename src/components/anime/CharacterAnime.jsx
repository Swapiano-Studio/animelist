import { useState, useEffect } from "react";
import api from "../../api";
import Loading from "../ui/Loading";
import CardItem from "../ui/CardItem";

const CharacterAnime = ({ id }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/anime/${id}/characters`)
      .then(async (res) => {
        let chars = res.data.data || [];
        chars = chars.slice(0, 5);
        const batchSize = 2;
        const details = [];
        for (let i = 0; i < chars.length; i += batchSize) {
          const batch = chars.slice(i, i + batchSize);
          const batchPromises = batch.map((char) =>
            api
              .get(`/characters/${char.character.mal_id}/full`)
              .then((detailRes) => {
                return {
                  ...detailRes.data.data,
                  role: char.role,
                };
              })
              .catch(() => null)
          );
          const batchResults = await Promise.all(batchPromises);
          details.push(...batchResults.filter(Boolean));
          if (i + batchSize < chars.length) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
          }
        }
        setCharacters(details);
      })
      .catch(() => setCharacters([]))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading text="Loading..." />;

  if (!characters.length)
    return <div className="text-white p-8 text-center">No characters found.</div>;

  return (
    <div className="w-full max-w-4xl mt-4">
      <h2 className="text-xl font-bold mb-2">Characters</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {characters.map((char) => (
          <CardItem
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
    </div>
  );
};

export default CharacterAnime;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import CardItem from "../ui/CardItem";
import Loading from "../ui/Loading";

const PAGE_SIZE = 24;

const MangaListPage = () => {
  const [mangaList, setMangaList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get search query from URL (?q=...)
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("q") || "";

  useEffect(() => {
    setLoading(true);
    api.get(`/manga`)
      .then(res => {
        setMangaList(res.data.data);
        setHasNext(res.data.pagination?.has_next_page);
      })
      .catch(() => setMangaList([]))
      .finally(() => setLoading(false));
  }, [page]);

  // Filter manga by searchQuery
  const filteredList = mangaList.filter(manga =>
    manga.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manga.title_english?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return <Loading text="Loading..." />;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manga List</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {filteredList.map(manga => (
          <CardItem key={manga.mal_id} data={manga} type="manga" />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 rounded bg-red-500 text-white font-semibold disabled:opacity-50"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          className="px-4 py-2 rounded bg-red-500 text-white font-semibold disabled:opacity-50"
          onClick={() => setPage(p => p + 1)}
          disabled={!hasNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MangaListPage;

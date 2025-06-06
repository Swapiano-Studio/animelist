import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api";
import Card from "../ui/Card";
import Loading from "../ui/Loading";

const PAGE_SIZE = 24;

const MangaPage = () => {
  const [mangaList, setMangaList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get search query from URL (?q=...)
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("q") || "";

  useEffect(() => {
    setLoading(true);
    let url = `/manga?page=${page}`;
    if (searchQuery) {
      url += `&q=${encodeURIComponent(searchQuery)}`;
    }
    api.get(url)
      .then(res => {
        setMangaList(res.data.data);
        setHasNext(res.data.pagination?.has_next_page);
        setLastPage(res.data.pagination?.last_visible_page || 1);
      })
      .catch(() => {
        setMangaList([]);
        setLastPage(1);
      })
      .finally(() => setLoading(false));
  }, [page, searchQuery]);

  // No local filtering, use API result directly
  const filteredList = mangaList.slice(0, 20);

  if (loading)
    return <Loading text="Loading..." />;

  const isSearching = !!searchQuery;
  const noResult = filteredList.length === 0;

  return (
    <div className="min-h-screen bg-black text-white px-2 py-8 flex flex-col items-center relative text-justify">
      <div className="w-full max-w-6xl mx-auto relative flex items-center justify-center mb-6">
        {isSearching && (
          <button
            className="absolute left-0 top-1 flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400 text-blue-400 font-semibold shadow-md hover:bg-blue-500 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {
              setPage(1);
              window.location.search = '';
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
        )}
        <h1 className="text-3xl font-bold text-center flex-1">Manga List</h1>
      </div>
      {noResult ? (
        <div className="text-white p-8 text-center">
          the search you are looking for was not found
        </div>
      ) : (
        <>
          <div className="w-full max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-8">
            {filteredList.map(manga => (
              <Card key={manga.mal_id} data={manga} type="manga" />
            ))}
          </div>
          {/* Justify manga synopsis/description */}
          <style>{`.text-justify-synopsis { text-align: justify; }`}</style>
          <div className="flex justify-center gap-4">
            <button
              className="w-28 px-4 py-2 rounded bg-red-500 text-white font-semibold disabled:opacity-50"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {page} of {lastPage}</span>
            <button
              className="w-28 px-4 py-2 rounded bg-red-500 text-white font-semibold disabled:opacity-50"
              onClick={() => setPage(p => p + 1)}
              disabled={!hasNext}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MangaPage;

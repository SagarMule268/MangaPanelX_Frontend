import { useEffect, useState } from "react";
import { getMangaList, getCoverImage } from "../api/mangadek";
import { Link } from "react-router-dom";

const MangaPage = () => {
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 12; // items per page

  // Fetch manga with pagination
  const fetchData = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const offset = limit * (pageNumber - 1);
      const res = await getMangaList(limit, offset);

      // Optionally filter adult content
      const filtered = res.data.filter(
        (m) =>
          m.attributes.contentRating === "safe" ||
          m.attributes.contentRating === "suggestive"
      );

      setManga(filtered);
      setTotal(res.total);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Pagination handlers
  const handleNext = () => {
    if (page * limit < total) setPage(page + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        Manga List
      </h1>

      {loading ? (
        <p className="text-center text-2xl font-semibold text-gray-500">
          Loading...
        </p>
      ) : manga.length === 0 ? (
        <p className="text-center text-2xl font-semibold text-gray-500">
          No manga found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {manga.map((m) => {
              const cover = m.relationships?.find(
                (rel) => rel.type === "cover_art"
              );
              const coverUrl = cover?.attributes?.fileName
                ? getCoverImage(m.id, cover.attributes.fileName)
                : null;

              return (
                <Link
                  key={m.id}
                  to={`manga/${m.attributes.title.en || "No-Title"}/${m.id}`}
                >
                  <div className="relative group border-2 border-white/30 cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={m.attributes.title.en}
                        className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                        No Cover
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                      <h2 className="text-white text-lg font-semibold text-center px-2">
                        {m.attributes.title.en || "No English Title"}
                      </h2>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={page * limit >= total}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
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

import { useEffect, useState } from "react";
import { getMangaList , searchManga } from "../api/mangadex";
import { Link } from "react-router-dom";

const Home = () => {
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 12; // items per page

  // Fetch manga list with pagination
  const fetchData = async (pageNumber = 1) => {
    try {
      document.title = `MangaPanelX`;
      setLoading(true);
      const offset = limit * (pageNumber - 1);
      const data = await getMangaList(limit, offset);
      setManga(data);
      setTotal(data.total);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Handle search
  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const data = await searchManga(query);
      // Filter adult content
      
      setManga(data);
      setLoading(false);
      setPage(1); // reset page
      setTotal(data.total);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Pagination handlers
  const handleNext = () => {
    if (page * limit < total) setPage(page + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        Manga List
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search manga..."
          className="w-72 px-4 py-2 rounded-l-lg border border-white focus:outline-none focus:border-pink-500 focus:bg-pink-50"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-pink-600 text-white rounded-r-lg hover:bg-pink-500 transition-colors duration-300"
        >
          Search
        </button>
      </div>

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
           {manga.map((m) => (
  <Link key={m.id} to={`manga/${m?.attributes?.title?.en  ||  m?.attributes?.title[`ja-ro`]}/${m.id}`}>
    <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-white">
      <img
        src={m.coverUrl}
        alt={m.title}
        className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
        <h2 className="text-white text-lg font-semibold text-center px-2">
          {m?.attributes?.title?.en  ||  m?.attributes?.title[`ja-ro`] || "title not availbale"}
        </h2>
      </div>
    </div>
  </Link>
))}
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

export default Home;

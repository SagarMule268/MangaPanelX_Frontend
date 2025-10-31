import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChapterPages } from "../api/mangadex";

const ReadChapter = () => {
  const { chapterId ,chapter } = useParams();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const data = await getChapterPages(chapterId);
        const { pageUrls } = data;
        setPages(pageUrls);
      } catch (err) {
        console.error("Error fetching chapter:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [chapterId]);

  if (loading) return <p className="text-center mt-8 text-lg">Loading chapter...</p>;
  if (!pages.length) return <p className="text-center mt-8 text-red-500">No pages available.</p>;

  const totalPages = pages.length;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold mb-2 text-center"> Read Chapter {chapter} </h2>

      {/* Manga page */}
      <img
        src={pages[currentPage - 1]}
        alt={`Page ${currentPage}`}
        className="w-full  max-w-2xl rounded-lg shadow-lg object-contain"
      />

      {/* Progress bar */}
      <div className="w-full max-w-2xl mt-4 flex flex-col items-center">
        <input
          type="range"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
          className="w-full accent-pink-600 cursor-pointer"
        />
        <p className="text-gray-700 mt-2">
          Page {currentPage} / {totalPages}
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReadChapter;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMangaById } from "../api/mangadex";

const MangaDetails = () => {
  const { title, id } = useParams();
  const [manga, setManga] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      document.title = document.title = `MangapanelX - ${title}`;
      try {
        const data = await getMangaById(id);
        console.log(data)
        setManga(data);
      } catch (error) {
        console.error("Error fetching manga details:", error);
      }
    };
    fetchManga();
  }, [id]);

  if (!manga)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img
          src="/fevicon.png"
          width="150px"
          className="animate-pulse opacity-90 transition-opacity duration-1000"
          alt="Loading..."
        />
        
        </div>
    );

 

  return (
    <div className="max-w-5xl mx-auto p-6 border border-white/40 rounded-lg shadow-lg mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cover Image */}
        {manga.coverUrl ? (
          <img
            src={manga.coverUrl}
            alt="cover"
            className="w-full md:w-64 h-auto rounded-lg shadow-md object-contain"
          />
        ) : (
          <div className="w-full md:w-64 h-80 bg-gray-200 flex items-center justify-center rounded-lg shadow-md text-gray-500">
            No Cover
          </div>
        )}

        {/* Manga Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {manga.attributes.title.en || Object.values(manga.attributes.title)[0]}
          </h1>

          <p className="text-gray-700 mb-4">
            {manga.attributes.description?.en ||
              Object.values(manga.attributes.description || {})[0] ||
              "No description available."}
          </p>

          <div className="mb-4 space-y-1">
            <p>
              <span className="font-semibold text-gray-800">Status:</span>{" "}
              {manga.attributes.status || "Unknown"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Year:</span>{" "}
              {manga.attributes.year || "Unknown"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Language:</span>{" "}
              {manga.attributes.originalLanguage || "Unknown"}
            </p>
          </div>

          <Link
            to={`/manga/view/${title}/${id}`}
            className="inline-block mt-4 px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-500 transition-colors duration-300"
          >
            Read Manga
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MangaDetails;

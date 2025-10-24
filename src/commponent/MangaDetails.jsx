import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMangaById, getCoverImage } from "../api/mangadek";

const MangaDetails = () => {
  const { title, id } = useParams();
  const [manga, setManga] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const data = await getMangaById(id);
        setManga(data);
      } catch (error) {
        console.error("Error fetching manga details:", error);
      }
    };
    fetchManga();
  }, [id]);

  if (!manga)
    return (
      <p className="text-center text-2xl font-semibold text-gray-500 mt-10">
        Loading manga details...
      </p>
    );

  const cover = manga.relationships.find((rel) => rel.type === "cover_art");
  const coverUrl = cover ? getCoverImage(manga.id, cover.attributes.fileName) : null;

  return (
    <div className="max-w-5xl mx-auto p-6 border border-white/40 rounded-lg shadow-lg mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cover Image */}
        {coverUrl ? (
          <img
            src={coverUrl}
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

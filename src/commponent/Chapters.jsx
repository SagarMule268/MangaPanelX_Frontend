import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getChaptersByMangaId } from "../api/mangadek";

const Chapters = () => {
  const { title, id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getChaptersByMangaId(id);
        const englishManga = data.filter((chp) => chp.attributes.translatedLanguage ==="en")
        setChapters(englishManga);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-2xl font-semibold text-gray-500 mt-10">
        Loading chapters...
      </p>
    );

  if (!chapters.length)
    return (
      <p className="text-center text-2xl font-semibold text-gray-500 mt-10">
        No chapters available.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        {title} - Chapters
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {chapters.map((ch) => (
          <Link
            key={ch.id}
            to={`/manga/read/${ch.id}`}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-3 flex flex-col items-center justify-center text-center"
          >
            <p className="font-semibold text-gray-800">
              Chapter { parseInt( ch.attributes.chapter ) + 1|| "-"}
            </p>
            {ch.attributes.title && (
              <p className="text-gray-500 text-sm truncate">{ch.attributes.title}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chapters;

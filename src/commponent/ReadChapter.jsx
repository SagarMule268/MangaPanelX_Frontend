import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadChapter = () => {
  const { chapterId } = useParams();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
  try {
    // Step 1: Get server + chapter data in one call
    const serverRes = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
    const serverData = await serverRes.json();

    const baseUrl = serverData.baseUrl;
    const chapter = serverData.chapter;
    const hash = chapter.hash;
    const files = chapter.data; // full-quality images

    if (!files || !hash) {
      console.error("No pages found for this chapter");
      setLoading(false);
      return;
    }

    // Optional CORS proxy
    const urls = files.map((file) => `${baseUrl}/data/${hash}/${file}`);

    setPages(urls);
  } catch (err) {
    console.error("Error fetching chapter:", err);
  } finally {
    setLoading(false);
  }
};


    fetchChapter();
  }, [chapterId]);

  if (loading) return <p>Loading chapter...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
  <h2 className="text-2xl font-bold mb-4"></h2>

  {loading && <p className="text-gray-500">Loading chapter...</p>}

  {!loading && pages.length === 0 && (
    <p className="text-red-500">No pages available.</p>
  )}

  <div className="flex flex-col items-center gap-6">
    {pages.map((url, idx) => (
      <img
        key={idx}
        loading="lazy"
        src={url}
        alt={`Page ${idx + 1}`}
        className="w-110 rounded shadow-md"
      />
    ))}
  </div>
</div>

  );
};

export default ReadChapter;

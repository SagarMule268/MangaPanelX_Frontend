
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ;

const BACKEND_URL ="http://localhost:5000"



//  Get Manga List (with cover URLs already processed by backend)
//
export const getMangaList = async (limit = 12, offset = 0) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/manga?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error("Failed to fetch manga list");
    
    return await res.json(); // returns an array of manga
  } catch (error) {
    console.error("Error fetching manga list:", error);
    return [];
  }
};

//
//  Get Manga Details (includes cover, author, artist)
//
export const getMangaById = async (mangaId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/manga/${mangaId}`);
    if (!res.ok) throw new Error("Failed to fetch manga details");
    return await res.json();
  } catch (error) {
    console.error("Error fetching manga details:", error);
    return null;
  }
};

//
//  Get Chapters for a Manga
//
export const getChaptersByMangaId = async (mangaId, limit = 10) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/manga/${mangaId}/chapters?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch chapters");
    return await res.json();
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }
};

//
//  Get Chapter Pages (image URLs ready to display)
//
export const getChapterPages = async (chapterId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/chapter/${chapterId}/pages`);
    if (!res.ok) throw new Error("Failed to fetch chapter pages");
    return await res.json(); // { baseUrl, hash, pageUrls: [] }
  } catch (error) {
    console.error("Error fetching chapter pages:", error);
    return { pageUrls: [] };
  }
};

//
//  Search Manga by title
//
export const searchManga = async (query) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Failed to search manga");
    return await res.json();
  } catch (error) {
    console.error("Error searching manga:", error);
    return [];
  }
};

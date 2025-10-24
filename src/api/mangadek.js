import axios from "axios";

const BASE_URL = "https://api.mangadex.org";

// 1️⃣ Get manga list (with cover images)
export const getMangaList = async (limit = 12, offset = 0) => {
  const response = await axios.get(`${BASE_URL}/manga`, {
    params: {
      limit,
      offset,
      includes: ["cover_art"],// fetch cover images
      contentRating: ["safe", "suggestive"], // 
      order: { latestUploadedChapter: "desc" }
    }
  });
  console.log("response " ,response)
  return response.data;
};

// 2️⃣ Get manga details by ID
export const getMangaById = async (mangaId) => {
  const response = await axios.get(`${BASE_URL}/manga/${mangaId}`, {
    params: { includes: ["cover_art", "author", "artist"] }
  });
  return response.data.data;
};

// 3️⃣ Get chapters of a manga
export const getChaptersByMangaId = async (mangaId, limit = 10) => {
  const response = await axios.get(`${BASE_URL}/chapter`, {
    params: {
      manga: mangaId,
      limit,
      order: { chapter: "asc" }
    }
  });
  return response.data.data;
};

// 4️⃣ Get pages of a chapter
export const getChapterPages = async (chapterId) => {
  // First get the At-Home server URL
  const response = await axios.get(`${BASE_URL}/at-home/server/${chapterId}`);
  return response.data; // contains baseUrl + chapter hash + data (page file names)
};

// 5️⃣ Build cover image URL
export const getCoverImage = (mangaId, coverFileName) => {
  return `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`;
};

export const searchManga = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/manga`, {
      params: {
        title: query,
        limit: 20,
        includes: ["cover_art"],
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error searching manga:", error);
    return [];
  }
};

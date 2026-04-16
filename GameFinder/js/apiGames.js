const API_KEY = "17307702bb744cb4ac3e760a90681caf";
const BASE_URL = "https://api.rawg.io/api";

export async function searchGames(query, genre = "", platform = "") {
  let url = `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=20`;

  if (genre) url += `&genres=${genre}`;
  if (platform) url += `&platforms=${platform}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log("RAWG search response:", data);
  return data.results;
}

export async function getGameDetails(id) {
  const url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
  const res = await fetch(url);
  return res.json();
}

export async function getGameScreenshots(id) {
  const url = `${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export async function getGenres() {
  const url = `${BASE_URL}/genres?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export async function getPlatforms() {
  const url = `${BASE_URL}/platforms?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export async function getTrendingGames() {
  const url = `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=12`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

const YT_KEY = "AIzaSyATfdjTrbx_5H3lGtWouy-mtC9OfjbvGs0";

export async function searchTrailer(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + " trailer")}&key=${YT_KEY}&maxResults=1&type=video`;

  const res = await fetch(url);
  const data = await res.json();

  return data.items?.[0]?.id?.videoId || null;
}

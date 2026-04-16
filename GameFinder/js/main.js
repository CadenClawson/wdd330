import {
  searchGames,
  getGameDetails,
  getGameScreenshots,
  getGenres,
  getPlatforms,
  getTrendingGames
} from "./apiGames.js";

import { searchTrailer } from "./apiVideos.js";
import { renderResults } from "./ui.js";
import { renderGameDetail } from "./gameDetail.js";
import {
  addToWishlist,
  renderWishlist,
  removeFromWishlist
} from "./wishlist.js";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const genreSelect = document.getElementById("genre-select");
const platformSelect = document.getElementById("platform-select");
const resultsGrid = document.getElementById("results-grid");
const trendingGrid = document.getElementById("trending-grid");
const wishlistGrid = document.getElementById("wishlist-grid");
const detailSection = document.getElementById("detail-section");
const detailContainer = document.getElementById("game-detail");

// Load filters
async function loadFilters() {
  const genres = await getGenres();
  const platforms = await getPlatforms();

  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g.id;
    opt.textContent = g.name;
    genreSelect.appendChild(opt);
  });

  platforms.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    platformSelect.appendChild(opt);
  });
}

// Load trending games
async function loadTrending() {
  const games = await getTrendingGames();
  renderResults(trendingGrid, games);
}

// Search form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = input.value.trim();
  const genre = genreSelect.value;
  const platform = platformSelect.value;

  resultsGrid.innerHTML = `<p>Loading...</p>`;

  const games = await searchGames(query, genre, platform);
  renderResults(resultsGrid, games);
});

// Open detail overlay
async function openGameDetail(id) {
  const game = await getGameDetails(id);
  const screenshots = await getGameScreenshots(id);
  const trailerId = await searchTrailer(game.name);

  renderGameDetail(detailContainer, game, screenshots, trailerId);
  detailSection.style.display = "block";

  document.getElementById("back-btn").addEventListener("click", () => {
    detailSection.style.display = "none";
  });

  document.querySelector(".add-wishlist").addEventListener("click", () => {
    addToWishlist(game);
    renderWishlist(wishlistGrid);
  });
}

// Click handlers
resultsGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".game-card");
  if (card) openGameDetail(card.dataset.id);
});

trendingGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".game-card");
  if (card) openGameDetail(card.dataset.id);
});

wishlistGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    removeFromWishlist(e.target.dataset.id);
    renderWishlist(wishlistGrid);
    return;
  }

  const card = e.target.closest(".game-card");
  if (card) openGameDetail(card.dataset.id);
});

// Initialize
loadFilters();
loadTrending();
renderWishlist(wishlistGrid);

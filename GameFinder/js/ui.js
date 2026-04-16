import { createGameCard } from "./components/GameCard.js";

export function renderResults(container, games) {
  container.innerHTML = games.map(createGameCard).join("");
}

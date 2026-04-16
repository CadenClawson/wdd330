export function createGameCard(game) {
  return `
    <div class="game-card" data-id="${game.id}">
      <img src="${game.background_image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <p>Rating: ${game.rating}</p>
    </div>
  `;
}

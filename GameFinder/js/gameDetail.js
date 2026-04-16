export function renderGameDetail(container, game, screenshots, trailerId) {
  container.innerHTML = `
    <button id="back-btn">Back</button>

    <div class="detail-header">
      <img src="${game.background_image}" alt="${game.name}">
      <div>
        <h2>${game.name}</h2>
        <p>${game.description_raw || "No description available."}</p>
        <button class="add-wishlist">Add to Wishlist</button>
      </div>
    </div>

    <h3>Screenshots</h3>
    <div class="screenshot-grid">
      ${screenshots.map(s => `<img src="${s.image}">`).join("")}
    </div>

    <h3>Trailer</h3>
    ${
      trailerId
        ? `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${trailerId}" frameborder="0" allowfullscreen></iframe>`
        : "<p>No trailer found.</p>"
    }
  `;
}

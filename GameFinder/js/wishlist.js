let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

export function addToWishlist(game) {
  if (!wishlist.some(g => g.id === game.id)) {
    wishlist.push(game);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}

export function removeFromWishlist(id) {
  wishlist = wishlist.filter(g => g.id != id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

export function renderWishlist(container) {
  container.innerHTML = wishlist
    .map(
      g => `
      <div class="game-card" data-id="${g.id}">
        <img src="${g.background_image}" alt="${g.name}">
        <h3>${g.name}</h3>
        <button class="remove-btn" data-id="${g.id}">Remove</button>
      </div>
    `
    )
    .join("");
}

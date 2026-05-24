export const products = [
  { id: 1, name: "Mechanical Keyboard", category: "Input", price: 120 },
  { id: 2, name: "Wireless Mouse", category: "Input", price: 45 },
  { id: 3, name: "4K Monitor", category: "Display", price: 380 },
  { id: 4, name: "Webcam HD", category: "Video", price: 89 },
  { id: 5, name: "USB Headset", category: "Audio", price: 150 },
  { id: 6, name: "Laptop Stand", category: "Accessory", price: 35 },
];

export function saveFavourites(ids) {
  localStorage.setItem("favIds", JSON.stringify(ids));
}

export function loadFavourites() {
  const storedFavIds = JSON.parse(localStorage.getItem("favIds"));
  if (storedFavIds === null) return [];
  return storedFavIds;
}

export function toggleFavourite(id) {
  let favourites = loadFavourites();

  if (favourites.includes(id)) {
    const index = favourites.indexOf(id);
    if (index > -1) {
      favourites.splice(index, 1);
    }
  } else {
    favourites.push(id);
  }

  saveFavourites(favourites);
  return favourites;
}

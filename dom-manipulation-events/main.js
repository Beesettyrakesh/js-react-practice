import { loadFavourites, products, toggleFavourite } from "./app.js";

const ul = document.getElementById("product-list");
const text = document.getElementById("count");
const strong = document.getElementById("favourite-products-count");
const span = document.getElementById("star-icon");

renderProducts(products, "");
renderCount(products.length);
updateFavouritesCount();

function renderProducts(productsArr, searchText) {
  ul.replaceChildren();
  const favProducts = loadFavourites();

  productsArr.forEach((product) => {
    const li = document.createElement("li");
    const favBtn = document.createElement("button");
    const span = document.createElement("span");

    if (favProducts.includes(product.id)) {
      favBtn.classList.add("active-favourite-btn");
      favBtn.innerHTML = "&#x2605;";
    } else {
      favBtn.innerHTML = "&#9734;";
    }

    li.appendChild(favBtn);

    let formattedProductName =
      searchText === "" ? product.name : formatString(product.name, searchText);
    span.innerHTML = `Name: ${formattedProductName} | Category: ${product.category} | Price: ${product.price}`;
    li.appendChild(span);

    ul.appendChild(li);

    favBtn.addEventListener("click", () => {
      addFavourite(product.id);

      favBtn.classList.toggle("active-favourite-btn");

      if (favBtn.classList.contains("active-favourite-btn")) {
        favBtn.innerHTML = "&#x2605;";
      } else {
        favBtn.innerHTML = "&#9734;";
      }

      updateFavouritesCount();
    });
  });
}

const element = document.getElementById("search");
element.addEventListener("input", searchFunction);

function addFavourite(productId) {
  toggleFavourite(productId);
}

function updateFavouritesCount() {
  const favProducts = loadFavourites();
  span.innerHTML = "&#x2605;";
  span.classList.add("active-favourite-btn");
  strong.textContent = `${favProducts.length} favourites`;
}

function searchFunction(event) {
  const searchText = event.target.value.toLowerCase();

  const filteredProducts = filterProducts(searchText);

  if (filteredProducts.length === 0) {
    renderEmptyState();
  } else {
    renderProducts(filteredProducts, searchText);
  }

  renderCount(filteredProducts.length);
}

function renderCount(filteredProductsCount) {
  text.textContent = `Showing ${filteredProductsCount} of ${products.length} products`;
}

function renderEmptyState() {
  ul.replaceChildren();
  const p = document.createElement("p");
  p.textContent = "No products found";
  ul.append(p);
}

function filterProducts(searchText) {
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText),
  );
}

function formatString(productName, searchText) {
  let startIndex = productName.toLowerCase().indexOf(searchText);
  if (startIndex === -1) {
    return productName;
  }
  let beforePart = productName.slice(0, startIndex);
  let matchPart = productName.slice(startIndex, startIndex + searchText.length);
  let afterPart = productName.slice(
    startIndex + searchText.length,
    productName.length,
  );
  return `${beforePart}<mark>${matchPart}</mark>${afterPart}`;
}

import { products } from "./app.js";

const ul = document.getElementById("product-list");
const text = document.getElementById("count");

renderProducts(products, "");
renderCount(products.length);

function renderProducts(productsArr, searchText) {
  ul.replaceChildren();

  productsArr.forEach((product) => {
    const li = document.createElement("li");
    let formattedProductName =
      searchText === "" ? product.name : formatString(product.name, searchText);
    li.innerHTML = `Name: ${formattedProductName} | Category: ${product.category} | Price: ${product.price}`;
    ul.appendChild(li);
  });
}

const element = document.getElementById("search");
element.addEventListener("input", searchFunction);

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

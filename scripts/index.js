import { loadCategoryLinks, makeCategoryLinksInteractive, resetCategoriesData } from "./categories.js";
import { products } from "../data/products.js"
import { loadCartQuantity, initAddToCartButton } from "./cart.js"
import { initSearchBar, resetProductInput } from "./search-bar.js";
import { loadNavBarAndFooter, loadBestSellers, formatCurrency } from "./utils.js";

//code to load  navbar and footer

loadNavBarAndFooter();

// code to reset categories data when user loads index page

resetCategoriesData();

// Code to get and show cart quantity 

loadCartQuantity();

// Code to make search bar interactive

initSearchBar();

// Code to load category links 

loadCategoryLinks();

//code to make category links interactive

makeCategoryLinksInteractive();

// code to reset the input in case the user clicks a button that loads game page

resetProductInput();

/* ------------------------------------------------------------------ */

// Code to get news products

let count = 0;
const productCount = 4;
let newsProducts = [];

products.forEach((product) => {
  if (product.categories.includes("Novidades") && count < productCount) {
    newsProducts.push(product);
    count++;
  }
})

// Code to load news HTML 

function loadNews() {

  let count = 0;

  let newsHTML = ''

  newsProducts.forEach((product) => {
    count++;

    if (count == 1 || count == 2) {
      newsHTML += `
        <div class="news-card">
          <img class="game-image new" src="${product.image}" alt="${product.name} image">
          <p class="game-name">${product.name}</p>
          <p class="game-price">R$ ${formatCurrency(product.priceCents)}</p>
          <button class="js-add-to-cart-button btn add-to-cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
        </div>
      `;
    } else if (count == 3) {
      newsHTML += `
        <div class="news-card third-news">
          <img class="game-image new" src="${product.image}" alt="${product.name} image">
          <p class="game-name">${product.name}</p>
          <p class="game-price">R$ ${formatCurrency(product.priceCents)}</p>
          <button class="js-add-to-cart-button btn add-to-cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
        </div>
      `;
    } else if (count == 4) {
      newsHTML += `
        <div class="news-card fourth-news">
          <img class="game-image new" src="${product.image}" alt="${product.name} image">
          <p class="game-name">${product.name}</p>
          <p class="game-price">R$ ${formatCurrency(product.priceCents)}</p>
          <button class="js-add-to-cart-button btn add-to-cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
        </div>
      `;
    }

  })

  document.querySelector('.js-news-cards-container').innerHTML = newsHTML;

}


export function loadHomePage() {

  // console.log(newsProducts);
  // console.log(bestSellerProducts);

  loadNews();
  loadBestSellers();
  loadCartQuantity();
}

loadHomePage();

// Code to make add to cart button interactive 

initAddToCartButton();



const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

console.log(`Viewport Width: ${viewportWidth}px`);
console.log(`Viewport Height: ${viewportHeight}px`);
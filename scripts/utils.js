import { products } from "../data/products.js";
import { cart } from "./cart.js";

// code to check if product fit the categories checked

export function compareArrays(productCategories, activeCategories) {

  const length = activeCategories.length;
  let count = 0;


  for (let i=0; i < productCategories.length; i++) {
    if (activeCategories.includes(productCategories[i])) count++;
  }

  if (count === length) {
    return true;
  }
  return false;
}

// code to load navbar and footer

export function loadNavBarAndFooter() {
  let navBarHTML = `
    <div class="main-navbar">
      <a class="logo navbar-logo" href="index.html">
        <img class="cards-logo" src="images/svgs/logo-cards.svg" alt="dream games logo">
        <p class="logo-text">Dream Games</p>
      </a>

      <div class="search-bar">
        <input class="js-search-bar-input search-bar-input" type="text" placeholder="O que você está procurando?">
        <button class="js-search-bar-button search-bar-button"><img src="images/svgs/search-outline.svg" alt="search icon"></button>
      </div>

      <ul class="login-checkout">
          <li><a class="account" href="login.html">Conta</a></li>
          <li>
            <a class="shopping-cart" href="checkout.html">
              <div class="js-cart-quantity cart-quantity">0</div>
              <img src="images/svgs/cart.svg" alt="cart outline">
            </a>
          </li>
      </ul>
    </div>
  `

  document.querySelector('.js-navbar').innerHTML = navBarHTML;

  let footerHTML =`
    <div class="footer-container secondary-container">
      <a class="logo" href="index.html">
        <img class="cards-logo" src="images/svgs/logo-cards.svg" alt="dream games logo">
        <p class="logo-text">Dream Games</p>
      </a>

      <ul class="social-icons-container">
        <li><a href="https://www.instagram.com/"><img class="social-icons" src="images/svgs/instagram.svg" alt="instagram logo"></a></li>
        <li><a href="https://www.facebook.com/"><img class="social-icons" src="images/svgs/facebook.svg" alt="facebook logo"></a></li>
        <li><a href="https://www.tiktok.com/"><img class="social-icons" src="images/svgs/tiktok.svg" alt="tiktok logo"></a></li>
        <li><a href="https://www.linkedin.com/"><img class="social-icons" src="images/svgs/linkedin.svg" alt="linkedin logo"></a></li>
        <li><a href="https://www.youtube.com/"><img class="social-icons" src="images/svgs/youtube.svg" alt="youtube logo"></a></li>
      </ul>

      <ul class="footer-links-container">
        <li><a class="footer-text" href="index.html">Página Principal</a></li>
        <li><a class="footer-text" href="login.html">Conta</a></li>
      </ul>

      <p class="small-text sm-text-footer">Feito com <span class="heart-icon">♥︎</span> no Brasil</p>
    </div>
  `

  document.querySelector('.js-footer').innerHTML = footerHTML;
}

// Code to load best seller HTML 

export function loadBestSellers() {

  // Code to get best seller products

  let count = 0;
  const productCount = 4;
  let bestSellerProducts = [];

  products.forEach((product) => {
    if (product.categories.includes("Mais Vendidos") && count < productCount) {
      bestSellerProducts.push(product);
      count++;
    }
  })

  count = 0;

  let bestSellerHTML = ''

  bestSellerProducts.forEach((product) => {
    count++;

    if (count == 1 || count == 2) {
      bestSellerHTML += `
        <div class="best-seller-card">
          <img class="game-image sm-game-image" src="${product.image}" alt="${product.name} image">
          <p class="game-name">${product.name}</p>
          <p class="game-price">R$ ${formatCurrency(product.priceCents)}</p>
          <button class="js-add-to-cart-button btn add-to-cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
        </div>
      `;
    } else if (count == 3) {
      bestSellerHTML += `
        <div class="best-seller-card third-best-seller">
          <img class="game-image sm-game-image" src="${product.image}" alt="${product.name} image">
          <p class="game-name">${product.name}</p>
          <p class="game-price">R$ ${formatCurrency(product.priceCents)}</p>
          <button class="js-add-to-cart-button btn add-to-cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
        </div>
      `;
    } else if (count == 4) {
      bestSellerHTML += `
        <div class="best-seller-card fourth-best-seller">
          <img class="game-image sm-game-image" src="${product.image}" alt="${product.name} image">
          <p class="game-name">${product.name}</p>
          <p class="game-price">R$ ${formatCurrency(product.priceCents)}</p>
          <button class="js-add-to-cart-button btn add-to-cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
        </div>
      `;
    }
  })

  document.querySelector('.js-best-seller-cards-container').innerHTML = bestSellerHTML;

}

// code to format currency 

export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

// code to handle footer and no products in cart message 

export function handleMessageAndFooter() {
  // code to load message and fix footer in case the cart is empty 

  document.querySelector('.js-footer').classList.remove('js-footer-style');

  if (cart.cartProducts.length === 0) {
    const message = '<p class="empty-cart-message">Seu carrinho está vazio !</p>';

    document.querySelector('.js-checkout-container').innerHTML = message;

    document.querySelector('.js-footer').classList.add('js-footer-style');
  }

  // code to fix footer in case there is only one product in cart 

  const viewportWidth = window.innerWidth;
  console.log(viewportWidth);

  if (cart.cartProducts.length === 1 && viewportWidth > 900) {
    document.querySelector('.js-footer').classList.add('js-footer-style');
  }
}

// code to get product

export function getProduct(productId) {

  let returnProduct = 0;

  products.forEach((product) => {
    if (product.id === productId) returnProduct = product;
  })

  return returnProduct;
}


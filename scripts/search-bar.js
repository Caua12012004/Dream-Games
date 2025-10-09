import { resetCategoriesData } from "./categories.js";
import { products } from "../data/products.js";

// code to load the products that match the search bar input

export function loadInputProducts(input) {

  let inputProductsHTML = '';

  products.forEach((product) => {

    if (product.name.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, ''))) {
      inputProductsHTML += `
        <div class="product-card">
          <img class="product-image" src="${product.image}" alt="${product.name} image">
          <p class="product-name">${product.name}</p>
          <p class="product-price">R$ ${product.priceCents / 100}</p>
          <button class="js-add-to-cart-button btn add-to-cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
        </div>
      `;
    }

  })

  document.querySelector('.js-product-cards-container').classList.add('product-cards-container');
  document.querySelector('.js-footer').classList.remove('js-footer-style');

  if (inputProductsHTML !== '') {
    document.querySelector('.js-product-cards-container').innerHTML = inputProductsHTML;
  } else {
    const message = '<p class="no-products-message">Produto não encontrado!</p>';
    document.querySelector('.js-product-cards-container').innerHTML = message;

    document.querySelector('.js-product-cards-container').classList.remove('product-cards-container');
    document.querySelector('.js-footer').classList.add('js-footer-style');
  }

}


// code to get export search bar input and to load games page when user clicks enter in searchbar
// this code also resets the category checkbox

export let productInput = JSON.parse(localStorage.getItem('productInput')) || '';

export function initSearchBar() {

  const searchBarInput = document.querySelector('.js-search-bar-input');
  const searchBarButton = document.querySelector('.js-search-bar-button');

  // code to load the games page when entering a product name in the search bar input
  // this code also resets category data 

  searchBarInput.addEventListener('keydown', (event) => {

    if (event.key == 'Enter') {
      resetCategoriesData();

      productInput =  searchBarInput.value;
      localStorage.setItem('productInput', JSON.stringify(productInput));
      console.log(productInput);
      window.location.href = "games.html";
    }

  })

  searchBarButton.addEventListener('click', (event) => {
  
    resetCategoriesData();

    productInput =  searchBarInput.value;
    localStorage.setItem('productInput', JSON.stringify(productInput));
    console.log(productInput);
    window.location.href = "games.html";
  })

}

// code to reset the input in case the user clicks a button that loads game page

export function resetProductInput() {
  document.querySelectorAll('.js-games-page-button').forEach((categoryLink) => {
    categoryLink.addEventListener('click', (event) => {
      productInput = '';
      localStorage.setItem('productInput', JSON.stringify(productInput));
    })
  })

}

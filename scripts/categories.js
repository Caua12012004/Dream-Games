import { products } from "../data/products.js";
import { compareArrays, formatCurrency } from "./utils.js";

export let categories = JSON.parse(localStorage.getItem('categories')) || [
  {
    "id":"Promoções",
    "status": 'unactive'
  }, 

  {
    "id":"Novidades",
    "status": 'unactive'
  }, 

  {
    "id":"Estratégia",
    "status": 'unactive'
  }, 

  {
    "id":"Família",
    "status": 'unactive'
  }, 

  {
    "id":"Clássicos",
    "status": 'unactive'
  }, 

  {
    "id":"2 Jogadores",
    "status": 'unactive'
  }, 

  {
    "id":"Aventura e RPG",
    "status": 'unactive'
  }, 

  {
    "id":"Festa",
    "status": 'unactive'
  }, 

];

// code to save categories data in local storage 

export function saveCategoriesToStorage() {
  localStorage.setItem('categories', JSON.stringify(categories));
  console.log(localStorage);
}

// code to reset categories data 

export function resetCategoriesData() {
  categories = [
    {
      "id":"Promoções",
      "status": 'unactive'
    }, 

    {
      "id":"Novidades",
      "status": 'unactive'
    }, 

    {
      "id":"Estratégia",
      "status": 'unactive'
    }, 

    {
      "id":"Família",
      "status": 'unactive'
    }, 

    {
      "id":"Clássicos",
      "status": 'unactive'
    }, 

    {
      "id":"2 Jogadores",
      "status": 'unactive'
    }, 

    {
      "id":"Aventura e RPG",
      "status": 'unactive'
    }, 

    {
      "id":"Festa",
      "status": 'unactive'
    }, 

  ];

  saveCategoriesToStorage();
}

// Code to load category links in index page

export function loadCategoryLinks() {
  let categoryLinksHTML = '';

  categories.forEach((category) => {
    categoryLinksHTML += `
    <li><a class="js-category-link js-games-page-button category" href="games.html" id="${category.id}">${category.id}</a></li>
    `;
  })

  document.querySelector('.js-categories').innerHTML = categoryLinksHTML;
}

/* ------ CODE BLOCK TO MAKE CATEGORY LINKS INTERACTIVE------ */

// Code to change category status when user clicks category link 

function changeCategoryStatus(categoryLinkId) {
  categories.forEach((category) => {
    if (category.id === categoryLinkId) {
      category.status = 'active';
    }
  })
  saveCategoriesToStorage();
}

export function makeCategoryLinksInteractive() {
  document.querySelectorAll('.js-category-link').forEach((categoryLink) => {
    categoryLink.addEventListener('click', (event) => {
      changeCategoryStatus(categoryLink.id);
    })
  })
}


/* ------------------------------------------------------------------ */

// code to load category checkbox in games page 

export function loadCategoriesCheckbox() {
  let categoriesHTML = '';

  console.log(categories)

  categories.forEach((category) => {
    if (category.status === 'unactive') {
        categoriesHTML += `
          <div class="category-checkbox">
            <input class="js-checkbox" type="checkbox" id="${category.id}">
            <label class="checkbox-label" for="offers">${category.id}</label>
          </div>
        `;
      } else if (category.status === 'active'){
        categoriesHTML += `
          <div class="category-checkbox">
            <input class="js-checkbox" type="checkbox" id="${category.id}" checked>
            <label class="checkbox-label" for="offers">${category.id}</label>
          </div>
        `;
      }
  })

  document.querySelector('.js-category-checkbox-container').innerHTML = categoriesHTML;
}


/* ------ CODE BLOCK TO MAKE CATEGORY CHECKBOX INTERACTIVE------ */

// code that makes category checkbox interactive

export function makeCategoryCheckboxInteractive() {
  document.querySelectorAll('.js-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      // console.log(checkbox.id);
      changeCheckboxStatus(checkbox.id);
      updateActiveCategories();
      updateGamesPage();
    })
  });
}

// code to change category status 

function changeCheckboxStatus(checkboxId) {
  categories.forEach((category) => {
    if (category.id === checkboxId) {
      if (category.status === "unactive") {category.status = "active";}
      else if (category.status === "active") {category.status = "unactive";}  
      // console.log(category.status);
    }
  });

  saveCategoriesToStorage();
}

// code to get active categories 

let activeCategories = [];

export function updateActiveCategories() {
  categories.forEach((category) => {

    if (!activeCategories.includes(category.id)) {
      if (category.status === 'active') activeCategories.push(category.id);
    } else if (activeCategories.includes(category.id)) {
      if (category.status === "unactive") activeCategories.splice(activeCategories.indexOf(category.id));
    }

  })

  // console.log(activeCategories);
}

// Code to load products of games page

function loadGamesPage() {
  let gamesPageHTML = '';

  products.forEach((product) => {
    gamesPageHTML += `
    <div class="product-card">
      <img class="product-image" src="${product.image}" alt="${product.name} image">
      <p class="product-name">${product.name}</p>
      <p class="product-price">R$ ${formatCurrency(product.priceCents)}</p>
      <button class="js-add-to-cart-button btn add-to-cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
    </div>
    `;
  })

  document.querySelector('.js-product-cards-container').innerHTML = gamesPageHTML;
}

// code to check if there is at least one category active 

function activeCategoryCheck() {

  let activeCount = 0;
  
  categories.forEach((category) => {
    if (category.status === 'active') activeCount++;
  })

  if (activeCount > 0) return true;
  else return false;
}

// code to update games page when categories are active 

export function updateGamesPage() {

  // get the id of the products that fit in the categories checked

  let updatedProductsId = [];

  products.forEach((product) => {
    if (!updatedProductsId.includes(product.id)) {
      if (compareArrays(product.categories, activeCategories) == true) updatedProductsId.push(product.id);
    } else if (updatedProductsId.includes(product.id)) {
      if (compareArrays(product.categories, activeCategories) == false) 
        updatedProductsId.splice(updatedProductsId.indexOf(product.id));
    }
  })

  // get the products that fit in the categories checked

  let updatedProducts = [];

  products.forEach((product) => {
    if (updatedProductsId.includes(product.id)) updatedProducts.push(product);
  })

  // update the html with the products that fit in the categories checked

  let gamesPageHTML = '';

  updatedProducts.forEach((product) => {
    gamesPageHTML += `
      <div class="product-card">
        <img class="product-image" src="${product.image}" alt="${product.name} image">
        <p class="product-name">${product.name}</p>
        <p class="product-price">R$ ${formatCurrency(product.priceCents)}</p>
        <button class="js-add-to-cart-button btn add-to-cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
      </div>
    `;
  })

  document.querySelector('.js-product-cards-container').innerHTML = gamesPageHTML;

  // load the message in case the are no products that fit the categories checked 

  document.querySelector('.js-product-cards-container').classList.add('product-cards-container');
  document.querySelector('.js-footer').classList.remove('js-footer-style');
  
  if (updatedProducts.length === 0 && activeCategoryCheck() === true) {

    const message = '<p class="no-products-message">Não existe nenhum produto que se encaixe nessas categorias!</p>';
    document.querySelector('.js-product-cards-container').innerHTML = message;

    document.querySelector('.js-product-cards-container').classList.remove('product-cards-container');
    document.querySelector('.js-footer').classList.add('js-footer-style');
  }
  

  // load the games page with all the games in case the user unchecked all the boxes 

  if (updatedProducts.length === 0 && activeCategoryCheck === false) {
    console.log('condition met');
    loadGamesPage();
  }

}


/* ------------------------------------------------------------------ */
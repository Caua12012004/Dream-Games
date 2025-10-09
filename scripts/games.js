import { loadCartQuantity, initAddToCartButton } from "./cart.js";
import { loadCategoriesCheckbox, makeCategoryCheckboxInteractive, updateGamesPage, updateActiveCategories } from "./categories.js";
import { productInput, loadInputProducts, initSearchBar } from "./search-bar.js";
import { loadNavBarAndFooter } from "./utils.js";

//code to load  navbar and footer

loadNavBarAndFooter();

// Code to get and show cart quantity 

loadCartQuantity();

// Code to make search bar interactive

initSearchBar();

// Code to load products of games page from local storage (when user did not use the search bar)

if (productInput === '' || productInput === "''") {
  updateActiveCategories();
  updateGamesPage();
} else {
  loadInputProducts(productInput);
}

// Code to load categories checkbox

loadCategoriesCheckbox();

// code that makes category checkbox interactive

makeCategoryCheckboxInteractive();

// Code to make add to cart button interactive 

initAddToCartButton();

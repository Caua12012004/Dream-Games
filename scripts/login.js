import { resetCategoriesData } from "./categories.js";
import { loadCartQuantity } from "./cart.js";
import { initSearchBar, resetProductInput } from "./search-bar.js";
import { loadYourOrders } from "./yourOrderScript.js";
import { loadNavBarAndFooter } from "./utils.js";

//code to load  navbar and footer

loadNavBarAndFooter();

// code to reset categories data when user loads index page

resetCategoriesData();

// Code to get and show cart quantity 

loadCartQuantity();

// Code to make search bar interactive

initSearchBar();

// code to reset the input in case the user clicks a button that goes  to checkout page

resetProductInput();

// code to load your orders 

loadYourOrders();


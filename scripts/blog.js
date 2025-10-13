import { loadCartQuantity} from "./cart.js"
import { initSearchBar, resetProductInput } from "./search-bar.js";
import { loadNavBarAndFooter} from "./utils.js";

//code to load  navbar and footer

loadNavBarAndFooter();

// Code to get and show cart quantity 

loadCartQuantity();

// Code to make search bar interactive

initSearchBar();

// code to reset the input in case the user clicks a button that loads game page

resetProductInput();
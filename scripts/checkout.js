import { resetCategoriesData } from "./categories.js";
import { loadCart, loadCartQuantity, cart} from "./cart.js"
import { initSearchBar, resetProductInput} from "./search-bar.js";
import { loadNavBarAndFooter, handleMessageAndFooter } from "./utils.js";
import { loadOrderSummary } from "./orderSummary.js";

// code to change dayjs language to portuguese 

dayjs.locale('pt');

//code to load  navbar and footer

loadNavBarAndFooter();

// code to reset categories data when user loads index page

resetCategoriesData();

// Code to get and show cart quantity 

loadCartQuantity();

// Code to make search bar interactive

initSearchBar();

// code to handle footer and no products in cart message 

handleMessageAndFooter();

// code to load cart products without shipping options

loadCart();

// code to load order summary

if (cart.cartQuantity !== 0) loadOrderSummary();

// code to reset the input in case the user clicks a button that goes  to checkout page

resetProductInput();
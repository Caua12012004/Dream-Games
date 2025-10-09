import { resetCategoriesData } from "./categories.js";
import { loadCartQuantity, getCartProduct, getProducQuantity } from "./cart.js";
import { initSearchBar, resetProductInput } from "./search-bar.js";
import { loadNavBarAndFooter, getProduct, formatCurrency } from "./utils.js";
import { getShippingDate, getYourOrdersShippingDate } from "./shippingOptions.js";
import { getOrderProduct, getOrder } from "./yourOrderScript.js";


dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.locale("pt-br");

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

// code to get the order id and the product id to track 

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

// code to get information to display on the page 

const productName = getProduct(productId).name;
const productImage = getProduct(productId).image;
const productQuantity = getOrderProduct(orderId, productId).orderProductQuantity;
const productCost = getProduct(productId).priceCents;
const totalCost = productQuantity*productCost;
let deliveryDate = getOrderProduct(orderId, productId).orderProductDeliveryDate;
let orderDate = getOrder(orderId).orderDate;

// code to load tracking page

function loadTrackingPage() {
  const trackingPageHTML = `
  <h4 class="tracking-title">Data de entrega: ${deliveryDate}</h3>
  <div class="tracking-image-product-info">
    <img class="tracking-image" src="${productImage}" alt="${productName} image">
    <div class="tracking-product-info">
      <p><span class="text-bd">${productName}</span></p>
      <p><span class="text-bd">Quantidade: </span> ${productQuantity}</p>
      <p><span class="text-bd">Total: </span>R$ ${formatCurrency(totalCost)}</p>
      <p><span class="text-bd">ID do pedido: </span>${orderId}</p>
    </div>
  </div>

  <div class="progress-label-container">
    <p class="js-preparing-status">Preparando</p>
    <p class="js-shipped-status">Enviado</p>
    <p class="js-delivered-status">Entregue</p>
  </div>

  <div class="progress-bar-container">
    <div class="js-progress-bar progress-bar"></div>
  </div>
  `;

  document.querySelector('.js-tracking-container').innerHTML = trackingPageHTML;

}

loadTrackingPage();

/* ------ CODE BLOCK TO MAKE TRACKING PROGRESS BAR INTERACTIVE------ */

// code to get dates 

const orderYear = getOrder(orderId).orderYear;
const deliveryDateWithYear = `${deliveryDate} de ${orderYear}`;
deliveryDate = dayjs(deliveryDateWithYear, "D [de] MMMM [de] YYYY");

const orderDateWithYear = `${orderDate} de ${orderYear}`;
orderDate = dayjs(orderDateWithYear, "D [de] MMMM [de] YYYY");

const today = dayjs();

// code to get percentage progress and load the progress bar

const percentProgress = (today.diff(orderDate, 'day') / deliveryDate.diff(orderDate, 'day'))*100;

const progressBar = document.querySelector('.js-progress-bar')
progressBar.style.width = `${percentProgress}%`;

// code to make current status bold and orange

const preparingStatus = document.querySelector('.js-preparing-status');
const shippedStatus = document.querySelector('.js-shipped-status');
const deliverdStatus = document.querySelector('.js-delivered-status');

if (percentProgress >= 0 && percentProgress < 50) {
  preparingStatus.classList.add('js-tracking-current-status');
  shippedStatus.classList.remove('js-tracking-current-status');
  deliverdStatus.classList.remove('js-tracking-current-status');
} else if (percentProgress >= 50 && percentProgress < 100) {
  preparingStatus.classList.remove('js-tracking-current-status');
  shippedStatus.classList.add('js-tracking-current-status');
  deliverdStatus.classList.remove('js-tracking-current-status');
} else if (percentProgress >= 100) {
  preparingStatus.classList.remove('js-tracking-current-status');
  shippedStatus.classList.remove('js-tracking-current-status');
  deliverdStatus.classList.add('js-tracking-current-status');
}

/* ------------------------------------------------------------------ */
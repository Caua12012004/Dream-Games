import { cart } from "./cart.js";
import { products } from "../data/products.js";
import { getShippingOption } from "./shippingOptions.js";
import { formatCurrency } from "./utils.js";
import { initFinishYourOrderButton } from "./yourOrderScript.js";

// code to get products' cost, shipping cost and total cost

export function getOrderSummaryValues() {
  let productsCost = 0;
  let shippingCost = 0;

  cart.cartProducts.forEach((cartProduct) => {
    products.forEach((product) => {
      if (product.id === cartProduct.cartProductId) {
        productsCost += (product.priceCents*cartProduct.quantity);

        const shippingOption = getShippingOption(cartProduct.shippingId);
        shippingCost += shippingOption.priceCents;
      }
    })
  });

  let totalCost = productsCost + shippingCost;

  return [productsCost, shippingCost, totalCost];
}

// code to load order summary

export function loadOrderSummary() {
  let productsCost = getOrderSummaryValues()[0];
  let shippingCost = getOrderSummaryValues()[1];
  let totalCost = getOrderSummaryValues()[2];

  let orderSummaryHTML = `
  <div class="products-cost-container">
    <p class="order-summary-text">Subtotal (${cart.cartQuantity} itens):</p>
    <p class="order-summary-text">R$ ${formatCurrency(productsCost)}</p>
  </div>

  <div class="total-shipping-container">
    <p class="order-summary-text">Frete:</p>
    <p class="order-summary-text">R$ ${formatCurrency(shippingCost)}</p>
  </div>

  <hr class="horizontal-line">

  <div class="total-cost-container">
    <p class="order-summary-text">Valor total:</p>
    <p class="order-summary-text">R$ ${formatCurrency(totalCost)}</p>
  </div>

  <div class="order-summary-buttons">
    <a class="btn btn-primary js-finish-order-button finish-order-button" href="login.html">Finalizar</a>
    <a class="js-games-page-button btn btn-secondary choose-more-button" href="games.html">Escolher mais produtos</a>
  </div>
  `;

  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;

  
  // code to make finish your order button interactive

  initFinishYourOrderButton();
}
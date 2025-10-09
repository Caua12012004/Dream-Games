import { yourOrders } from "../data/yourOrders.js";
import { formatCurrency} from "./utils.js";
import { products } from "../data/products.js";
import { getOrderSummaryValues } from "./orderSummary.js";
import { cart, getProducQuantity, resetCart, initBuyAgainButton } from "./cart.js";
import { getYourOrdersShippingDate } from "./shippingOptions.js";

// code to change dayjs language to portuguese 

dayjs.locale('pt');

// code to get your order's products HTML

function getYourOrdersProductsHTML(order) {
  let yourOrdersProductsHTML = '';

  order.orderProducts.forEach((orderProduct) => {
    products.forEach((product) => {
      if (product.id === orderProduct.orderProductId) {
        yourOrdersProductsHTML += `
          <div class="yo-product">
            <div class="yo-image-info">
              <img class="yo-image" src="${product.image}" alt="${product.name} duel image">
              <div class="yo-name-date-quantity">
                <p class="yo-text yo-text-bd">${product.name} Duel</p>
                <p class="yo-text">Data de entrega: ${orderProduct.orderProductDeliveryDate}</p>
                <p class="yo-text">Quantidade: ${orderProduct.orderProductQuantity}</p>
                <a class="js-buy-again-button btn buy-again-button" href="checkout.html" data-product-id="${product.id}"><img src="images/svgs/buy-again.svg" alt="buy again svg"><span class="buy-again-button-text">Comprar novamente</span></a>
              </div>
            </div>
            <a class="btn btn-secondary track-package-btn" href="tracking.html?orderId=${order.orderId}&productId=${product.id}">Rastrear Pedido</a>
          </div>
        `
      }
    })
  })

  return yourOrdersProductsHTML;
}

// code to load your orders 

export function loadYourOrders() {
  let yourOrdersHTML = '<p class="your-orders-title">Seus Pedidos</p>';

  yourOrders.forEach((order) => {
    yourOrdersHTML += `
      <div class="js-your-orders-container your-orders-container"> 
        <div class="your-order-summary">
          <div class="order-date-container">
            <p class="yo-text yo-text-bd">Data do pedido:</p>
            <p class="yo-text">${order.orderDate}</p>
          </div>

          <div class="order-cost-container">
            <p class="yo-text yo-text-bd">Total:</p>
            <p class="yo-text">R$ ${formatCurrency(order.orderPriceCents)}</p>
          </div>

          <div class="order-id-container">
            <p class="yo-text yo-text-bd">ID do pedido:</p>
            <p class="yo-text">${order.orderId}</p>
          </div>
        </div>

        <div class="yo-products-container">
          ${getYourOrdersProductsHTML(order)}
        </div>
      </div>
    `
  })

  document.querySelector('.js-your-orders-main-container').innerHTML = yourOrdersHTML;

  // code to make buy again button interactive 
  
  initBuyAgainButton();
}

// code to save your orders in local storage

export function saveYourOrdersToStorage() {
  localStorage.setItem('yourOrders', JSON.stringify(yourOrders));
}

// code to finish your order 

export function placeYourOrder (
  orderDate,
  orderYear,
  orderPriceCents, 
  orderId, 
  orderProducts
) {

  const newOrder = {
    orderDate: orderDate,
    orderYear: orderYear,
    orderPriceCents: orderPriceCents,
    orderId: orderId,
    orderProducts: orderProducts
  }

  yourOrders.unshift(newOrder);

  saveYourOrdersToStorage();
}

// code to make finish your order button interactive

export function initFinishYourOrderButton() {
  document.querySelector('.js-finish-order-button').addEventListener('click', (event) => {
    // event.preventDefault();
    const orderDate = dayjs().format(
            'D [de] MMMM'
          );

    const orderYear = dayjs().year();

    const orderPriceCents = getOrderSummaryValues()[2];

    const orderId = crypto.randomUUID(); 

    const orderProducts = []

    cart.cartProducts.forEach((cartProduct) => {
      orderProducts.push(
        {
        orderProductId: cartProduct.cartProductId,
        orderProductDeliveryDate: getYourOrdersShippingDate(cartProduct.shippingId), 
        orderProductQuantity:  getProducQuantity(cartProduct.cartProductId)
        })
    })

    placeYourOrder(
      orderDate, 
      orderYear,
      orderPriceCents,
      orderId, 
      orderProducts
    )

    resetCart();
  })
}

// code to get order  

export function getOrder(orderId) {

  let returnOrder = 0;

  yourOrders.forEach((order) => {
    if (order.orderId === orderId) {
      returnOrder = order
    };
  })

  return returnOrder;
}

// code to get order product 

export function getOrderProduct(orderId, productId) {

  let returnOrderProduct = 0;

  yourOrders.forEach((order) => {
    if (order.orderId === orderId) {
      order.orderProducts.forEach((orderProduct) => {
        if (orderProduct.orderProductId === productId) returnOrderProduct = orderProduct;
      })
    };
  })

  return returnOrderProduct;
}
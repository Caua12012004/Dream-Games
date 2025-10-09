import { cart, saveCartToStorage } from "./cart.js"
import { loadOrderSummary } from "./orderSummary.js";
import { getCartProduct } from "./cart.js";
import { formatCurrency } from "./utils.js";

export const shippingOptions = [{
  shippingOptionId: '1',
  shippingDays: 7,
  priceCents: 0
}, {
  shippingOptionId: '2',
  shippingDays: 5,
  priceCents: 1000
}, {
  shippingOptionId: '3',
  shippingDays: 3,
  priceCents: 1500
}]

// code to get shipping option

export function getShippingOption(shippingId) {

  let returnShippingOption = '';

  shippingOptions.forEach((shippingOption) => {
    if (shippingOption.shippingOptionId === shippingId) returnShippingOption = shippingOption;
  })

  return returnShippingOption;
}

// code to update shipping option of a cart product

function updateShippingOption(cartProductId, updatedShippingOptionId) {
  cart.cartProducts.forEach((cartProduct) => {
    if (cartProduct.cartProductId === cartProductId) {
      cartProduct.shippingId = updatedShippingOptionId;
    }
  });
  saveCartToStorage();
  loadOrderSummary();
}

// code to get shipping date title

export function getShippingDate(shippingId) {

  const todaysDate = dayjs();
  let dateString = '';

  shippingOptions.forEach((shippingOption) => {
    if (shippingOption.shippingOptionId === shippingId) {
      const deliveryDate = todaysDate.add(
        shippingOption.shippingDays, 'days'
      );

      dateString = deliveryDate.format(
          'dddd, D [de] MMMM'
        );
    }
  })

  return dateString;
}

// code to load shipping date in delivery date title 

function updateShippingDateTitle(cartProductId, shippingId) {
  document.querySelectorAll('.js-delivery-date-title').forEach((deliveryDateTitle) => {
    if (deliveryDateTitle.dataset.productId === cartProductId) {
      deliveryDateTitle.innerHTML = 'Data de entrega: ' + getShippingDate(shippingId);
    }
  })
}

// code to make shipping options radio inputs interactive 

export function initShippingInputs() {
  document.querySelectorAll('.js-shipping-option').forEach((shippingOption) => {
    shippingOption.addEventListener('click', () => {
      // console.log(cart.cartProducts);
      // console.log(shippingOption.dataset.shippingOptionId);
      // console.log(shippingOption.dataset.productId);

      updateShippingOption(
        shippingOption.dataset.productId,
        shippingOption.dataset.shippingOptionId
      );

      updateShippingDateTitle(
        shippingOption.dataset.productId,
        shippingOption.dataset.shippingOptionId
      );

    })
  })
}

// code to load shipping options in cart products 

export function loadShippingOptions(productId) {

  const cartProduct = getCartProduct(productId);

  let shippingOptionsHTML = '';

  shippingOptions.forEach((shippingOption) => {

    const shippingCost = formatCurrency(shippingOption.priceCents);

    const shippingOptionId = shippingOption.shippingOptionId;

    const todaysDate = dayjs();

    const deliveryDate = todaysDate.add(
      shippingOption.shippingDays, 'days'
    );

    const dateString = deliveryDate.format(
        'dddd, D [de] MMMM'
      );

    shippingOptionsHTML += `
      <div class="delivery-option">
        <input class="js-shipping-option"  type="radio" name="shipping-${productId}" id="${shippingOptionId}" data-shipping-option-id="${shippingOptionId}" data-product-id="${productId}" ${shippingOptionId === cartProduct.shippingId ? 'checked' : ''}>
        <div class="shipping-date-cost">
          <label for="${shippingOptionId}" class="shipping-date">${dateString}</label>
          <span class="shipping-cost">Frete: R$ ${shippingCost === 0 ? 'GRÁTIS' : shippingCost}</span>
        </div>
      </div>
      <br>
    `;
  })

  return shippingOptionsHTML;
}


// code to get shipping date that foes into the your orders page 
// code to get shipping date title

export function getYourOrdersShippingDate(shippingId) {

  const todaysDate = dayjs();
  let dateString = '';

  shippingOptions.forEach((shippingOption) => {
    if (shippingOption.shippingOptionId === shippingId) {
      const deliveryDate = todaysDate.add(
        shippingOption.shippingDays, 'days'
      );

      dateString = deliveryDate.format(
          'D [de] MMMM'
        );
    }
  })

  return dateString;
}
import { products } from "../data/products.js"
import { handleMessageAndFooter, formatCurrency } from "./utils.js";
import { loadOrderSummary } from "./orderSummary.js";
import { getShippingDate, loadShippingOptions, initShippingInputs } from "./shippingOptions.js";
import { initFinishYourOrderButton } from "./yourOrderScript.js";

export let cart = JSON.parse(localStorage.getItem('cart')) ||
{
  cartProducts: [
    {
      cartProductId: "119e0b11-4d3f-4e0c-9d62-7f284d3101b4", 
      shippingId: '1',
      quantity: 1
    },
    {
      cartProductId:  "2d9a3b6d-8b0c-4e89-8b2b-9c7a2b9d3e5f", 
      shippingId: '1',
      quantity: 1
    }
  ],
  cartQuantity: 2
}

// Code to save cart to local storage

export function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//console.log(`console loggins: ${typeof cart.cartProducts[0].quantity}`);

// code to check if a product is in the cart 

function productInCart(productId) {
  let result = false;

  cart.cartProducts.forEach((cartProduct) => {
    if (productId === cartProduct.cartProductId) result = true;
  })

  return result;
}

// code to increase product quantity in cart 

function increaseProductQuantity(productId) {
  cart.cartProducts.forEach((cartProduct) => {
    if (cartProduct.cartProductId === productId) {
      cartProduct.quantity++;
      cart.cartQuantity++;
      loadCartQuantity();
    }
  })

  saveCartToStorage();
}

// code to decrease product quantity in cart 

function decreaseProductQuantity(productId) {
  cart.cartProducts.forEach((cartProduct) => {
    if (cartProduct.cartProductId === productId) {
      cartProduct.quantity--;
      cart.cartQuantity--;
      loadCartQuantity();
    }
  })

  saveCartToStorage();
}

// Code to add to cart 

export function addToCart(productID) {

    console.log(`add to cart called`);
    products.forEach((product) => {

      if (product.id === productID && productInCart(productID)) {
        // console.log(`console logging condition passed`);
        increaseProductQuantity(productID);
      }
      else if (product.id === productID && productInCart(productID) === false) {
        cart.cartProducts.push(
          {
            cartProductId:  productID, 
            shippingId: '1',
            quantity: 1
          });
        cart.cartQuantity++;
      }
    })

    saveCartToStorage();

    loadCartQuantity();
}

// Code to add to cart 

export function removeFromCart(productID) {

    const newCartProducts = [];

    cart.cartProducts.forEach((cartProduct) => {
      if (cartProduct.cartProductId !== productID) {
        newCartProducts.push(cartProduct);
      } else if (cartProduct.cartProductId === productID) {
        cart.cartQuantity -= cartProduct.quantity;
      }
    });

    cart.cartProducts = newCartProducts;

    saveCartToStorage();

    loadOrderSummary();

    loadCartQuantity();
}


// Code to get and show cart quantity 

export function loadCartQuantity() {
  let cartQuantity = cart.cartQuantity;
  console.log(cartQuantity)
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// Code to make add to cart button interactive 

export function initAddToCartButton() {
  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      console.log("adding to cart");
      addToCart(productId);
    })
  })
}

// Code to make remove from cart button interactive 

export function initRemoveFromCartButton() {
  document.querySelectorAll('.js-remove-from-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      loadCart();
      handleMessageAndFooter();
      // window.location.href = 'checkout.html';
    })
  })
}

// code to get product from cart 

export function getCartProduct(cartProductId) {

  let returnCartProduct = 0;
  cart.cartProducts.forEach((cartProduct) => {
    if (cartProduct.cartProductId === cartProductId) returnCartProduct = cartProduct;
  })

  return returnCartProduct;
}

// code to load cart products without shipping options

export function loadCart() {

  console.log('function passed');
  let cartProductsHTML = '';

  // console.log(cart.cartProducts);

  cart.cartProducts.forEach((cartProduct) => {
    products.forEach((product) => {
      if (product.id === cartProduct.cartProductId) {
        cartProductsHTML += `
        <div class="product-card">
          <div class="delivery-title">
            <p class="js-delivery-date-title delivery-date-title" data-product-id="${product.id}">Data de entrega: ${getShippingDate(cartProduct.shippingId)}</p>
            <button class="js-remove-from-cart-button remove-button" data-product-id="${product.id}"><img src="images/svgs/trash.svg" alt="trash can"></button>
          </div>

          <div class="product-info">
            <div class="cart-image-container">
              <img class="game-image cart-game-image" src="${product.image}" alt="${product.name} image">
            </div>

            <div class="cart-name-price-quantity">
              <p class="game-name cart-game-name">${product.name}</p>
              <p class="cart-product-price">R$ ${formatCurrency(product.priceCents)}</p>
              <div class="product-quantity-container">
                <p class="product-quantity-text">Quantidade: 
                  <br>
                  <div class="product-quantity-secondary-container">
                    <button class="js-subtract-product-button product-quantity-button" data-product-id=${product.id}><img src="images/svgs/subtract.svg" alt="subtract button">
                      </button>
                    <span class="js-product-quantity product-quantity" data-product-id=${product.id}>${cartProduct.quantity}</span>
                    <button class="js-add-product-button product-quantity-button" data-product-id=${product.id}><img src="images/svgs/add.svg" alt="add button"></button>
                  </div>
                </p>
              </div>
            </div>

            <div class="js-shipping-container shipping-container">
              ${loadShippingOptions(product.id)}
            </div> 
              
            </div>
          </div>
        </div>
        `;
      }
    })
  });

  if (cart.cartQuantity != 0) document.querySelector('.js-cart').innerHTML = cartProductsHTML;

  // code to make shipping options radio inputs interactive 

  if (cart.cartQuantity != 0) initShippingInputs();

  // Code to make remove from cart button interactive 

  if (cart.cartQuantity != 0) initRemoveFromCartButton();

  // code to load order summary

  if (cart.cartQuantity != 0) loadOrderSummary();

  // code to make add and subtract products button in the cart interactive 

  initAddAndSubtractButton();
}

/* ------ CODE BLOCK TO MAKE ADD AND SUBTRACT PRODUCTS BUTTON INTERACTIVE------ */

// code to get the product quantity of a product 

export function getProducQuantity(productId) {
  let productQuantity = 0;

  cart.cartProducts.forEach((cartProduct) => {
    if (cartProduct.cartProductId === productId) productQuantity = cartProduct.quantity;
  })

  return productQuantity;
}

// code to update the html where the quantity of a specific product is shown

function updateProductQuantityHTML(productId) {
  document.querySelectorAll('.js-product-quantity').forEach((productQuantityHTML) => {
    const productIdHTML = productQuantityHTML.dataset.productId;

    if (productId === productIdHTML) {
      productQuantityHTML.innerHTML = getProducQuantity(productId);
    }
  })
}


// code to make add and subtract products button in the cart interactive 

export function initAddAndSubtractButton() {

  // code for add button 

  document.querySelectorAll('.js-add-product-button').forEach((addProductButton) => {
    addProductButton.addEventListener('click', () => {
      const productId = addProductButton.dataset.productId;
      increaseProductQuantity(productId);
      updateProductQuantityHTML(productId);
      loadOrderSummary();
    })
  })

  // code for subtract button 

  document.querySelectorAll('.js-subtract-product-button').forEach((addProductButton) => {
    addProductButton.addEventListener('click', () => {
      const productId = addProductButton.dataset.productId;
      decreaseProductQuantity(productId);
      updateProductQuantityHTML(productId);
      loadOrderSummary();

      // code to handle product having quantity of 0 

      if (getProducQuantity(productId) === 0) {
        removeFromCart(productId);
        loadCartQuantity();
        loadCart();
      }
      
      handleMessageAndFooter();
    })
  })
}


// function to reset cart 

export function resetCart() {
  cart.cartProducts = [];
  cart.cartQuantity = 0;

  saveCartToStorage();
  console.log(cart);
}


// code to make buy again button interactive 

export function initBuyAgainButton() {
  document.querySelectorAll('.js-buy-again-button').forEach((buyAgainButton) => {
    buyAgainButton.addEventListener('click', () => {
      const productId = buyAgainButton.dataset.productId;
      addToCart(productId);
    })
  })
}
export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: 1,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: 2,
    },
  ];
  
  export function addToCart(productId, quantity) {
    let matchingItem = cart.find((cartItem) => productId === cartItem.productId);
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId,
        quantity: quantity,
        deliveryOptionId: 1,
      });
    }
    saveCart();
  }
  
  export function removeFromCart(productId) {
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
    saveCart();
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  export function updateDeliveryOption(productId, deliveryOptionId) {
    let cartItem = cart.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.deliveryOptionId = parseInt(deliveryOptionId, 10);
      saveCart();
    }
  }
  
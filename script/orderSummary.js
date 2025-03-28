import { cart, removeFromCart, updateDeliveryOption} from "../data/cart.js";
import { deliveryOptions, getDeliveryOptions } from "../data/deliveryOptions.js";
import {products, renderproducts } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderCartHTML() {
  let cartHTML = "";
  cart.forEach((cartItem) => {
      if (!cartItem) {
          console.warn("Undefined cartItem found!", cart);
          return;
    };
      
      const productId = cartItem.productId;
      const matchingItem = renderproducts(productId);
    

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOptions(deliveryOptionId);
    
    if (!deliveryOption) {
      console.log("No matching deliveryOption found for ID:", deliveryOptionId)
      return;
    };
    const day = dayjs();
    const deliveryDate = day.add(deliveryOption.deliveryDate, "days");
    const dateFormat = deliveryDate.format("dddd MMMM D");

    cartHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: ${dateFormat}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingItem.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-price">
                $${(matchingItem.priceCents / 100).toFixed(2)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label"
                    id="js-quantity-${matchingItem.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link"
                data-product-id="${matchingItem.id}">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id="${matchingItem.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${renderDeliveryOptionHTML(matchingItem.id, cartItem)}
            </div>
          </div>
        </div>`;
  });

  function renderDeliveryOptionHTML(matchingItem, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const day = dayjs();
      const deliveryDate = day.add(deliveryOption.deliveryDate, "days");
      const dateFormat = deliveryDate.format("dddd MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${deliveryOption.priceCents / 100} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option"
        data-product-id="${matchingItem}"
        data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateFormat}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`;
    });
    return html;
  }
  
  document.querySelector(".js-order-summary").innerHTML = cartHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document
        .querySelector(
          `
          .js-cart-item-container-${productId}`
        )
        .remove();
        renderPaymentSummary();
    });
  });
  
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      handleEditClick(event);
    });
  });

  function handleEditClick(event) {
    const productId = event.target.dataset.productId;
    const quantityEl = document.querySelector(`#js-quantity-${productId}`);
    const originalQuantity = quantityEl.textContent.trim();
  
    // Add input and save button
    quantityEl.innerHTML = `
      <input type="number" value="${originalQuantity}" id="input-${productId}" min="1">
      <button class="save-btn" data-product-id="${productId}">Save</button>
    `;
  
    // Save the new quantity
    document.querySelector(`.save-btn[data-product-id="${productId}"]`)
      .addEventListener("click", () => {
      const inputField = document.querySelector(`#input-${productId}`);
      const newQuantity = inputField.value;
  
      if (newQuantity > 0) {
        const cartItem = cart.find((item) => item.productId === productId);
        if (cartItem) {
          cartItem.quantity = parseInt(newQuantity);
        }
        
        renderCartHTML(); 
        renderPaymentSummary();
      }
    });
    document.querySelector(`#input-${productId}`).addEventListener("blur", (event) => {
      const input = event.target;
      input.replaceWith(originalQuantity);
    });
  };   

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      if (!option.dataset.productId || !option.dataset.deliveryOptionId) {
        console.error("Missing dataset attribute:", option.dataset);
        return;
      }
      const productId = option.dataset.productId;
      const deliveryOptionId = option.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);

      document.querySelectorAll(`[name="delivery-option-${productId}"]`)
        .forEach((radio) => {
          const parentDiv = radio.closest(".js-delivery-option");
          const isSelected = parentDiv.dataset.deliveryOptionId === deliveryOptionId;
          radio.checked = isSelected;
        });

        // Manually update the UI delivery date display
      const deliveryOption = getDeliveryOptions(Number(deliveryOptionId));
      const newDeliveryDate = dayjs().add(deliveryOption.deliveryDate, "days")
            .format("dddd MMMM D");
      document.querySelector(`.js-cart-item-container-${productId} .delivery-date`)
            .textContent = `Delivery date: ${newDeliveryDate}`;


      renderPaymentSummary();
    });
  });
};


import { cart } from "../data/cart.js";
import { renderproducts } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getDeliveryOptions } from "../data/deliveryOptions.js";


console.log("Script is running");

function renderOrders() {
    let ordersHTML = "";

    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        
        const productId = cartItem.productId;
        const matchingItem = renderproducts(productId);
        cartQuantity += cartItem.quantity

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOptions(deliveryOptionId);
        
        if (!deliveryOption) {
            console.log("No matching deliveryOption found for ID:", deliveryOptionId)
            return;
        };
        const day = dayjs();
        const deliveryDate = day.add(deliveryOption.deliveryDate, "days");
        const currenDate = day.format("MMMM D");
        const dateFormat = deliveryDate.format("MMMM D");
    
        // calculate order total for each cart
        const productInfo = renderproducts(cartItem.productId);
        const productPriceCents = productInfo.priceCents * cartItem.quantity;

        const deliveryOptionInfo = getDeliveryOptions(cartItem.deliveryOptionId);
        const ShippingPriceCents = deliveryOptionInfo.priceCents;

        const totalBeforeTax = productPriceCents + ShippingPriceCents;
        const estTax = totalBeforeTax * 0.1;
        const totalOrders = totalBeforeTax + estTax;

        ordersHTML += `
            <div class="order-container">
            
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${currenDate}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${(totalOrders / 100).toFixed(2)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${matchingItem.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    <div class="product-image-container">
                    <img src="${matchingItem.image}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        ${matchingItem.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${dateFormat}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${cartItem.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>

                </div>
            </div>`;
 
    });
    
    document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

};
renderOrders();
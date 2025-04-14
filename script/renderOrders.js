import { placeOrders } from "./orders.js";

let myOrders = [];

function renderOrders() {
    let ordersHTML = "";

    myOrders = placeOrders();
    myOrders.forEach((order) => {



        ordersHTML += `
            <div class="order-container">
            
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${order.dateOrdered}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${order.totalOrders}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.orderId}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    <div class="product-image-container">
                    <img src="${order.orderImage}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        ${order.orderName}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${order.deliveryDate}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${order.ordersQuantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                    <a href="tracking.html?orderId=${order.orderId}">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>

                </div>
            </div>`;

        })
    document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
}
renderOrders();
        
document.querySelector(".js-cart-quantity").innerHTML = myOrders.length;
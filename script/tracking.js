import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { placeOrders, findMatchingOrders } from "./orders.js";

let myOrders = [];
function renderTrackingHTML() {
  let trackingHTML = "";

  const url = new URL(window.location.href);
  const saveOrderId = url.searchParams.get("orderId");
  myOrders = placeOrders();
  const order = findMatchingOrders(saveOrderId);

  const deliveryDate = dayjs(`${order.deliveryDate} 
    ${new Date().getFullYear()}`, "MMMM D YYYY");
  const dateFormat = deliveryDate.format("dddd, MMMM YYYY");


  trackingHTML += `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dateFormat}
        </div>

        <div class="product-info">
          ${order.orderName}
        </div>

        <div class="product-info">
          Quantity: ${order.ordersQuantity}
        </div>

        <img class="product-image" src="${order.orderImage}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;

  document.querySelector(".js-orders-tracking").innerHTML = trackingHTML;
}
renderTrackingHTML();

document.querySelector(".js-cart-quantity").innerHTML = myOrders.length;
import { cart } from "../data/cart.js";
import { getDeliveryOptions } from "../data/deliveryOptions.js";
import { renderproducts } from "../data/products.js";


export function renderPaymentSummary() {
    let productPriceCents = 0;
    let ShippingPriceCents = 0;
    let cartQuantity = 0;


    let paymentSummaryHTML = "";
    cart.forEach((cartItem) => {
        const productInfo = renderproducts(cartItem.productId);
        productPriceCents += productInfo.priceCents * cartItem.quantity;
        cartQuantity += cartItem.quantity;

        const deliveryOptionInfo = getDeliveryOptions(cartItem.deliveryOptionId);
        ShippingPriceCents += deliveryOptionInfo.priceCents;


    });
    
    const totalBeforeTax = productPriceCents + ShippingPriceCents;
    const estTax = totalBeforeTax * 0.1;
    const totalOrders = totalBeforeTax + estTax;
        
    paymentSummaryHTML += `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${productPriceCents / 100}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${ShippingPriceCents / 100}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax / 100}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(estTax / 100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalOrders / 100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary js-button-primary">
            Place your order
        </button>`;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    
    document.querySelectorAll(".js-button-primary").forEach((jsButton) => {
        console.log(jsButton);
        jsButton.addEventListener("click", () => {
            console.log("clicked");
            window.location.href =
                "http://127.0.0.1:5501/Amazon%20Project/javascript-amazon-project/orders.html";
        })
    });

    document.querySelector(".js-checkout-header a")
        .textContent = `${cartQuantity} items`;
};

import { cart } from "../data/cart.js";
import { renderproducts } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getDeliveryOptions } from "../data/deliveryOptions.js";


console.log("Script is running");

export function findMatchingOrders(saveOrderId) {
    const myOrders = placeOrders();
    let matchingOrder = myOrders.find((order) =>
        order.orderId === saveOrderId
    )
    return matchingOrder
};

export function placeOrders() {
    const orders = [];

    
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

        

        orders.push({
            dateOrdered: currenDate,
            deliveryDate: dateFormat,
            totalOrders: (totalOrders / 100).toFixed(2),
            orderId: matchingItem.id,
            orderImage: matchingItem.image,
            orderName: matchingItem.name,
            ordersQuantity: cartItem.quantity
    
        })
     
    });
    return orders;
    
};

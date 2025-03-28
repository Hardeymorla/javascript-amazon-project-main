import { addToCart, cart } from "../data/cart.js";
import { products } from "../data/products.js";

function displayProducts() {
    
    let productsHTML = '';
    products.forEach((product) => {
        productsHTML += `
        <div class="product-container" data-product-id="${product.id}">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              87
            </div>
          </div>

          <div class="product-price">
            $${(product.rating.count / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select> 
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`;
    })
    document.querySelector('.js-products-grid').innerHTML = productsHTML;
}
displayProducts();

document.querySelectorAll('.add-to-cart-button')
    .forEach((button) => {
      button.addEventListener('click', (event) => {
        const productContainer = event.target.closest(".product-container");
        const productId = productContainer.dataset.productId;
        const quantity = parseInt(productContainer.querySelector("select").value, 10);
          
        addToCart(productId, quantity);
        
        let cartQuantity = 0;
        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity;
      });

    });
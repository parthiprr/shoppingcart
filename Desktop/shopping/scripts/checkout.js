import { cart,removeFromCart,calculateCartQuantity,updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML='';

cart.forEach((cartItem)=>{                   //Duplicating or normalizing of our data
  const productId=cartItem.productId;
  let matchingProduct;

  products.forEach((product)=>{
      if(product.id===productId)
      {
        matchingProduct=product;
      }
  });
  cartSummaryHTML +=
  `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link"
                  data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                
                <span class="save-quantity-link link-primary js-save-link"
                  data-product-id="${matchingProduct.id}">
                  Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
               </div>
               <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
  
document.querySelector('.js-order-summary') 
.innerHTML=cartSummaryHTML;

document.querySelectorAll('.js-delete-link') //selecting all delete links
.forEach((link)=>{
   link.addEventListener('click',()=>     //here choose whcih event listener we delected
   {
    const productId=link.dataset.productId;       //we are getting the productid using data attribute
    removeFromCart(productId);                     //takes the id to delete to cart
    const container=document.querySelector
    (`.js-cart-item-container-${productId}`);     //use the deleet product id to delete
    container.remove();
    updateCartQuantity();

   })
});

});

function updateCartQuantity(){
  const cartQuantity=calculateCartQuantity();
document.querySelector('.js-return-to-home-link')
.innerHTML= `${cartQuantity} items`;

}
updateCartQuantity();

document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`             //see the css in checkout.css ...line 218 to 228
      );                                                  //here used  .js-cart-item-container-${productId}`
      container.classList.add('is-editing-quantity');     // because through this we can give to both
    });
  });

  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
       container.classList.remove('is-editing-quantity');


      const quantityInput = document.querySelector(      //code to take the value from input
                                                              
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);    //should be converted to a number
      updateQuantity(productId, newQuantity);     
      
      const qualityLabel=document.querySelector(`
      .js-quality-label-${productId}`);
      qualityLabel.innerHTML=newQuantity;
      updateQuantity();
      
    });
  });


  
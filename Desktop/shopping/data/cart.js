export let cart =JSON.parse(localStorage.getItem('cart'));
if (!cart)
{
  [
    {
      productId:'c43638ce-6aa0-4c05-b27f-e1d09pb678c6',
      quantity:2
    },
    {
      productId:'e43638ce-6aa0-4c05-b27f-g9d07eb678c6',
      quantity:4
    }
  ];
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    const quantitySelector=document.querySelector
     (`.js-quantity-selector-${productId}`);
     

     const quantity=Number(quantitySelector.value);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity
      });
    }
    saveToStorage();

}

export function removeFromCart(productId){
   const newCart=[];

   cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
       newCart.push(cartItem);
    }
   });
   cart=newCart;
   saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem)=>
  {
    cartQuantity+=cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId,newQuantity)
{
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId)
    {
      matchingItem=cartItem;
    }
  });
  matchingItem.quantity=newQuantity;
  saveToStorage();

};
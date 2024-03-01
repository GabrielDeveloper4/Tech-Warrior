// Variables globales
const cartLink = document.getElementById('cart-link');
const cartOverlay = document.querySelector('.overlay');
const cart = document.querySelector('.cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const productItems = document.querySelectorAll('.product-item');

// Event listeners
cartLink.addEventListener('click', showCart);
cartOverlay.addEventListener('click', hideCart);
clearCartBtn.addEventListener('click', clearCart);
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', addToCart);
});
searchButton.addEventListener('click', searchProducts);

// Carrito de compras (inicialmente vacío)
let cartProducts = [];

// Función para mostrar el carrito
function showCart() {
  cartOverlay.style.display = 'block';
  cart.style.display = 'block';
}

// Función para ocultar el carrito
function hideCart() {
  cartOverlay.style.display = 'none';
  cart.style.display = 'none';
}

// Función para agregar un producto al carrito
function addToCart() {
  const productItem = this.closest('.product-item');
  const productName = productItem.querySelector('h3').textContent;
  const productPriceText = productItem.querySelector('p').textContent;
  const productPrice = parseFloat(productPriceText.match(/[\d.]+/)[0]);
  const product = { name: productName, price: productPrice };
  cartProducts.push(product);
  renderCart();
}

// Función para eliminar un producto del carrito
function removeFromCart() {
  const productName = this.dataset.name;
  cartProducts = cartProducts.filter(product => product.name !== productName);
  renderCart();
}

// Función para vaciar el carrito
function clearCart() {
  cartProducts = [];
  renderCart();
}

// Función para actualizar el carrito y el total
function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cartProducts.forEach(product => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <span>${product.name}</span>
      <span>S/${product.price.toFixed(2)}</span>
      <button class="btn btn-remove" data-name="${product.name}">Eliminar</button>
    `;
    cartItems.appendChild(cartItem);
    total += product.price;
    const removeBtn = cartItem.querySelector('.btn-remove');
    removeBtn.addEventListener('click', removeFromCart);
  });
  cartTotal.textContent = `Total: S/${total.toFixed(2)}`;
}

// Función para buscar productos
function searchProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  productItems.forEach(productItem => {
    const productName = productItem.querySelector('h3').textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      productItem.style.display = 'block';
    } else {
      productItem.style.display = 'none';
    }
  });
}

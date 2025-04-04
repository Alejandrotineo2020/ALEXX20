// Obtener elementos
const addToCartBtn = document.querySelector('.btn-add-to-cart');
const clearCartBtn = document.getElementById('clear-cart');
const cartItems = document.getElementById('cart-items');
const quantityInput = document.querySelector('.input-quantity');
const colorSelect = document.getElementById('colour');
const sizeSelect = document.getElementById('size');
const checkoutForm = document.getElementById('checkout-form');
const paymentMethodSelect = document.getElementById('payment-method');
const locationTextArea = document.getElementById('location');
const completePurchaseBtn = document.getElementById('complete-purchase');

// Función para mostrar el carrito
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.quantity}x Zapato - Color: ${item.color}, Talla: ${item.size}`;
        cartItems.appendChild(li);
    });
}

// Función para añadir al carrito
function addToCart() {
    const quantity = parseInt(quantityInput.value);
    const color = colorSelect.value;
    const size = sizeSelect.value;

    if (!color || !size) {
        alert('Selecciona color y talla');
        return;
    }

    const item = { quantity, color, size };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Función para vaciar carrito
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

// Función para procesar la compra
function processPurchase(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const paymentMethod = paymentMethodSelect.value;
    const location = locationTextArea.value;

    // Obtener el carrito actual
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Tu carrito está vacío. No puedes realizar la compra.");
        return;
    }

    // Mostrar los detalles de la compra
    const purchaseDetails = {
        items: cart,
        paymentMethod: paymentMethod,
        location: location,
        date: new Date().toLocaleString(),
    };

    // Guardar la compra en el localStorage o en una base de datos (dependiendo de tu implementación)
    localStorage.setItem('lastPurchase', JSON.stringify(purchaseDetails));

    // Limpiar el carrito después de la compra
    localStorage.removeItem('cart');
    renderCart();

    // Mostrar un mensaje de éxito
    alert(`Compra realizada con éxito. Método de pago: ${paymentMethod}. Dirección: ${location}`);
}

// Inicializar el formulario de compra
checkoutForm.addEventListener('submit', processPurchase);

// Eventos
addToCartBtn.addEventListener('click', addToCart);
clearCartBtn.addEventListener('click', clearCart);

// Render inicial
document.addEventListener('DOMContentLoaded', renderCart);

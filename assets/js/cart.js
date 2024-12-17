// Функция для отображения товаров в корзине
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  cartItemsContainer.innerHTML = ''; 
  if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>';
      return;
  }

  let totalPrice = 0;

  cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
          <h2>${item.name}</h2>
          <p>Ціна: ${item.price} руб.</p>
          <p>Кількість: ${item.quantity}</p>
          <button class="remove-from-cart" data-id="${item.id}">Удалить</button>
      `;

      cartItemsContainer.appendChild(itemElement);

      totalPrice += item.price * item.quantity;
  });

  document.getElementById('total-price').textContent = totalPrice;
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
}

// Обработчик для кнопок удаления товара
document.getElementById('cart-items').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-from-cart')) {
      const productId = e.target.getAttribute('data-id');
      removeFromCart(productId);
  }
});

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', displayCartItems);


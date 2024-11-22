"use strict";

// Функция для отображения товаров в корзине
function displayCartItems() {
  var cartItemsContainer = document.getElementById('cart-items');
  var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = ''; // Очистка содержимого перед рендером

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Корзина пуста.</p>';
    return;
  }

  var totalPrice = 0;
  cart.forEach(function (item) {
    // Создаем HTML для каждого товара
    var itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = "\n          <h2>".concat(item.name, "</h2>\n          <p>\u0426\u0456\u043D\u0430: ").concat(item.price, " \u0440\u0443\u0431.</p>\n          <p>\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C: ").concat(item.quantity, "</p>\n          <button class=\"remove-from-cart\" data-id=\"").concat(item.id, "\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n      "); // Добавляем товар в контейнер корзины

    cartItemsContainer.appendChild(itemElement); // Рассчитываем итоговую сумму

    totalPrice += item.price * item.quantity;
  }); // Отображаем итоговую сумму

  document.getElementById('total-price').textContent = totalPrice;
} // Функция для удаления товара из корзины


function removeFromCart(productId) {
  var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });
  sessionStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
} // Обработчик для кнопок удаления товара


document.getElementById('cart-items').addEventListener('click', function (e) {
  if (e.target.classList.contains('remove-from-cart')) {
    var productId = e.target.getAttribute('data-id');
    removeFromCart(productId);
  }
}); // Инициализация корзины при загрузке страницы

document.addEventListener('DOMContentLoaded', displayCartItems);
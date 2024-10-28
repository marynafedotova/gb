"use strict";

// catalog products
var currentProductIndex = 0;
var productsPerPage = 12;
var products = [];

function displayProducts() {
  var productContainer = document.querySelector('.product-list');

  if (!productContainer) {
    console.error('Контейнер для товарів не знайдено.');
    return;
  }

  var productsToDisplay = products.slice(currentProductIndex, currentProductIndex + productsPerPage);
  productsToDisplay.forEach(function (product) {
    var productCard = "\n    <div class=\"product-card\">\n      <img src=\"".concat(product.photo.split(',')[0].trim(), "\" alt=\"").concat(product.zapchast, "\">\n      <h3>").concat(product.ID_EXT, "</h3>\n      <h3>").concat(product.zapchast, "</h3>\n      <p>").concat(product.zena, " ").concat(product.valyuta, "</p>\n      \n      <div class=\"btn-cart\"><button class=\"add-to-cart\"\n        data-id=\"").concat(product.ID_EXT, "\"\n        data-price=\"").concat(product.zena, "\"\n        data-tipe=\"").concat(product.zapchast, "\">\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E \u043A\u043E\u0448\u0438\u043A\u0430</button>\n        </div>\n      <div class=\"product_btn\">\n        <a href=\"product.html?id=").concat(product.ID_EXT, "\">\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0456\u0448\u0435</a>\n      </div>\n    </div>\n  ");
    productContainer.insertAdjacentHTML('beforeend', productCard);
  });
  currentProductIndex += productsPerPage;

  if (currentProductIndex >= products.length) {
    document.querySelector('.load-more').style.display = 'none';
  }
}

fetch('../data/data.json').then(function (response) {
  if (!response.ok) {
    throw new Error('Ошибка загрузки файла JSON');
  }

  return response.json();
}).then(function (data) {
  if (!data || !data.Sheet1) {
    throw new Error('Некорректный формат данных');
  }

  products = data.Sheet1;
  displayProducts();
  var loadMoreButton = document.querySelector('.load-more');

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', function (event) {
      event.preventDefault();
      displayProducts();
    });
  }
})["catch"](function (error) {
  return console.error('Помилка завантаження каталогу:', error);
});
var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get('id');
document.addEventListener('DOMContentLoaded', function () {
  shoppingCart.initCart();
  var openCartButton = document.getElementById('openCartBtn');

  if (openCartButton) {
    openCartButton.addEventListener('click', function () {
      if (shoppingCart.cart.length === 0) {
        toast.warning('Кошик порожній!');
        console.log('Кошик порожній!');
      } else {
        showCartModal();
        shoppingCart.updateCartDisplay();
      }
    });
  }

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart')) {
      event.preventDefault();
      var button = event.target;
      var item = {
        id: button.getAttribute('data-id'),
        price: Number(button.getAttribute('data-price')),
        tipe: button.getAttribute('data-tipe'),
        quantity: 1
      };
      shoppingCart.addItemToCart(item);
      showCartModal();
      console.log("Кнопка 'Добавить в корзину' нажата!");
      console.log("ID товара:", button.getAttribute('data-id')); // Проверяем ID

      console.log("Добавляем товар:", item); // Проверяем объект товара
    }
  });
}); //header

var header = document.querySelector('header');
window.addEventListener('scroll', function () {
  var scrollDistance = window.scrollY;
  var threshold = 30;

  if (scrollDistance > threshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}); //hamburger-menu

document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});
document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});
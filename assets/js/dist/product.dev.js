"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var productId = urlParams.get('id');

  if (productId) {
    fetch('../data/data.json').then(function (response) {
      return response.json();
    }).then(function (data) {
      var product = data.Sheet1.find(function (item) {
        return item.ID_EXT === productId;
      });

      if (product) {
        document.querySelector('.product-name').textContent = product.zapchast;
        document.querySelector('.product-markaavto').textContent = product.markaavto;
        document.querySelector('.product-dop_category').textContent = product.dop_category;
        document.querySelector('.product-pod_category').textContent = product.pod_category;
        document.querySelector('.product-typ_kuzova').textContent = product.typ_kuzova;
        document.querySelector('.product-price').textContent = product.zena + ' ' + product.valyuta;
        document.querySelector('.product-description').textContent = product.opysanye;
        document.querySelector('.product-model').textContent = product.model;
        document.querySelector('.product-god').textContent = product.god;
        document.querySelector('.product-category').textContent = product.category;
        document.querySelector('.product-toplivo').textContent = product.toplivo;
        document.querySelector('.product-originalnumber').textContent = product.originalnumber;
        var imageGallery = document.querySelector('#imageGallery');

        if (product.photo && typeof product.photo === 'string') {
          product.photo.split(',').forEach(function (photoUrl) {
            var listItem = "\n                <li data-thumb=\"".concat(photoUrl.trim(), "\" data-src=\"").concat(photoUrl.trim(), "\">\n                  <a href=\"").concat(photoUrl.trim(), "\" data-lightgallery=\"item\">\n                    <img src=\"").concat(photoUrl.trim(), "\" alt=\"").concat(product.zapchast, "\">\n                  </a>\n                </li>\n              ");
            imageGallery.innerHTML += listItem;
          });
          $('#imageGallery').lightSlider({
            gallery: true,
            item: 1,
            thumbItem: 3,
            slideMargin: 20,
            enableDrag: true,
            currentPagerPosition: 'left',
            controls: true,
            verticalHeight: 600,
            loop: true,
            auto: true,
            onSliderLoad: function onSliderLoad() {
              $('#imageGallery').removeClass('cS-hidden');
            }
          });
        } else {
          console.error('Поле photo не містить даних або не є рядком для товару з ID:', productId);
        }
      } else {
        console.error('Продукт з ID не знайдено:', productId);
      }
    })["catch"](function (error) {
      return console.error('Помилка завантаження даних продукту:', error);
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".info-tab");
  var contents = document.querySelectorAll(".info-content");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // Видалити активні класи з усіх табів і блоків
      tabs.forEach(function (item) {
        return item.classList.remove("active");
      });
      contents.forEach(function (content) {
        return content.classList.remove("active");
      }); // Додати активний клас для вибраного таба і відповідного контенту

      tab.classList.add("active");
      document.querySelector(".".concat(tab.id, "-info")).classList.add("active");
    });
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
}); // Функция добавления товара в корзину

function addToCart(product) {
  // Получаем текущую корзину из Session Storage или создаем пустую корзину
  var cart = JSON.parse(sessionStorage.getItem('cart')) || []; // Проверка, есть ли товар уже в корзине

  var existingProduct = cart.find(function (item) {
    return item.id === product.id;
  });

  if (existingProduct) {
    // Если товар уже есть, увеличиваем его количество
    existingProduct.quantity += 1;
  } else {
    // Если товара нет в корзине, добавляем его
    cart.push(_objectSpread({}, product, {
      quantity: 1
    }));
  } // Сохраняем корзину обратно в Session Storage


  sessionStorage.setItem('cart', JSON.stringify(cart));
} // Обработчик события на кнопке


document.querySelectorAll('.add-to-cart').forEach(function (button) {
  button.addEventListener('click', function () {
    var product = {
      id: button.getAttribute('data-id'),
      price: button.getAttribute('data-price'),
      tipe: button.getAttribute('data-tipe'),
      name: button.closest('.product-item').querySelector('.product-name').textContent
    };
    addToCart(product);
    alert('Товар добавлен в корзину!');
  });
});
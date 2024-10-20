"use strict";

// catalog products
var currentProductIndex = 0;
var productsPerPage = 10;
var products = []; // Масив для зберігання продуктів
// Функція для відображення товарів

function displayProducts() {
  var productContainer = document.querySelector('.product-list'); // Відображаємо товари до currentProductIndex

  var productsToDisplay = products.slice(currentProductIndex, currentProductIndex + productsPerPage);
  productsToDisplay.forEach(function (product) {
    var productCard = "\n      <div class=\"product-card\">\n        <img src=\"".concat(product.photo.split(',')[0].trim(), "\" alt=\"").concat(product.zapchast, "\">\n        <h3>").concat(product.ID_EXT, "</h3>\n        <h3>").concat(product.zapchast, "</h3>\n        <p>").concat(product.zena, " ").concat(product.valyuta, "</p>\n       <a href=\"product.html?id=").concat(product.ID_EXT, "\">\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0456\u0448\u0435</a>\n      </div>\n    ");
    productContainer.innerHTML += productCard;
  }); // Оновлюємо індекс для наступного завантаження

  currentProductIndex += productsPerPage; // Перевіряємо, чи є ще товари для завантаження

  if (currentProductIndex >= products.length) {
    document.querySelector('.load-more').style.display = 'none'; // Ховаємо кнопку, якщо більше немає товарів
  }
} // Завантажуємо товари з JSON


fetch('../data/products.json').then(function (response) {
  return response.json();
}).then(function (data) {
  products = data.Sheet1; // Зберігаємо продукти в масиві

  displayProducts(); // Відображаємо перші 10 товарів
  // Додаємо обробник події для кнопки "Завантажити більше" тільки після завантаження продуктів

  var loadMoreButton = document.querySelector('.load-more');

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', displayProducts);
  } else {
    console.error('Кнопка "Завантажити більше" не знайдена.');
  }
})["catch"](function (error) {
  return console.error('Помилка завантаження каталогу:', error);
}); // Отримуємо ID продукту з URL

var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get('id'); // // Завантажуємо конкретний продукт на сторінці товару
// if (productId) {
//   fetch('../data/products.json')
//     .then(response => response.json())
//     .then(data => {
//       const product = data.Sheet1.find(item => item.ID_EXT === productId);
//       if (product) {
//         // Відображаємо деталі продукту
//         document.querySelector('.product-name').textContent = product.zapchast;
//         document.querySelector('.product-price').textContent = product.zena + ' ' + product.valyuta;
//         document.querySelector('.product-description').textContent = product.opysanye;
//         document.querySelector('.product-image').src = product.photo.split(',')[0].trim();
//         // Додаємо додаткові зображення товару
//         const imageContainer = document.querySelector('.product-images');
//         if (product.photo && typeof product.photo === 'string') {
//           product.photo.split(',').forEach(photoUrl => {
//             const imgElement = `<img src="${photoUrl.trim()}" alt="${product.zapchast}" style="width: 150px; height: auto;">`;
//             imageContainer.innerHTML += imgElement;
//           });
//         } else {
//           console.error('Поле photo не містить даних або не є рядком для товару з ID:', product.ID_EXT);
//         }
//       } else {
//         console.error('Продукт з ID не знайдено:', productId);
//       }
//     })
//     .catch(error => console.error('Помилка завантаження даних продукту:', error));
// }
//header

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
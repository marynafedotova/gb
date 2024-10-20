"use strict";

// Отримуємо ID продукту з URL
var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get('id'); // Завантажуємо конкретний продукт на сторінці товару

if (productId) {
  fetch('../data/products.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    var product = data.Sheet1.find(function (item) {
      return item.ID_EXT === productId;
    });

    if (product) {
      // Відображаємо деталі продукту
      document.querySelector('.product-name').textContent = product.zapchast;
      document.querySelector('.product-price').textContent = product.zena + ' ' + product.valyuta;
      document.querySelector('.product-description').textContent = product.opysanye;
      document.querySelector('.product-image').src = product.photo.split(',')[0].trim(); // Додаємо додаткові зображення товару

      var imageContainer = document.querySelector('.product-images');

      if (product.photo && typeof product.photo === 'string') {
        product.photo.split(',').forEach(function (photoUrl) {
          var imgElement = "<img src=\"".concat(photoUrl.trim(), "\" alt=\"").concat(product.zapchast, "\" style=\"width: 150px; height: auto;\">");
          imageContainer.innerHTML += imgElement;
        });
      } else {
        console.error('Поле photo не містить даних або не є рядком для товару з ID:', product.ID_EXT);
      }
    } else {
      console.error('Продукт з ID не знайдено:', productId);
    }
  })["catch"](function (error) {
    return console.error('Помилка завантаження даних продукту:', error);
  });
} //header


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
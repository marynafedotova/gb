"use strict";

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
}); //lazy
// var lazyLoadInstance = new LazyLoad({});
// wow
// new WOW().init();
//scroll
// document.getElementById('scrollButton').addEventListener('click', function(event) {
//   event.preventDefault();
//   const targetElement = document.getElementById('news');
//   const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
//   window.scrollTo({
//     top: targetPosition,
//     behavior: 'smooth'
//   });
// });
//baner slider

$(document).ready(function () {
  $('#baner').lightSlider({
    item: 1,
    controls: true,
    loop: true,
    auto: true,
    slideMove: 1,
    verticalHeight: 500,
    slideMargin: 0,
    speed: 700
  });
}); //advantages slider

document.addEventListener('DOMContentLoaded', function () {
  fetch('assets/data/advantages.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    createAdvantagesSlider('advantages_slider', data);
  })["catch"](function (error) {
    return console.error('Error fetching data:', error);
  });
});

function createAdvantagesSlider(elementId, jsonData) {
  var sliderContainer = $("#" + elementId);
  var ulElement = $("<ul></ul>");
  jsonData.forEach(function (item) {
    var slideElement = $("\n      <li>\n      <div class=\"adventages-slide\">\n        <img src=\"".concat(item.image, "\" alt=\"\">\n        <div class=\"adventages-text\">").concat(item.text, "</div>\n      </li>\n      </div>\n    "));
    ulElement.append(slideElement);
  });
  sliderContainer.append(ulElement);
  ulElement.lightSlider({
    item: 2,
    controls: true,
    loop: true,
    auto: true,
    slideMove: 1,
    slideMargin: 20,
    pager: true,
    responsive: [{
      breakpoint: 1200,
      settings: {
        item: 2,
        slideMove: 1
      }
    }, {
      breakpoint: 900,
      settings: {
        item: 1,
        slideMove: 1
      }
    }]
  });
} // document.addEventListener('DOMContentLoaded', function () {
//   fetch('assets/data/news.json')
//     .then(response => response.json())
//     .then(data => {
//       createSlider('slider2', data);
//     })
//     .catch(error => console.error('Error fetching data:', error));
// });
// function createSlider(elementId, jsonData) {
//   const sliderContainer = $("#" + elementId);
//   const customPrevHtml = '<span class="custom-prev-html">Previous</span>';
//   const customNextHtml = '<span class="custom-next-html">Next</span>';
//   const ulElement = $("<ul></ul>");
//   jsonData.forEach(item => {
//     const slideElement = $(`
//       <li>
//         <div class="slide-top">
//           <img src="${item.image}" alt="${item.title}">
//         </div>
//         <div class="title">${item.title}</div>
//         <div class="news-text">${item.newsText}</div>
//         <div class="author">
//           <div class="avatar">
//             <img src="${item.author.avatar}" alt="${item.author.name}">
//           </div>
//           <div class="author-data">
//           <div class="name-author">${item.author.name}</div>
//           <div class="news-date">${item.author.date}</div>
//           </div>
//           </div>
//       </li>
//     `);
//     ulElement.append(slideElement);
//   });
//   sliderContainer.append(ulElement);
//   ulElement.lightSlider({
//     item: 3,
//     controls: false,
//     loop: true,
//     auto: true,
//     slideMove: 1,
//     slideMargin: 30,
//     pager:true,
//     vertical:false,
//     prevHtml: customPrevHtml,
//     nextHtml: customNextHtml,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           item: 2,
//           slideMove: 1,
//         }
//       },
//       {
//         breakpoint: 900, 
//         settings: {
//           item: 1,
//           slideMove: 1,
//         }
//       }
//     ]
//   });
// }
// lightGallery(document.getElementById('animated-thumbnails'), {
//     allowMediaOverlap: true,
//     toggleThumb: true
// });


var urlMonoBank = 'https://api.monobank.ua/bank/currency';
var products = [];
var usdToUahRate = 1; // Функция для получения курса валют

function fetchCurrencyRate() {
  var cachedRate, cachedTime, now, response, data, usdToUah;
  return regeneratorRuntime.async(function fetchCurrencyRate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          cachedRate = localStorage.getItem('usdToUahRate');
          cachedTime = localStorage.getItem('usdToUahRateTime');
          now = Date.now(); // Если кэш действителен (меньше 5 минут)

          if (!(cachedRate && cachedTime && now - cachedTime < 5 * 60 * 1000)) {
            _context.next = 7;
            break;
          }

          usdToUahRate = parseFloat(cachedRate);
          return _context.abrupt("return");

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch(urlMonoBank));

        case 9:
          response = _context.sent;

          if (response.ok) {
            _context.next = 12;
            break;
          }

          throw new Error('Не удалось получить курс валют');

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          data = _context.sent;
          usdToUah = data.find(function (item) {
            return item.currencyCodeA === 840;
          });

          if (usdToUah && usdToUah.rateSell) {
            usdToUahRate = usdToUah.rateSell; // Сохраняем курс в кэш

            localStorage.setItem('usdToUahRate', usdToUahRate);
            localStorage.setItem('usdToUahRateTime', now);
          }

          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error('Ошибка при получении курса валют:', _context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
} // Функция для получения продуктов


function fetchProducts() {
  var response, data;
  return regeneratorRuntime.async(function fetchProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch('assets/data/data.json'));

        case 3:
          response = _context2.sent;

          if (response.ok) {
            _context2.next = 6;
            break;
          }

          throw new Error('Не удалось загрузить продукты');

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context2.sent;

          if (!(!data.Sheet1 || !Array.isArray(data.Sheet1))) {
            _context2.next = 11;
            break;
          }

          throw new Error('Некорректный формат данных');

        case 11:
          products = data.Sheet1;
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.error('Ошибка при получении данных продуктов:', _context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
} // Функция для отображения продуктов


function displayProducts(filteredProducts) {
  var productContainer = document.querySelector('.search-results');

  if (!productContainer) {
    console.error('Контейнер для товаров не найден');
    return;
  } // Очищаем контейнер перед выводом новых результатов


  productContainer.innerHTML = '';

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = '<p>Ничего не найдено.</p>';
    return;
  }

  var limitedProducts = filteredProducts.slice(0, 12);
  limitedProducts.forEach(function (product) {
    var priceInUah = Math.ceil(product.zena * usdToUahRate);
    var photoUrl = product.photo ? product.photo.split(',')[0].trim() : 'default-photo.jpg';
    var productCard = "\n<div class=\"product-card\">\n        <img src=\"".concat(photoUrl, "\" alt=\"").concat(product.zapchast, "\">\n        <div>\u0410\u0440\u0442\u0438\u043A\u0443\u043B: ").concat(product.ID_EXT, "</div>\n        <h3>").concat(product.zapchast, "</h3>\n        <p>\u0426\u0435\u043D\u0430: ").concat(product.zena, " ").concat(product.valyuta, " / ").concat(priceInUah, " \u0433\u0440\u043D</p>\n       <div class=\"btn-cart\">\n          <button class=\"add-to-cart\" data-id=\"").concat(product.ID_EXT, "\" data-price=\"").concat(priceInUah, "\">\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E \u043A\u043E\u0448\u0438\u043A\u0430</button>\n        </div>\n        <div class=\"product_btn\">\n          <a href=\"assets/pages/product.html?id=").concat(product.ID_EXT, "\">\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0456\u0448\u0435</a>\n        </div>\n              </div>");
    productContainer.insertAdjacentHTML('beforeend', productCard);
  }); // Если продуктов больше 12, добавляем сообщение о сокращении списка

  if (filteredProducts.length > 12) {
    productContainer.insertAdjacentHTML('beforeend', "<p class=\"info-message\">\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u043F\u0435\u0440\u0432\u044B\u0435 12 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432. \u0423\u0442\u043E\u0447\u043D\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u0434\u043B\u044F \u0431\u043E\u043B\u0435\u0435 \u0442\u043E\u0447\u043D\u043E\u0433\u043E \u043F\u043E\u0438\u0441\u043A\u0430.</p>");
  }
} // Обработчик формы поиска


document.getElementById('search-form').addEventListener('submit', function _callee(event) {
  var query, filteredProducts;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          event.preventDefault();
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetchCurrencyRate());

        case 3:
          // Получаем актуальный курс валют
          query = document.getElementById('search-input').value.trim().toLowerCase();

          if (query) {
            filteredProducts = products.filter(function (product) {
              return product.zapchast && product.zapchast.toLowerCase().includes(query) || product.markaavto && product.markaavto.toLowerCase().includes(query) || product.model && product.model.toLowerCase().includes(query);
            });
            displayProducts(filteredProducts);
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Инициализация данных

function initialize() {
  return regeneratorRuntime.async(function initialize$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetchCurrencyRate());

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap(fetchProducts());

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
} // Запуск


initialize();
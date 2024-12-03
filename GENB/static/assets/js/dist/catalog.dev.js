"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var urlMonoBank = 'https://api.monobank.ua/bank/currency';
var usdToUahRate = 37; // Курс USD к UAH

var currentProductIndex = 0;
var productsPerPage = 12;
var products = [];
var searchResults = [];
var searchProductIndex = 0;
var productsPerSearchPage = 12; // Функция для получения курса валют с кешированием

function fetchCurrencyRate() {
  var cachedRate, cachedTime, now, response, data, usdToUah;
  return regeneratorRuntime.async(function fetchCurrencyRate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cachedRate = localStorage.getItem('usdToUahRate');
          cachedTime = localStorage.getItem('usdToUahRateTime');
          now = Date.now();

          if (!(cachedRate && cachedTime && now - cachedTime < 5 * 60 * 1000)) {
            _context.next = 6;
            break;
          }

          usdToUahRate = parseFloat(cachedRate);
          return _context.abrupt("return");

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch(urlMonoBank));

        case 9:
          response = _context.sent;

          if (response.ok) {
            _context.next = 12;
            break;
          }

          throw new Error('Ошибка загрузки курса валют');

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          data = _context.sent;
          usdToUah = data.find(function (item) {
            return item.currencyCodeA === 840;
          });

          if (usdToUah && usdToUah.rateSell) {
            usdToUahRate = usdToUah.rateSell;
            localStorage.setItem('usdToUahRate', usdToUahRate);
            localStorage.setItem('usdToUahRateTime', now);
          }

          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](6);
          console.error('Ошибка получения курса валют:', _context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 19]]);
} // Функция для отображения товаров


function displayProducts() {
  var filteredProducts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var isSearch = filteredProducts.length > 0;
  var productContainer = document.querySelector(isSearch ? '.search-results' : '.product-list');

  if (!productContainer) {
    console.error('Контейнер для товаров не найден');
    return;
  }

  if (isSearch) {
    productContainer.innerHTML = '';
  }

  var productsToDisplay = isSearch ? filteredProducts : products.slice(currentProductIndex, currentProductIndex + productsPerPage);
  productsToDisplay.forEach(function (product) {
    var priceInUah = Math.ceil(product.zena * usdToUahRate);
    var productCard = "\n      <div class=\"product-card\">\n        <img src=\"".concat(product.photo.split(',')[0].trim(), "\" alt=\"").concat(product.zapchast, " class=\"lazy\">\n        <h3>\u0410\u0440\u0442\u0438\u043A\u0443\u043B: ").concat(product.ID_EXT, "</h3>\n        <h3>\u041D\u0430\u0437\u0432\u0430: ").concat(product.zapchast, "</h3>\n        <p>\u0426\u0456\u043D\u0430: ").concat(product.zena, " ").concat(product.valyuta, " / ").concat(priceInUah, " \u0433\u0440\u043D</p>\n        <div class=\"btn-cart\">\n          <button class=\"add-to-cart\" data-id=\"").concat(product.ID_EXT, "\" data-price=\"").concat(priceInUah, "\">\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E \u043A\u043E\u0448\u0438\u043A\u0430</button>\n        </div>\n        <div class=\"product_btn\">\n          <a href=\"product.html?id=").concat(product.ID_EXT, "\">\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0456\u0448\u0435</a>\n        </div>\n      </div>");
    productContainer.insertAdjacentHTML('beforeend', productCard);
  }); // Обновляем индекс для каталога

  if (!isSearch) {
    currentProductIndex += productsPerPage;

    if (currentProductIndex >= products.length) {
      document.querySelector('.load-more').style.display = 'none';
    }
  } else if (filteredProducts.length === 0) {
    productContainer.innerHTML = '<p>Ничего не найдено.</p>';
  }
} // Функция для отображения результатов поиска


function displaySearchResults() {
  var filteredProducts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var productContainer = document.querySelector('.search-results');

  if (!productContainer) {
    console.error('Контейнер для результатов поиска не найден');
    return;
  }

  var productsToDisplay = filteredProducts.slice(searchProductIndex, searchProductIndex + productsPerSearchPage);
  productsToDisplay.forEach(function (product) {
    var priceInUah = Math.ceil(product.zena * usdToUahRate);
    var productCard = "\n      <div class=\"product-card\">\n        <img src=\"".concat(product.photo.split(',')[0].trim(), "\" alt=\"").concat(product.zapchast, "\">\n        <h3>\u0410\u0440\u0442\u0438\u043A\u0443\u043B: ").concat(product.ID_EXT, "</h3>\n        <h3>\u041D\u0430\u0437\u0432\u0430: ").concat(product.zapchast, "</h3>\n        <p>\u0426\u0456\u043D\u0430: ").concat(product.zena, " ").concat(product.valyuta, " / ").concat(priceInUah, " \u0433\u0440\u043D</p>\n        <div class=\"btn-cart\">\n          <button class=\"add-to-cart\" data-id=\"").concat(product.ID_EXT, "\" data-price=\"").concat(priceInUah, "\">\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E \u043A\u043E\u0448\u0438\u043A\u0430</button>\n        </div>\n        <div class=\"product_btn\">\n          <a href=\"product.html?id=").concat(product.ID_EXT, "\">\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0456\u0448\u0435</a>\n        </div>\n      </div>");
    productContainer.insertAdjacentHTML('beforeend', productCard);
  });
  searchProductIndex += productsPerSearchPage; // Управление кнопкой "Загрузить больше"

  var loadMoreButton = document.querySelector('.load-more-search');

  if (searchProductIndex < filteredProducts.length) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
} // Модификация функции поиска товаров


function searchProducts(query) {
  var lowerCaseQuery = query.toLowerCase();
  searchResults = products.filter(function (product) {
    return product.zapchast && product.zapchast.toLowerCase().includes(lowerCaseQuery) || product.markaavto && product.markaavto.toLowerCase().includes(lowerCaseQuery) || product.model && product.model.toLowerCase().includes(lowerCaseQuery);
  });
  searchProductIndex = 0;
  displaySearchResults(searchResults);
} // Обработчик для кнопки "Загрузить больше"


document.querySelector('.load-more').addEventListener('click', function (event) {
  event.preventDefault();
  var query = document.getElementById('search-input').value.trim();

  if (query) {
    searchProducts(query);
    this.style.display = 'none';
  }
}); // Обработчик формы поиска

document.getElementById('search-form').addEventListener('submit', function _callee(event) {
  var query, resultsContainer;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          event.preventDefault();
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetchCurrencyRate());

        case 3:
          query = document.getElementById('search-input').value.trim().toLowerCase();

          if (query) {
            searchResults = products.filter(function (product) {
              return product.zapchast && product.zapchast.toLowerCase().includes(query) || product.markaavto && product.markaavto.toLowerCase().includes(query) || product.model && product.model.toLowerCase().includes(query);
            });
            searchProductIndex = 0;
            document.querySelector('.search-results').innerHTML = '';
            displaySearchResults(searchResults);
          } else {
            searchResults = [];
            document.querySelector('.search-results').innerHTML = '<p>Ничего не найдено.</p>';
          }

          resultsContainer = document.querySelector('.search-results');

          if (resultsContainer) {
            resultsContainer.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
document.querySelector('.load-more-search').addEventListener('click', function (event) {
  event.preventDefault();
  displaySearchResults(searchResults);
});
document.querySelector('.load-more').addEventListener('click', function (event) {
  event.preventDefault();
  displayProducts();
}); // Функция инициализации каталога

function initializeCatalog() {
  var response, data;
  return regeneratorRuntime.async(function initializeCatalog$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetchCurrencyRate());

        case 2:
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(fetch('../data/data_ukr.json'));

        case 5:
          response = _context3.sent;

          if (response.ok) {
            _context3.next = 8;
            break;
          }

          throw new Error('Ошибка загрузки JSON');

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          data = _context3.sent;

          if (!(!data || !data.Sheet1)) {
            _context3.next = 13;
            break;
          }

          throw new Error('Некорректный формат данных');

        case 13:
          products = data.Sheet1;
          displayProducts(); // Отображаем начальные продукты

          document.querySelector('.load-more').addEventListener('click', function (event) {
            event.preventDefault();
            displayProducts();
          });
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](2);
          console.error('Ошибка инициализации каталога:', _context3.t0);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 18]]);
} // Инициализация


initializeCatalog();
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-to-cart')) {
    var item = {
      id: event.target.dataset.id,
      price: event.target.dataset.price,
      quantity: 1
    };
    addToCart(item); // Додаємо товар до кошика
  }
}); //accordion

fetch(dataJsonUrl).then(function (response) {
  return response.json();
}).then(function (data) {
  var cars = data.Sheet1.filter(function (item) {
    return item.markaavto && item.model;
  }) // Исключаем записи с null или пустыми значениями
  .map(function (item) {
    return {
      markaavto: item.markaavto,
      model: item.model,
      god: item.god // Добавляем год, чтобы передать его в ссылку

    };
  });
  var carAccordionData = cars.reduce(function (acc, car) {
    if (!acc[car.markaavto]) {
      acc[car.markaavto] = new Set();
    }

    acc[car.markaavto].add(JSON.stringify({
      model: car.model,
      god: car.god
    }));
    return acc;
  }, {});
  var accordionContainer = document.getElementById('carAccordion');

  var _loop = function _loop() {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        make = _Object$entries$_i[0],
        models = _Object$entries$_i[1];

    if (!make) return "continue"; // Пропускаем, если марка null или пустая

    var makeDiv = document.createElement('div');
    makeDiv.classList.add('accordion-item');
    var makeHeader = document.createElement('h3');
    makeHeader.textContent = make;
    makeHeader.classList.add('accordion-header');
    makeHeader.addEventListener('click', function () {
      modelList.classList.toggle('active');
    });
    makeDiv.appendChild(makeHeader);
    var modelList = document.createElement('div');
    modelList.classList.add('accordion-content');
    models.forEach(function (modelData) {
      var _JSON$parse = JSON.parse(modelData),
          model = _JSON$parse.model,
          god = _JSON$parse.god;

      if (model) {
        // Пропускаем, если модель null или пустая
        var modelItem = document.createElement('p');
        modelItem.textContent = model;
        modelItem.classList.add('model-item');
        modelItem.addEventListener('click', function () {
          window.location.href = "./car-page.html?make=".concat(make, "&model=").concat(model, "&year=").concat(god);
        });
        modelList.appendChild(modelItem);
      }
    });
    makeDiv.appendChild(modelList);
    accordionContainer.appendChild(makeDiv);
  };

  for (var _i = 0, _Object$entries = Object.entries(carAccordionData); _i < _Object$entries.length; _i++) {
    var _ret = _loop();

    if (_ret === "continue") continue;
  }
})["catch"](function (error) {
  return console.error('Помилка завантаження даних:', error);
}); //cars

fetch('../data/data_ukr.json').then(function (response) {
  return response.json();
}).then(function (data) {
  var carsCatalog = document.getElementById('cars-catalog');
  var uniqueCars = new Set();
  var carsArray = [];
  data.Sheet1.forEach(function (car) {
    // Проверяем, что марка, модель и год не null и не пусты
    if (car.markaavto && car.model && car.god) {
      var uniqueKey = "".concat(car.markaavto, "-").concat(car.model, "-").concat(car.god);

      if (!uniqueCars.has(uniqueKey)) {
        uniqueCars.add(uniqueKey);
        var carObject = {
          markaavto: car.markaavto,
          model: car.model,
          god: car.god,
          pictures: car.pictures
        };
        carsArray.push(carObject);
      }
    }
  });
  var sortedCars = carsArray.sort(function (a, b) {
    var makeA = a.markaavto || '';
    var makeB = b.markaavto || '';
    return makeA.localeCompare(makeB);
  });
  sortedCars.forEach(function (car) {
    var carCard = document.createElement('div');
    carCard.classList.add('car-card');
    var carImage = document.createElement('img');
    carImage.src = car.pictures;
    carImage.alt = "".concat(car.markaavto, " ").concat(car.model);
    carCard.appendChild(carImage);
    var carDetails = document.createElement('div');
    carDetails.classList.add('car-details');
    var carMakeModel = document.createElement('h3');
    carMakeModel.textContent = "".concat(car.markaavto, " ").concat(car.model);
    carDetails.appendChild(carMakeModel);
    var carYear = document.createElement('p');
    carYear.textContent = "\u0420\u0456\u043A: ".concat(car.god);
    carDetails.appendChild(carYear); // Обработчик события для картки машины

    carCard.addEventListener('click', function () {
      window.location.href = "./car-page.html?make=".concat(car.markaavto, "&model=").concat(car.model, "&year=").concat(car.god);
    });
    carCard.appendChild(carDetails);
    carsCatalog.appendChild(carCard);
  });
})["catch"](function (error) {
  return console.error('Помилка завантаження даних:', error);
}); //cart

document.addEventListener("DOMContentLoaded", function () {
  var continueShoppingBtn = document.getElementById("continueShopping");
  var addToCartBtns = document.querySelectorAll('.add-to-cart'); // Обработчик для кнопки "Продолжить покупки"

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", function () {
      window.location.href = "catalog.html"; // Переход на страницу каталога товаров
    });
  } // Обработчик для кнопок добавления в корзину


  addToCartBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: this.dataset.price,
        quantity: 1 // Количество товара (можно сделать настраиваемым)

      };
      addToCart(item); // Добавление товара в корзину
    });
  });
}); // Функция для отображения модального окна

function showCartModal() {
  var modal = document.getElementById("cartModal");
  var overlay = document.querySelector(".page-overlay");

  if (modal && overlay) {
    modal.classList.remove("hidden");
    overlay.style.display = "block";
  }
} // Функция для закрытия модального окна


function closeCartModal() {
  var modal = document.getElementById("cartModal");
  var overlay = document.querySelector(".page-overlay");

  if (modal && overlay) {
    modal.classList.add("hidden");
    overlay.style.display = "none";
  }
} // Функция для перехода к оформлению заказа


function proceedToCheckout() {
  closeCartModal();
  window.location.href = "cart.html";
} // Функция для добавления товара в корзину


function addToCart(item) {
  var cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  var existingItemIndex = cart.findIndex(function (cartItem) {
    return cartItem.id === item.id;
  });

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
    cart.push(item);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
  showCartModal();
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
}); //lazy

var lazyLoadInstance = new LazyLoad({}); // wow
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

document.querySelectorAll('.catalog-list a').forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    var brand = this.querySelector('img').alt.toLowerCase();
    var pageUrl = "catalog-template.html?brand=".concat(brand);
    window.location.href = pageUrl;
  });
});
document.querySelectorAll('.submenu a').forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    var brand = this.querySelector('img').alt.toLowerCase();
    var pageUrl = "catalog-template.html?brand=".concat(brand);
    window.location.href = pageUrl;
  });
});
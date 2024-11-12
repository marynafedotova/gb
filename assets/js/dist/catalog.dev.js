"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    var productCard = "\n    <div class=\"product-card\">\n      <img src=\"".concat(product.photo.split(',')[0].trim(), "\" alt=\"").concat(product.zapchast, "\">\n      <h3>").concat(product.ID_EXT, "</h3>\n      <h3>").concat(product.zapchast, "</h3>\n      <p>").concat(product.zena, " ").concat(product.valyuta, "</p>\n      \n      <div class=\"btn-cart\">\n<button class=\"add-to-cart\" data-id=\"").concat(product.ID_EXT, "\" data-price=\"").concat(product.zena, "\">\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E \u043A\u043E\u0448\u0438\u043A\u0430</button>\n\n        </div>\n      <div class=\"product_btn\">\n        <a href=\"product.html?id=").concat(product.ID_EXT, "\">\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0456\u0448\u0435</a>\n      </div>\n    </div>\n  ");
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
var productId = urlParams.get('id'); //accordion

fetch('../data/data.json').then(function (response) {
  return response.json();
}).then(function (data) {
  var cars = data.Sheet1.filter(function (item) {
    return item.markaavto && item.model;
  }) // Исключаем записи с null или пустыми значениями
  .map(function (item) {
    return {
      markaavto: item.markaavto,
      model: item.model
    };
  });
  var carAccordionData = cars.reduce(function (acc, car) {
    if (!acc[car.markaavto]) {
      acc[car.markaavto] = new Set();
    }

    acc[car.markaavto].add(car.model);
    return acc;
  }, {});
  var accordionContainer = document.getElementById('carAccordion');

  var _loop = function _loop() {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        make = _Object$entries$_i[0],
        models = _Object$entries$_i[1];

    if (!make) return "continue"; // Пропускаем если марка null или пустая

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
    models.forEach(function (model) {
      if (model) {
        // Пропускаем если модель null или пустая
        var modelItem = document.createElement('p');
        modelItem.textContent = model;
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

fetch('../data/data.json').then(function (response) {
  return response.json();
}).then(function (data) {
  var carsCatalog = document.getElementById('cars-catalog');
  var uniqueCars = new Set();
  var carsArray = [];
  data.Sheet1.forEach(function (car) {
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
    carDetails.appendChild(carYear); // Обробник події для картки машини

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
    modal.classList.remove("hidden"); // Показываем модальное окно

    overlay.style.display = "block"; // Показываем затемняющий фон
  }
} // Функция для закрытия модального окна


function closeCartModal() {
  var modal = document.getElementById("cartModal");
  var overlay = document.querySelector(".page-overlay");

  if (modal && overlay) {
    modal.classList.add("hidden"); // Скрываем модальное окно

    overlay.style.display = "none"; // Скрываем затемняющий фон
  }
} // Функция для перехода к оформлению заказа


function proceedToCheckout() {
  closeCartModal();
  window.location.href = "cart.html"; // Переход на страницу корзины для оформления заказа
} // Функция для добавления товара в корзину


function addToCart(item) {
  var cart = JSON.parse(sessionStorage.getItem("cart")) || []; // Получаем корзину из sessionStorage
  // Добавляем новый товар в корзину, если он еще не был добавлен

  var existingItemIndex = cart.findIndex(function (cartItem) {
    return cartItem.id === item.id;
  });

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1; // Увеличиваем количество товара, если он уже есть
  } else {
    cart.push(item); // Иначе добавляем новый товар в корзину
  }

  sessionStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем обновленную корзину

  showCartModal(); // Показываем модальное окно с вариантами продолжить покупки или перейти в корзину
}
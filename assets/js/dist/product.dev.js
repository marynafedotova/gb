"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.addEventListener("DOMContentLoaded", function _callee() {
  var urlParams, productId, setElementTextContent, getCachedExchangeRate, usdToUahRate;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          getCachedExchangeRate = function _ref2() {
            var cachedRate, cachedTime, oneHour, response, data, usdToUah, rate;
            return regeneratorRuntime.async(function getCachedExchangeRate$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    cachedRate = sessionStorage.getItem('usdToUahRate');
                    cachedTime = sessionStorage.getItem('currencyUpdateTime');
                    oneHour = 60 * 60 * 1000; // 1 час в миллисекундах

                    if (!(cachedRate && cachedTime && Date.now() - cachedTime < oneHour)) {
                      _context.next = 7;
                      break;
                    }

                    return _context.abrupt("return", parseFloat(cachedRate));

                  case 7:
                    _context.prev = 7;
                    _context.next = 10;
                    return regeneratorRuntime.awrap(fetch('https://api.monobank.ua/bank/currency'));

                  case 10:
                    response = _context.sent;
                    _context.next = 13;
                    return regeneratorRuntime.awrap(response.json());

                  case 13:
                    data = _context.sent;
                    usdToUah = data.find(function (item) {
                      return item.currencyCodeA === 840 && item.currencyCodeB === 980;
                    });

                    if (!(usdToUah && usdToUah.rateSell)) {
                      _context.next = 20;
                      break;
                    }

                    rate = usdToUah.rateSell; // Сохраняем курс и время обновления в sessionStorage

                    sessionStorage.setItem('usdToUahRate', rate);
                    sessionStorage.setItem('currencyUpdateTime', Date.now());
                    return _context.abrupt("return", rate);

                  case 20:
                    _context.next = 26;
                    break;

                  case 22:
                    _context.prev = 22;
                    _context.t0 = _context["catch"](7);
                    console.error('Ошибка при получении курса валют:', _context.t0);
                    return _context.abrupt("return", 1);

                  case 26:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[7, 22]]);
          };

          setElementTextContent = function _ref(selector, content) {
            var element = document.querySelector(selector);

            if (element) {
              element.textContent = content;
            } else {
              console.warn("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441 \u0441\u0435\u043B\u0435\u043A\u0442\u043E\u0440\u043E\u043C ".concat(selector, " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"));
            }
          };

          urlParams = new URLSearchParams(window.location.search);
          productId = urlParams.get('id'); // Функция для установки значения textContent с проверкой наличия элемента

          if (!productId) {
            _context2.next = 9;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(getCachedExchangeRate());

        case 7:
          usdToUahRate = _context2.sent;
          // Загружаем данные товара из JSON
          fetch('../data/data_ukr.json').then(function (response) {
            return response.json();
          }).then(function (data) {
            var product = data.Sheet1.find(function (item) {
              return item.ID_EXT === productId;
            });

            if (product) {
              // Конвертируем цену в гривны и округляем в большую сторону
              var priceInUah = Math.ceil(product.zena * usdToUahRate); // Присваиваем значения элементам на странице

              setElementTextContent('.product-id', product.ID_EXT);
              setElementTextContent('.product-name', product.zapchast);
              setElementTextContent('.product-markaavto', product.markaavto);
              setElementTextContent('.product-dop_category', product.dop_category);
              setElementTextContent('.product-pod_category', product.pod_category);
              setElementTextContent('.product-typ_kuzova', product.typ_kuzova);
              setElementTextContent('.product-price', "".concat(product.zena, " ").concat(product.valyuta));
              setElementTextContent('.product-price-uah', "".concat(priceInUah, " \u0433\u0440\u043D"));
              setElementTextContent('.product-model', product.model);
              setElementTextContent('.product-god', product.god);
              setElementTextContent('.product-category', product.category);
              setElementTextContent('.product-toplivo', product.toplivo);
              setElementTextContent('.product-originalnumber', product.originalnumber); // Добавление описания продукта в блок с подробной информацией

              setElementTextContent('.opysanye', product.opysanye); // Обработка галереи изображений

              var imageGallery = document.querySelector('#imageGallery');

              if (product.photo && typeof product.photo === 'string' && imageGallery) {
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
                console.error('Поле photo не содержит данных или не является строкой для товара с ID:', productId);
              }
            } else {
              console.error('Продукт с указанным ID не найден:', productId);
            }
          })["catch"](function (error) {
            return console.error('Ошибка загрузки данных продукта:', error);
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Табы для переключения информации

document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".info-tab");
  var contents = document.querySelectorAll(".info-content");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (item) {
        return item.classList.remove("active");
      });
      contents.forEach(function (content) {
        return content.classList.remove("active");
      });
      tab.classList.add("active");
      document.querySelector(".".concat(tab.id, "-info")).classList.add("active");
    });
  }); // Добавление логики для кнопки добавления в корзину с модальным окном

  document.querySelectorAll('.add-to-cart').forEach(function (button) {
    button.addEventListener('click', function () {
      var product = {
        id: button.getAttribute('data-id'),
        price: button.getAttribute('data-price'),
        tipe: button.getAttribute('data-tipe'),
        name: button.closest('.product-item').querySelector('.product-name').textContent
      };
      addToCart(product); // Показать модальное окно вместо alert

      var modal = document.createElement('div');
      modal.classList.add('modal-overlay');
      modal.innerHTML = "\n        <div class=\"modal-window\">\n          <p>\u0422\u043E\u0432\u0430\u0440 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443!</p>\n          <button class=\"continue-shopping\">\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043F\u043E\u043A\u0443\u043F\u043A\u0438</button>\n          <button class=\"go-to-cart\">\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n        </div>\n      ";
      document.body.appendChild(modal); // Обработчики для кнопок модального окна

      modal.querySelector('.continue-shopping').addEventListener('click', function () {
        document.body.removeChild(modal);
      });
      modal.querySelector('.go-to-cart').addEventListener('click', function () {
        window.location.href = 'cart.html'; // Переход на страницу корзины
      });
    });
  }); // Функция добавления товара в корзину

  function addToCart(product) {
    var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    var existingProduct = cart.find(function (item) {
      return item.id === product.id;
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(_objectSpread({}, product, {
        quantity: 1
      }));
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
});
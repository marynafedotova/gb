"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);
  var category = decodeURIComponent(params.get('category')).toLowerCase();
  var markaavto = decodeURIComponent(params.get('make')).toLowerCase();
  var model = decodeURIComponent(params.get('model')).toLowerCase();
  var year = decodeURIComponent(params.get('year'));
  console.log("Отримані параметри:", {
    category: category,
    markaavto: markaavto,
    model: model,
    year: year
  });
  fetch('../data/data_ukr.json
').then(function (response) {
    return response.json();
  }).then(function (data) {
    var carsArray = data.Sheet1.map(function (car) {
      return _objectSpread({}, car, {
        category: car.category && car.category.toLowerCase(),
        markaavto: car.markaavto && car.markaavto.toLowerCase(),
        model: car.model && car.model.toLowerCase(),
        god: car.god ? Math.floor(car.god) : null
      });
    });
    console.log("Дані з бази даних:", carsArray);
    var filteredParts;
    var alternativeMessage = '';
    var isYearNull = year === "null";
    filteredParts = carsArray.filter(function (car) {
      return car.category === category && car.markaavto === markaavto && car.model === model && (!isYearNull ? car.god === parseInt(year) : true);
    });
    console.log("Результат після першого фільтрування (повний збіг):", filteredParts);

    if (filteredParts.length === 0) {
      filteredParts = carsArray.filter(function (car) {
        return car.category === category && car.markaavto === markaavto && car.model === model;
      });
      alternativeMessage = "Підходящі запчастини в цій категорії не знайдені, але можливо вас зацікавлять інші варіанти для цієї моделі.";
      console.log("Результат після другого фільтрування (категорія, марка, модель):", filteredParts);

      if (filteredParts.length === 0) {
        filteredParts = carsArray.filter(function (car) {
          return car.category === category && car.markaavto === markaavto && (!isYearNull ? car.god === parseInt(year) : true);
        });
        alternativeMessage = "Підходящі запчастини в цій категорії не знайдені, але можливо вас зацікавлять інші варіанти для цієї марки і року.";
        console.log("Результат після третього фільтрування (категорія, марка, рік):", filteredParts);

        if (filteredParts.length === 0) {
          filteredParts = carsArray.filter(function (car) {
            return car.category === category && car.markaavto === markaavto;
          });
          alternativeMessage = "Підходящі запчастини в цій категорії не знайдені, але можливо вас зацікавлять інші варіанти для цієї марки.";
          console.log("Результат після четвертого фільтрування (категорія і марка):", filteredParts);

          if (filteredParts.length === 0) {
            filteredParts = carsArray.filter(function (car) {
              return car.markaavto === markaavto;
            });
            alternativeMessage = "Запчастини для цієї марки авто:";
            console.log("Результат після п'ятого фільтрування (тільки марка):", filteredParts);
          }
        }
      }
    }

    var partsContainer = document.getElementById('parts-container');

    if (filteredParts.length > 0) {
      partsContainer.innerHTML = "\n          ".concat(alternativeMessage ? "<p>".concat(alternativeMessage, "</p>") : '', "\n          ").concat(filteredParts.map(function (part) {
        return "\n            <div class=\"part-item\">\n              <h3>".concat(part.zapchast, "</h3>\n              <p>\u0426\u0456\u043D\u0430: ").concat(part.zena, " ").concat(part.valyuta, "</p>\n              <p>\u0420\u0456\u043A \u0432\u0438\u043F\u0443\u0441\u043A\u0443: ").concat(part.god, "</p>\n              <a href=\"product.html?id=").concat(part.ID_EXT, "\">\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0434\u0435\u0442\u0430\u043B\u0456</a>\n            </div>\n          ");
      }).join(''), "\n        ");
    } else {
      partsContainer.innerHTML = "<p>Запчастини для цієї категорії не знайдені.</p>";
    }
  })["catch"](function (error) {
    console.error('Помилка при завантаженні даних:', error);
    document.getElementById('parts-container').innerHTML = "<p>Помилка при завантаженні даних.</p>";
  });
});
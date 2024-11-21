"use strict";

window.onload = function () {
  // Декодируем параметры из URL
  var params = new URLSearchParams(window.location.search);
  var markaavto = decodeURIComponent(params.get('make'));
  var model = decodeURIComponent(params.get('model'));
  var year = decodeURIComponent(params.get('year')); // Проверяем, что все параметры переданы

  if (!markaavto || !model || !year) {
    document.getElementById('car-info').innerHTML = "<p>Некорректные параметры URL.</p>";
    return;
  }

  fetch('../data/data_ukr.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    var carsArray = data.Sheet1;
    var carData = carsArray.filter(function (car) {
      return car.markaavto === markaavto && (car.model === model || !model) && (car.god === parseFloat(year) || !year);
    });

    if (carData.length > 0) {
      // Функция для отображения содержимого вкладки
      var showTabContent = function showTabContent(categoryId, partsByCategory) {
        document.querySelectorAll('.tab-panel').forEach(function (tab) {
          return tab.style.display = 'none';
        });
        var tabContentElement = document.getElementById(categoryId);
        tabContentElement.style.display = 'block';

        if (partsByCategory.length > 0) {
          var partsList = "<ul>";
          partsByCategory.forEach(function (part) {
            // Добавляем ссылку на product.html с параметром id
            partsList += "<li><a href=\"product.html?id=".concat(part.ID_EXT, "\">").concat(part.zapchast, "</a></li>");
          });
          partsList += "</ul>";
          tabContentElement.innerHTML = partsList;
        } else {
          tabContentElement.innerHTML = "<p>Запчасти для этой категории не найдены.</p>";
        }
      }; // Устанавливаем обработчики событий для заголовков вкладок


      var car = carData[0]; // Отображаем основную информацию об автомобиле

      var carInfoElement = document.getElementById('car-info');
      carInfoElement.innerHTML = "\n          <h2>".concat(car.markaavto, " ").concat(car.model, " ").concat(car.god, "</h2>\n          <img src=\"").concat(car.pictures.split(',')[0].trim(), "\" alt=\"").concat(car.markaavto, " ").concat(car.model, "\" width=\"200px\" />\n        "); // Определяем соответствие категорий данных и вкладок

      var categoryMap = {
        "Інтер'єр / салон": 'interior',
        "Двигун": 'engine',
        "Кузов": 'body',
        "Електрика": 'electronics',
        "Запчастини ІНШІ": 'parts',
        "Гальмівна система": 'brake-system',
        "Підвіска та рульове": 'suspension',
        "Двері": 'doors',
        "Кріплення": 'fasteners',
        "Трансмісія": 'transmission',
        "Колеса": 'wheels',
        "Замок багажника": 'trunk-lock',
        "ГУМА": 'tire'
      };
      Object.keys(categoryMap).forEach(function (categoryName) {
        var categoryId = categoryMap[categoryName];
        var tabTitleElement = document.querySelector("#tab-titles li a[href=\"#".concat(categoryId, "\"]"));
        tabTitleElement.addEventListener('click', function (event) {
          event.preventDefault(); // Перенаправляємо на нову сторінку з параметрами URL для фільтрації

          var newUrl = "product-category.html?category=".concat(encodeURIComponent(categoryName), "&make=").concat(encodeURIComponent(markaavto), "&model=").concat(encodeURIComponent(model));
          window.location.href = newUrl;
        });
      });
    } else {
      document.getElementById('car-info').innerHTML = "<p>Этот автомобиль не найден.</p>";
    }
  })["catch"](function (error) {
    console.error('Ошибка при загрузке данных:', error);
    document.getElementById('car-info').innerHTML = "<p>Произошла ошибка при загрузке данных.</p>";
  });
};
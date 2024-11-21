"use strict";

// Код для обработки кликов по ссылкам
document.querySelectorAll('.submenu a').forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    var brand = this.querySelector('img').alt.toLowerCase();
    var pageUrl = "catalog-template.html?brand=".concat(brand);
    window.location.href = pageUrl;
  });
}); // Код для отображения данных о бренде

document.addEventListener('DOMContentLoaded', function () {
  var urlParams = new URLSearchParams(window.location.search);
  var brand = urlParams.get('brand');
  var brandData = {
    acura: {
      title: 'Acura Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Acura.'
    },
    audi: {
      title: 'Audi Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Audi.'
    },
    bmw: {
      title: 'BMW Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки BMW.'
    },
    crysler: {
      title: 'Chrysler Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Chrysler.'
    },
    dodge: {
      title: 'Dodge Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Dodge.'
    },
    honda: {
      title: 'Honda Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Honda.'
    },
    hyundai: {
      title: 'Hyundai Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Hyundai.'
    },
    infiniti: {
      title: 'Infiniti Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Infiniti.'
    },
    jaguar: {
      title: 'Jaguar Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Jaguar.'
    },
    jeep: {
      title: 'Jeep Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Jeep.'
    },
    lincoln: {
      title: 'Lincoln Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Lincoln.'
    },
    kia: {
      title: 'Kia Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Kia.'
    },
    land_rover: {
      title: 'Land Rover Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів маркиLand Rover.'
    },
    nissan: {
      title: 'Nissan Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Nissan.'
    },
    volkswagen: {
      title: 'Volkswagen Catalog',
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Volkswagen.'
    }
  };

  if (brand && brandData[brand]) {
    document.getElementById('brand-title').textContent = brandData[brand].title;
    document.getElementById('brand-description').textContent = brandData[brand].description;
  } else {
    var contentElement = document.getElementById('content');

    if (contentElement) {
      contentElement.innerHTML = '<p>Бренд не найден.</p>';
    } else {
      console.error('Элемент с id="content" не найден.');
    }
  }
}); // Функция для загрузки данных из JSON

function loadData() {
  var response, data;
  return regeneratorRuntime.async(function loadData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('..data/data_ukr.json'));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          return _context.abrupt("return", data.Sheet1);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Ошибка загрузки данных:', _context.t0);
          return _context.abrupt("return", []);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
} // Функция для фильтрации данных по марке и году


function filterCars(cars, brand) {
  var minYear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2000;
  return cars.filter(function (car) {
    return car.markaavto.toLowerCase() === brand.toLowerCase() && car.god >= minYear;
  });
} // Функция для создания карточек автомобилей


function createCarCards(brand) {
  var minYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  loadData().then(function (cars) {
    // Фильтруем автомобили по марке и году
    var filteredCars = filterCars(cars, brand, minYear); // Получаем элемент для вставки карточек

    var contentElement = document.getElementById('content');
    if (!contentElement) return; // Очищаем контент

    contentElement.innerHTML = ''; // Если нет автомобилей, показываем сообщение

    if (filteredCars.length === 0) {
      contentElement.innerHTML = '<p>Нет автомобилей для отображения по выбранному фильтру.</p>';
      return;
    } // Создаем карточки для каждого автомобиля


    filteredCars.forEach(function (car) {
      var card = document.createElement('div');
      card.classList.add('car-card'); // Класс для стилей карточки
      // Создаем HTML для карточки

      card.innerHTML = "\n          <div class=\"car-image\">\n            <img src=\"".concat(car.pictures.split(',')[0], "\" alt=\"").concat(car.model, "\" />\n          </div>\n          <div class=\"car-details\">\n            <h3>").concat(car.markaavto, " ").concat(car.model, " (").concat(car.god, ")</h3>\n            <p><strong>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:</strong> ").concat(car.description, "</p>\n            <p><strong>\u0426\u0435\u043D\u0430:</strong> ").concat(car.price, " ").concat(car.currency, "</p>\n            <p><a href=\"").concat(car.link, "\" target=\"_blank\">\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435</a></p>\n          </div>\n        "); // Добавляем карточку на страницу

      contentElement.appendChild(card);
    });
  });
} // Вызов функции для создания карточек для определенной марки (например, Jaguar)


createCarCards('Jaguar', 2012);
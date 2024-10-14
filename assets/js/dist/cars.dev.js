"use strict";

fetch('../data/cars.json').then(function (response) {
  return response.json();
}).then(function (data) {
  createTable(data.cars_in_transit);
})["catch"](function (error) {
  console.error('Помилка завантаження даних:', error);
});

function createTable(cars) {
  var tableContainer = document.getElementById('cars-table');

  if (!tableContainer) {
    console.error('Таблиця не найдена в DOM');
    return;
  }

  var table = document.createElement('table');
  table.innerHTML = "\n    <thead>\n      <tr>\n        <th>\u041D\u0430\u0437\u0432\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u044F</th>\n        <th>\u0411\u0440\u043E\u043D\u044E\u0432\u0430\u043D\u043D\u044F</th>\n      </tr>\n    </thead>\n    <tbody>\n    </tbody>\n  ";
  var tbody = table.querySelector('tbody');
  cars.forEach(function (car) {
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    var carLink = document.createElement('a');
    carLink.href = "#";
    carLink.textContent = car.model;
    carLink.addEventListener('click', function (event) {
      event.preventDefault();
      toggleAccordion(car, row);
    });
    nameCell.appendChild(carLink);
    var bookingCell = document.createElement('td');
    var bookingButton = document.createElement('button');
    bookingButton.textContent = "Забронювати";
    bookingButton.addEventListener('click', function (event) {
      event.preventDefault();
      openFeedbackModal();
    });
    bookingCell.appendChild(bookingButton);
    row.appendChild(nameCell);
    row.appendChild(bookingCell);
    tbody.appendChild(row);
    var accordionRow = document.createElement('tr');
    var accordionCell = document.createElement('td');
    accordionCell.colSpan = 2;
    accordionCell.innerHTML = "\n      <div class=\"accordion-content\" style=\"display: none;\">\n        <div class=\"car-deteils\">\n        <h3>\u041C\u043E\u0434\u0435\u043B\u044C: ".concat(car.model, "</h3>\n        <ul>\n          <li><div class=\"cardeteils-item\">\u0420\u0456\u043A \u0432\u0438\u043F\u0443\u0441\u043A\u0443: </div> ").concat(car.year, "</li>\n          <li><div class=\"cardeteils-item\">\u0410\u0443\u043A\u0446\u0456\u043E\u043D:</div> ").concat(car.auction, "</li>\n          <li><div class=\"cardeteils-item\">\u0414\u0430\u0442\u0430 \u043F\u0440\u043E\u0434\u0430\u0436\u0443:</div> ").concat(car.sale_date, "</li>\n          <li><div class=\"cardeteils-item\">VIN:</div> ").concat(car.vin, "</li>\n          <li><div class=\"cardeteils-item\">\u0421\u0442\u0430\u043D:</div> ").concat(car.status, "</li>\n          <li><div class=\"cardeteils-item\">\u0414\u0432\u0438\u0433\u0443\u043D:</div> ").concat(car.engine, "</li>\n          <li><div class=\"cardeteils-item\">\u041F\u0440\u043E\u0431\u0456\u0433:</div> ").concat(car.mileage, "</li>\n          <li><div class=\"cardeteils-item\">\u041F\u0440\u043E\u0434\u0430\u0432\u0435\u0446\u044C:</div> ").concat(car.seller, "</li>\n          <li><div class=\"cardeteils-item\">\u041C\u0456\u0441\u0446\u0435 \u043F\u0440\u043E\u0434\u0430\u0436\u0443:</div> ").concat(car.location, "</li>\n          <li><div class=\"cardeteils-item\">\u041E\u0441\u043D\u043E\u0432\u043D\u0435 \u0443\u0448\u043A\u043E\u0434\u0436\u0435\u043D\u043D\u044F:</div> ").concat(car.primary_damage, "</li>\n          <li><div class=\"cardeteils-item\">\u0414\u0440\u0443\u0433\u043E\u0440\u044F\u0434\u043D\u0435 \u043F\u043E\u0448\u043A\u043E\u0434\u0436\u0435\u043D\u043D\u044F:</div> ").concat(car.secondary_damage, "</li>\n          <li><div class=\"cardeteils-item\">\u041E\u0446\u0456\u043D\u043E\u0447\u043D\u0430 \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C:</div> ").concat(car.estimated_value, "</li>\n          <li><div class=\"cardeteils-item\">\u0426\u0456\u043D\u0430 \u0440\u0435\u043C\u043E\u043D\u0442\u0443:</div> ").concat(car.repair_cost, "</li>\n          <li><div class=\"cardeteils-item\">\u041A\u043E\u0440\u043E\u0431\u043A\u0430 \u043F\u0435\u0440\u0435\u0434\u0430\u0447:</div> ").concat(car.transmission, "</li>\n          <li><div class=\"cardeteils-item\">\u041A\u043E\u043B\u0456\u0440 \u043A\u0443\u0437\u043E\u0432\u0430:</div> ").concat(car.color, "</li>\n          <li><div class=\"cardeteils-item\">\u041F\u0440\u0438\u0432\u0456\u0434:</div> ").concat(car.drive, "</li>\n        </ul>\n        </div>\n         <div id=\"car-slider\">\n        <ul id=\"image-slider-").concat(car.vin, "\" class=\"image-slider\"></ul>\n      </div>\n    ");
    accordionRow.appendChild(accordionCell);
    tbody.appendChild(accordionRow);

    if (car.images && car.images.length > 0) {
      setTimeout(function () {
        var sliderElement = document.getElementById("image-slider-".concat(car.vin));

        if (sliderElement) {
          initImageSlider(car, "image-slider-".concat(car.vin));
        } else {
          console.error("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u043B\u0430\u0439\u0434\u0435\u0440\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0434\u043B\u044F ".concat(car.vin));
        }
      }, 0);
    }
  });
  tableContainer.appendChild(table);
}

function toggleAccordion(car, row) {
  var accordionContent = row.nextElementSibling.querySelector('.accordion-content');

  if (accordionContent.style.display === 'none') {
    accordionContent.style.display = 'flex';
  } else {
    accordionContent.style.display = 'none';
  }
}

function initImageSlider(car, sliderId) {
  var imageSlider = document.getElementById(sliderId);
  var ulElement = document.createElement('ul');
  car.images.forEach(function (imagePath, index) {
    var fullPath = "../img/cars/".concat(imagePath.replace('../img/cars/', ''));
    var imageLi = document.createElement('li');
    imageLi.setAttribute('data-thumb', fullPath);
    imageLi.innerHTML = "<a href=\"".concat(fullPath, "\" data-lightgallery=\"item\">\n                           <img src=\"").concat(fullPath, "\" alt=\"\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 ").concat(car.model, " ").concat(index + 1, "\">\n                         </a>");
    ulElement.appendChild(imageLi);
  });
  imageSlider.appendChild(ulElement);
  $(ulElement).lightSlider({
    gallery: true,
    item: 1,
    vertical: true,
    thumbItem: car.images.length,
    slideMargin: 10,
    enableDrag: true,
    currentPagerPosition: 'left',
    controls: true,
    verticalHeight: 500,
    auto: true,
    loop: true,
    onSliderLoad: function onSliderLoad() {
      console.log('Слайдер загружен');
      lightGallery(imageSlider, {
        selector: 'a[data-lightgallery="item"]',
        allowMediaOverlap: true,
        toggleThumb: true
      });
    }
  });
}

function openFeedbackModal() {
  var feedbackModal = document.getElementById('feedback-modal');

  if (feedbackModal) {
    console.log('Відкриття модального вікна');
    feedbackModal.classList.add('active');
  } else {
    console.error('Модальне вікно не знайдено');
  }
}

function closeModals() {
  var modals = document.querySelectorAll('.modal');
  modals.forEach(function (modal) {
    return modal.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var closeBtn = document.querySelector('.close');
  var closeFeedbackBtn = document.querySelector('.close-feedback');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModals);
  }

  if (closeFeedbackBtn) {
    closeFeedbackBtn.addEventListener('click', closeModals);
  }
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
});
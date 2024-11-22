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
  table.innerHTML = "\n    <thead>\n      <tr>\n        <th><div class=\"cars-title\">\u041D\u0430\u0437\u0432\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u044F</div></th>\n        <th><div class=\"cars-title\">\u0411\u0440\u043E\u043D\u044E\u0432\u0430\u043D\u043D\u044F</div></th>\n      </tr>\n    </thead>\n    <tbody>\n    </tbody>\n  ";
  var tbody = table.querySelector('tbody');
  cars.forEach(function (car) {
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    var wrapperDiv = document.createElement('div');
    var carLink = document.createElement('a');
    carLink.href = "#";
    carLink.textContent = car.model;
    carLink.addEventListener('click', function (event) {
      event.preventDefault();
      toggleAccordion(car, row);
    });
    wrapperDiv.appendChild(carLink);
    nameCell.appendChild(wrapperDiv);
    row.appendChild(nameCell);
    var bookingCell = document.createElement('td');
    var bookingButton = document.createElement('button');
    bookingButton.textContent = "Забронювати";
    bookingButton.addEventListener('click', function (event) {
      event.preventDefault();
      openFeedbackModal();
    });
    bookingCell.appendChild(bookingButton); // row.appendChild(nameCell);

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
    controls: false,
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

var modal = document.getElementById('feedback-modal');
var overlay = document.querySelector('.overlay');
var closeModalButton = document.querySelector('.close-feedback');
var openModalButton = document.querySelector('#btn-cars-order');
openModalButton.addEventListener('click', function () {
  modal.classList.add('active');
  overlay.classList.add('active');
});
closeModalButton.addEventListener('click', function () {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});

function openFeedbackModal() {
  var feedbackModal = document.getElementById('feedback-modal');
  var overlay = document.querySelector('.overlay');

  if (feedbackModal && overlay) {
    console.log('Відкриття модального вікна');
    feedbackModal.classList.add('active');
    overlay.classList.add('active');
  } else {
    console.error('Модальне вікно або overlay не знайдено');
  }
}

function closeModals() {
  var modals = document.querySelectorAll('.modal');
  var overlay = document.querySelector('.overlay');
  modals.forEach(function (modal) {
    return modal.classList.remove('active');
  });

  if (overlay) {
    overlay.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var closeFeedbackBtn = document.querySelector('.close-feedback');

  if (closeFeedbackBtn) {
    closeFeedbackBtn.addEventListener('click', closeModals);
  }
}); // form

document.getElementById('feedback-form_cars').addEventListener('submit', function (event) {
  event.preventDefault();
  var nameFld = document.getElementById('name');
  var telFld = document.getElementById('phone');
  var emailFld = document.getElementById('email');
  var rozdiFld = document.getElementById('rozdil');
  var pidrozdiFld = document.getElementById('pidrozdil');
  var zapchastFld = document.getElementById('zapchast');
  var commentsFld = document.getElementById('comments');
  var name = nameFld.value.trim();
  var phone = telFld.value.trim();
  var email = emailFld.value.trim();
  var rozdi = rozdiFld.value.trim();
  var pidrozdi = pidrozdiFld.value.trim();
  var zapchast = zapchastFld.value.trim();
  var comments = commentsFld.value.trim();
  var errors = []; // Очистка классов ошибок

  nameFld.classList.remove('is-invalid');
  telFld.classList.remove('is-invalid'); // Валидация имени

  if (name === '') {
    toast.error("Введіть, будь ласка, Ваше ім'я");
    nameFld.classList.add('is-invalid');
  } else if (name.length < 2) {
    toast.error("Ваше ім'я занадто коротке");
    nameFld.classList.add('is-invalid');
  } else {
    nameFld.classList.remove('is-invalid');
  }

  if (phone === '' || phone.length < 17) {
    toast.error('Введіть, будь ласка, правильний номер телефону');
    telFld.classList.add('is-invalid');
  } else {
    telFld.classList.remove('is-invalid');
  }

  if (email === '') {
    toast.error("Введіть, будь ласка, Вашу електронну пошту");
    emailFld.classList.add('is-invalid');
  } else if (!isValidEmail(email)) {
    toast.error("Невірний формат електронної пошти");
    emailFld.classList.add('is-invalid');
  } else {
    emailFld.classList.remove('is-invalid');
  } // Если есть ошибки, не отправляйте форму


  if (nameFld.classList.contains('is-invalid') || telFld.classList.contains('is-invalid') || emailFld.classList.contains('is-invalid')) {
    return;
  } // Отправка данных в Telegram


  var CHAT_ID = '836622266';
  var BOT_TOKEN = '7527794477:AAFxOk9l6CH8EccTk9at2uVM3OSyEZbrUCw';
  var message = "\n\uD83D\uDE97 <b>\u041D\u043E\u0432\u0435 \u0431\u0440\u043E\u043D\u044E\u0432\u0430\u043D\u043D\u044F \u0430\u0432\u0442\u043E</b> \uD83D\uDE97\n\n    \u0406\u043C'\u044F: ".concat(name, "\n\n    \u0422\u0435\u043B\u0435\u0444\u043E\u043D: ").concat(phone, "\n\n    Email: ").concat(email, "\n\n    \u0420\u043E\u0437\u0434\u0456\u043B \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D: ").concat(rozdi, "\n\n    \u041F\u0456\u0434\u0440\u043E\u0437\u0434\u0456\u043B \u0437\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D: ").concat(pidrozdi, "\n\n    \u0417\u0430\u043F\u0447\u0430\u0441\u0442\u0438\u043D\u0438: ").concat(zapchast, "\n\n    \u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440\u0456: ").concat(comments || 'Без коментарів', "\n  ");
  var url = "https://api.telegram.org/bot".concat(BOT_TOKEN, "/sendMessage?chat_id=").concat(CHAT_ID, "&text=").concat(encodeURIComponent(message), "&parse_mode=HTML");
  fetch(url, {
    method: 'POST'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.ok) {
      nameFld.value = '';
      telFld.value = '';
      toast.success('Ваше повідомлення успішно надіслано.');
      closeModals();
    } else {
      toast.error('Сталася помилка.');
    }
  })["catch"](function (error) {
    toast.error('Помилка: ' + error.message);
  });
}); // Форматирование телефона

document.getElementById('phone').addEventListener('input', function (e) {
  var input = e.target.value.replace(/\D/g, '');
  var formattedInput = '';
  if (input.length > 0) formattedInput += '+38 (';
  if (input.length >= 1) formattedInput += input.substring(0, 3);
  if (input.length >= 4) formattedInput += ') ' + input.substring(3, 6);
  if (input.length >= 7) formattedInput += '-' + input.substring(6, 8);
  if (input.length >= 9) formattedInput += '-' + input.substring(8, 10);
  e.target.value = formattedInput;
}); // Запрещаем ввод чисел в поле имени

document.getElementById('name').addEventListener('input', function (e) {
  e.target.value = e.target.value.replace(/[^A-Za-zА-Яа-яІіЇїЄє']/g, '');
});

function isValidEmail(email) {
  var emailPattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailPattern.test(email);
}
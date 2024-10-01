"use strict";

// Завантаження даних з JSON
fetch('../data/cars.json').then(function (response) {
  return response.json();
}).then(function (data) {
  createTable(data.cars_in_transit);
})["catch"](function (error) {
  console.error('Помилка завантаження даних:', error);
}); // Функція для створення таблиці автомобілів

function createTable(cars) {
  var tableContainer = document.getElementById('cars-table');
  var table = document.createElement('table');
  table.innerHTML = "\n    <thead>\n      <tr>\n        <th>\u041D\u0430\u0437\u0432\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u044F</th>\n        <th>\u0411\u0440\u043E\u043D\u044E\u0432\u0430\u043D\u043D\u044F</th>\n      </tr>\n    </thead>\n    <tbody>\n    </tbody>\n  ";
  var tbody = table.querySelector('tbody');
  cars.forEach(function (car) {
    var row = document.createElement('tr'); // Назва автомобіля з посиланням для відкриття модального вікна

    var nameCell = document.createElement('td');
    var carLink = document.createElement('a');
    carLink.href = "#";
    carLink.textContent = car.model;
    carLink.addEventListener('click', function (event) {
      event.preventDefault(); // Предотвращаем переход по ссылке

      openCarModal(car);
    });
    nameCell.appendChild(carLink); // Кнопка для бронювання

    var bookingCell = document.createElement('td');
    var bookingButton = document.createElement('button');
    bookingButton.textContent = "Забронювати";
    bookingButton.addEventListener('click', function (event) {
      event.preventDefault(); // Предотвращаем действие по умолчанию кнопки

      openFeedbackModal();
    });
    bookingCell.appendChild(bookingButton);
    row.appendChild(nameCell);
    row.appendChild(bookingCell);
    tbody.appendChild(row);
  });
  tableContainer.appendChild(table);
}

function openCarModal(car) {
  var modal = document.getElementById('car-modal');
  var carDetails = document.getElementById('car-details');
  var overlay = document.querySelector('.page-overlay');
  carDetails.innerHTML = "<h2>".concat(car.model, " (").concat(car.year, ")</h2>");
  modal.classList.add('active');
  overlay.classList.add('active');
}

function openFeedbackModal() {
  var feedbackModal = document.getElementById('feedback-modal');
  var overlay = document.querySelector('.page-overlay');
  feedbackModal.classList.add('active');
  overlay.classList.add('active');
}

function closeModals() {
  var carModal = document.getElementById('car-modal');
  var feedbackModal = document.getElementById('feedback-modal');
  var overlay = document.querySelector('.page-overlay');
  carModal.classList.remove('active');
  feedbackModal.classList.remove('active');
  overlay.classList.remove('active');
}

document.querySelector('.close').addEventListener('click', closeModals);
document.querySelector('.close-feedback').addEventListener('click', closeModals);
window.addEventListener('click', function (event) {
  var overlay = document.querySelector('.page-overlay');

  if (event.target === overlay) {
    closeModals();
  }
}); //hamburger-menu

document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});
document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});
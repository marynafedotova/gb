// Завантаження даних з JSON
fetch('../data/cars.json')
  .then(response => response.json())
  .then(data => {
    createTable(data.cars_in_transit);
  })
  .catch(error => {
    console.error('Помилка завантаження даних:', error);
  });

// Функція для створення таблиці автомобілів
function createTable(cars) {
  const tableContainer = document.getElementById('cars-table');
  
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Назва автомобіля</th>
        <th>Бронювання</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;
  
  const tbody = table.querySelector('tbody');
  
  cars.forEach((car) => {
    const row = document.createElement('tr');
    
    // Назва автомобіля з посиланням для відкриття модального вікна
    const nameCell = document.createElement('td');
    const carLink = document.createElement('a');
    carLink.href = "#";
    carLink.textContent = car.model;
    carLink.addEventListener('click', (event) => {
      event.preventDefault(); // Предотвращаем переход по ссылке
      openCarModal(car);
    });
    nameCell.appendChild(carLink);
    
    // Кнопка для бронювання
    const bookingCell = document.createElement('td');
    const bookingButton = document.createElement('button');
    bookingButton.textContent = "Забронювати";
    bookingButton.addEventListener('click', (event) => {
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
  const modal = document.getElementById('car-modal');
  const carDetails = document.getElementById('car-details');

  if (modal && carDetails) {
    modal.classList.add('active'); // Активируем модальное окно
    carDetails.innerHTML = `<h2>${car.model} (${car.year})</h2>`;
  }
}
function closeModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => modal.classList.remove('active')); // Закрываем все модальные окна
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('.close');
  const closeFeedbackBtn = document.querySelector('.close-feedback');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModals);
  }

  if (closeFeedbackBtn) {
    closeFeedbackBtn.addEventListener('click', closeModals);
  }

  // Убираем логику работы с оверлеем
});

function openFeedbackModal() {
  const feedbackModal = document.getElementById('feedback-modal');

  if (feedbackModal) {
    feedbackModal.classList.add('active'); // Активируем модальное окно
  }
}

//header
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
  const scrollDistance = window.scrollY;
  const threshold = 30;

  if (scrollDistance > threshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

//hamburger-menu
document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu')
})

document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu')
})
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
document.addEventListener('touchstart', function(){}, { passive: true });
document.addEventListener('touchmove', function(){}, { passive: true });

function openCarModal(car) {
  const modal = document.getElementById('car-modal');
  const carDetails = document.getElementById('car-details');
  const imageSlider = document.getElementById('image-slider');

  // Очистка предыдущих данных
  carDetails.innerHTML = '';
  imageSlider.innerHTML = '';

  if (modal && carDetails) {
    modal.classList.add('active'); // Активируем модальное окно
    
    // Добавляем данные об автомобиле
    carDetails.innerHTML = `
      <h3>Модель: ${car.model}</h3>
      <ul>
        <li><div class="cardeteils-item">Рік випуску: </div> ${car.year}</li>
        <li><div class="cardeteils-item">Аукціон:</div> ${car.auction}</li>
        <li><div class="cardeteils-item">Дата продажу:</div> ${car.sale_date}</li>
        <li><div class="cardeteils-item">VIN:</div> ${car.vin}</li>
        <li><div class="cardeteils-item">Стан:</div> ${car.status}</li>
        <li><div class="cardeteils-item">Двигун:</div> ${car.engine}</li>
        <li><div class="cardeteils-item">Пробіг:</div> ${car.mileage}</li>
        <li><div class="cardeteils-item">Продавець:</div> ${car.seller}</li>
        <li><div class="cardeteils-item">Місце продажу:</div> ${car.location}</li>
        <li><div class="cardeteils-item">Основне ушкодження:</div> ${car.primary_damage}</li>
        <li><div class="cardeteils-item">Другорядне пошкодження:</div> ${car.secondary_damage}</li>
        <li><div class="cardeteils-item">Оціночна вартість:</div> ${car.estimated_value}</li>
        <li><div class="cardeteils-item">Ціна ремонту:</div> ${car.repair_cost}</li>
        <li><div class="cardeteils-item">Коробка передач:</div> ${car.transmission}</li>
        <li><div class="cardeteils-item">Колір кузова:</div> ${car.color}</li>
        <li><div class="cardeteils-item">Привід:</div> ${car.drive}</li>
      </ul>`;

    // Добавляем изображения в основной слайдер
    if (car.images && car.images.length > 0) {
      car.images.forEach((imagePath, index) => {
        // Правильный относительный путь с учётом вложенности
        const fullPath = `../img/cars/${imagePath.replace('../img/cars/', '')}`;
        
        // Добавление изображения и миниатюры в основной слайдер
        const imageLi = document.createElement('li');
        imageLi.setAttribute('data-thumb', fullPath);
        imageLi.innerHTML = `<img src="${fullPath}" alt="Изображение ${car.model} ${index + 1}">`;
        imageSlider.appendChild(imageLi);
    });
    

      // Инициализация основного слайдера с миниатюрами
      $('#image-slider').lightSlider({
        gallery: true,
        item: 1,
        vertical: true,
        thumbItem: 4,
        slideMargin: 0,
        enableDrag: true,
        currentPagerPosition: 'left',
        controls: false,
        // adaptiveHeight: true,
        auto:true,
        loop:true,
        verticalHeight: 500,
        onSliderLoad: function () {
           console.log('Основной слайдер загружен');
        }
      });
     
    } else {
      console.error("Изображения для автомобиля отсутствуют");
    }

    document.getElementById('image-slider').addEventListener('touchstart', function(event) {
      // Ваш обработчик touchstart
  }, { passive: true });
  
  document.getElementById('image-slider').addEventListener('touchmove', function(event) {
      // Ваш обработчик touchmove
  }, { passive: true });  
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
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
  if (!tableContainer) {
    console.error('Таблиця не найдена в DOM');
    return;
  }
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
    
    // Назва автомобіля з посиланням для відкриття аккордеону
    const nameCell = document.createElement('td');
    const carLink = document.createElement('a');
    carLink.href = "#";
    carLink.textContent = car.model;
    carLink.addEventListener('click', (event) => {
      event.preventDefault();
      toggleAccordion(car, row); // Открыть/закрыть аккордеон при нажатии
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
    
    // Создаем аккордеон под строкой автомобиля
    const accordionRow = document.createElement('tr');
    const accordionCell = document.createElement('td');
    accordionCell.colSpan = 2; // Аккордеон занимает обе колонки
    accordionCell.innerHTML = `
      <div class="accordion-content" style="display: none;">
        <div class="car-deteils">
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
        </ul>
        </div>
         <div id="car-slider">
        <ul id="image-slider-${car.vin}" class="image-slider"></ul>
      </div>
    `;
    
    accordionRow.appendChild(accordionCell);
    tbody.appendChild(accordionRow);

    if (car.images && car.images.length > 0) {
      setTimeout(() => {
        const sliderElement = document.getElementById(`image-slider-${car.vin}`);
        if (sliderElement) {
          initImageSlider(car, `image-slider-${car.vin}`);
        } else {
          console.error(`Элемент слайдера не найден для ${car.vin}`);
        }
      }, 0); 
    }
  }); 

  tableContainer.appendChild(table); 
}

// Функция для открытия/закрытия аккордеона
function toggleAccordion(car, row) {
  const accordionContent = row.nextElementSibling.querySelector('.accordion-content');
  if (accordionContent.style.display === 'none') {
    accordionContent.style.display = 'flex';
  } else {
    accordionContent.style.display = 'none';
  }
}

function initImageSlider(car, sliderId) {
  const imageSlider = document.getElementById(sliderId);
  const ulElement = document.createElement('ul');

  car.images.forEach((imagePath, index) => {
    const fullPath = `../img/cars/${imagePath.replace('../img/cars/', '')}`;
    
    // Создание элемента списка для слайдера
    const imageLi = document.createElement('li');
    imageLi.setAttribute('data-thumb', fullPath);
    imageLi.innerHTML = `<a href="${fullPath}" data-lightgallery="item">
                           <img src="${fullPath}" alt="Изображение ${car.model} ${index + 1}">
                         </a>`;
    ulElement.appendChild(imageLi);
  });

  // Добавляем созданный ul к слайдеру
  imageSlider.appendChild(ulElement);

  // Инициализируем LightSlider
  $(ulElement).lightSlider({
    gallery: true,
    item: 1,
    vertical: true,
    thumbItem: car.images.length, // Количество миниатюр
    slideMargin: 10,
    enableDrag: true,
    currentPagerPosition: 'left',
    controls: true,
    verticalHeight: 500,
    auto: true,
    loop: true,
    onSliderLoad: function () {
      console.log('Слайдер загружен');
      // Инициализация LightGallery
      lightGallery(imageSlider, {
        selector: 'a[data-lightgallery="item"]', // Используем ссылку с атрибутом data-lightgallery
        allowMediaOverlap: true,
        toggleThumb: true
      });
    }
  });
}


function openFeedbackModal() {
  const feedbackModal = document.getElementById('feedback-modal');
  if (feedbackModal) {
      console.log('Відкриття модального вікна');
      feedbackModal.classList.add('active');
  } else {
      console.error('Модальне вікно не знайдено');
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
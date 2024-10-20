fetch('../data/cars.json')
  .then(response => response.json())
  .then(data => {
    createTable(data.cars_in_transit);
  })
  .catch(error => {
    console.error('Помилка завантаження даних:', error);
  });

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
        <th><div class="cars-title">Назва автомобіля</div></th>
        <th><div class="cars-title">Бронювання</div></th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;
  
  const tbody = table.querySelector('tbody');

  cars.forEach((car) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const wrapperDiv = document.createElement('div');
    const carLink = document.createElement('a');
    carLink.href = "#";
    carLink.textContent = car.model;
    carLink.addEventListener('click', (event) => {
      event.preventDefault();
      toggleAccordion(car, row);
    });
    wrapperDiv.appendChild(carLink);
    nameCell.appendChild(wrapperDiv);
    row.appendChild(nameCell);
    const bookingCell = document.createElement('td');
    const bookingButton = document.createElement('button');
    bookingButton.textContent = "Забронювати";
    bookingButton.addEventListener('click', (event) => {
      event.preventDefault();
      openFeedbackModal();
    });
    bookingCell.appendChild(bookingButton);
    
    // row.appendChild(nameCell);
    row.appendChild(bookingCell);
    tbody.appendChild(row);
    
    const accordionRow = document.createElement('tr');
    const accordionCell = document.createElement('td');
    accordionCell.colSpan = 2; 
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
    const imageLi = document.createElement('li');
    imageLi.setAttribute('data-thumb', fullPath);
    imageLi.innerHTML = `<a href="${fullPath}" data-lightgallery="item">
                           <img src="${fullPath}" alt="Изображение ${car.model} ${index + 1}">
                         </a>`;
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
    onSliderLoad: function () {
      console.log('Слайдер загружен');
      lightGallery(imageSlider, {
        selector: 'a[data-lightgallery="item"]', 
        allowMediaOverlap: true,
        toggleThumb: true
      });
    }
  });
}
const modal = document.getElementById('feedback-modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.close-feedback');
const openModalButton = document.querySelector('#btn-cars-order');

openModalButton.addEventListener('click', () => {
  modal.classList.add('active');
  overlay.classList.add('active');
});

closeModalButton.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});

function openFeedbackModal() {
  const feedbackModal = document.getElementById('feedback-modal');
  const overlay = document.querySelector('.overlay');
  
  if (feedbackModal && overlay) {
    console.log('Відкриття модального вікна');
    feedbackModal.classList.add('active');
    overlay.classList.add('active');
  } else {
    console.error('Модальне вікно або overlay не знайдено');
  }
}

function closeModals() {
  const modals = document.querySelectorAll('.modal');
  const overlay = document.querySelector('.overlay');
  
  modals.forEach(modal => modal.classList.remove('active'));
  if (overlay) {
    overlay.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const closeFeedbackBtn = document.querySelector('.close-feedback');

  if (closeFeedbackBtn) {
    closeFeedbackBtn.addEventListener('click', closeModals);
  }
});

// form
document.getElementById('feedback-form_cars').addEventListener('submit', function(event) {
  event.preventDefault();

  const nameFld = document.getElementById('name');
  const telFld = document.getElementById('phone');
  const emailFld = document.getElementById('email');
  const rozdiFld = document.getElementById('rozdil');
  const pidrozdiFld = document.getElementById('pidrozdil');
  const zapchastFld = document.getElementById('zapchast');
  const commentsFld = document.getElementById('comments');

  const name = nameFld.value.trim();
  const phone = telFld.value.trim();
  const email = emailFld.value.trim();
  const rozdi = rozdiFld.value.trim();
  const pidrozdi = pidrozdiFld.value.trim();
  const zapchast = zapchastFld.value.trim();
  const comments = commentsFld.value.trim();

  const errors = [];

  // Очистка классов ошибок
  nameFld.classList.remove('is-invalid');
  telFld.classList.remove('is-invalid');

  // Валидация имени
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
}
// Если есть ошибки, не отправляйте форму
if (nameFld.classList.contains('is-invalid') || telFld.classList.contains('is-invalid') || emailFld.classList.contains('is-invalid')) {
  return;
}
  // Отправка данных в Telegram
  const CHAT_ID = '836622266';
  const BOT_TOKEN = '7527794477:AAFxOk9l6CH8EccTk9at2uVM3OSyEZbrUCw';
  const message = `
🚗 <b>Нове бронювання авто</b> 🚗\n
    Ім'я: ${name}\n
    Телефон: ${phone}\n
    Email: ${email}\n
    Розділ запчастин: ${rozdi}\n
    Підрозділ запчастин: ${pidrozdi}\n
    Запчастини: ${zapchast}\n
    Коментарі: ${comments || 'Без коментарів'}
  `;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=HTML`;

  fetch(url, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      nameFld.value = '';
      telFld.value = '';
      toast.success('Ваше повідомлення успішно надіслано.');
      closeModals();
    } else {
      toast.error('Сталася помилка.');
    }
  })
  .catch(error => {
    toast.error('Помилка: ' + error.message);
  });
});

// Форматирование телефона
document.getElementById('phone').addEventListener('input', function(e) {
  let input = e.target.value.replace(/\D/g, ''); 
  let formattedInput = '';

  if (input.length > 0) formattedInput += '+38 (';
  if (input.length >= 1) formattedInput += input.substring(0, 3);
  if (input.length >= 4) formattedInput += ') ' + input.substring(3, 6);
  if (input.length >= 7) formattedInput += '-' + input.substring(6, 8);
  if (input.length >= 9) formattedInput += '-' + input.substring(8, 10);

  e.target.value = formattedInput;
});

// Запрещаем ввод чисел в поле имени
document.getElementById('name').addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/[^A-Za-zА-Яа-яІіЇїЄє']/g, '');
});

function isValidEmail(email) {
  const emailPattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailPattern.test(email);
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
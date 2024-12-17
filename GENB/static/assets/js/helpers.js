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
//lazy

  var lazyLoadInstance = new LazyLoad({});

//  wow
new WOW().init();

//scroll
// document.getElementById('scrollButton').addEventListener('click', function(event) {
//   event.preventDefault();
//   const targetElement = document.getElementById('news');
//   const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
//   window.scrollTo({
//     top: targetPosition,
//     behavior: 'smooth'
//   });
// });

// Код для обработки кликов по ссылкам
document.querySelectorAll('.submenu a').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const brand = this.querySelector('img').alt.toLowerCase();
    const pageUrl = `catalog-template.html?brand=${brand}`;
    window.location.href = pageUrl;
  });
});
document.querySelectorAll('.catalog-list a').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const brand = this.querySelector('img').alt.toLowerCase();
    const pageUrl = `catalog-template.html?brand=${brand}`;
    window.location.href = pageUrl;
  });
});
// form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedback_form');
  const nameFld = document.getElementById('exampleInputName');
  const telFld = document.getElementById('exampleInputTel');

  if (!form || !nameFld || !telFld) {
    console.error('Form or fields not found!');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameFld.value ? nameFld.value.trim() : ''; 
    const tel = telFld.value ? telFld.value.trim() : '';

    const errors = [];

    // Очистка классов ошибок
    nameFld.classList.remove('is-invalid');
    telFld.classList.remove('is-invalid');

    if (name === '') {
      errors.push("Введіть, будь ласка, Ваше ім'я");
      nameFld.classList.add('is-invalid');
    } else if (name.length < 2) {
      errors.push('Ваше ім\'я занадто коротке');
      nameFld.classList.add('is-invalid');
    }

    if (tel === '' || tel.length < 17) { 
      errors.push('Введіть, будь ласка, правильний номер телефону');
      telFld.classList.add('is-invalid');
    }

    if (errors.length > 0) {
      toast.error(errors.join('. '));
      return;
    }

    const CHAT_ID = '-1002278785620';
    const BOT_TOKEN = '8046931960:AAHhJdRaBEv_3zyB9evNFxZQlEdiz8FyWL8';
    const message = `<b>Ім'я: </b> ${name}\r\n<b>Телефон: </b>${tel}`;
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
      } else {
        toast.error('Сталася помилка.');
      }
    })
    .catch(error => {
      toast.error('Помилка: ' + error.message);
    });
  });

  if (telFld) {
    telFld.addEventListener('input', function (e) {
      let input = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
      const prefix = '38'; // Префикс для Украины
      const maxLength = 12; // Максимальная длина номера
  
      if (!input.startsWith(prefix)) {
        input = prefix + input;
      }
  
      if (input.length > maxLength) {
        input = input.substring(0, maxLength);
      }

      let formattedInput = '+38';
      if (input.length > 2) {
        formattedInput += ' (' + input.substring(2, 5); 
      }
      if (input.length > 5) {
        formattedInput += ') ' + input.substring(5, 8); 
      }
      if (input.length > 8) {
        formattedInput += '-' + input.substring(8, 10);
      }
      if (input.length > 10) {
        formattedInput += '-' + input.substring(10, 12); 
      }

      const cursorPosition = e.target.selectionStart; 
      const prevLength = e.target.value.length; 
      const newLength = formattedInput.length;
      const diff = newLength - prevLength;
  
      e.target.value = formattedInput;
  
      if (diff > 0 && cursorPosition >= prevLength) {
        e.target.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
      } else if (diff < 0 && cursorPosition > newLength) {
        e.target.setSelectionRange(newLength, newLength);
      } else {
        e.target.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  }

  nameFld.addEventListener('input', function (e) {
    let input = e.target.value;
    e.target.value = input.replace(/[^A-Za-zА-Яа-яІіЇїЄє']/g, '');
  });

  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
});

//копірайт
document.addEventListener("DOMContentLoaded", function() {
  const currentYear = new Date().getFullYear();
  document.getElementById("year").textContent = currentYear;
});

//search
const urlMonoBank = 'https://api.monobank.ua/bank/currency';
let products = [];
let usdToUahRate = 1;
let displayedProductCount = 0;
const PRODUCTS_PER_PAGE = 12; 


async function fetchCurrencyRate() {
  try {
    const cachedRate = localStorage.getItem('usdToUahRate');
    const cachedTime = localStorage.getItem('usdToUahRateTime');
    const now = Date.now();

    if (cachedRate && cachedTime && now - cachedTime < 5 * 60 * 1000) {
      usdToUahRate = parseFloat(cachedRate);
      return;
    }

    const response = await fetch(urlMonoBank);
    if (!response.ok) throw new Error('Не удалось получить курс валют');
    const data = await response.json();
    const usdToUah = data.find(item => item.currencyCodeA === 840);
    if (usdToUah && usdToUah.rateSell) {
      usdToUahRate = usdToUah.rateSell;

      // Сохраняем курс в кэш
      localStorage.setItem('usdToUahRate', usdToUahRate);
      localStorage.setItem('usdToUahRateTime', now);
    }
  } catch (error) {
    console.error('Ошибка при получении курса валют:', error);
  }
}

// Функция для получения продуктов
async function fetchProducts() {
  try {
    const response = await fetch('../data/data_ukr.json');
    if (!response.ok) throw new Error('Не удалось загрузить продукты');
    const data = await response.json();
    if (!data.Sheet1 || !Array.isArray(data.Sheet1)) throw new Error('Некорректный формат данных');
    products = data.Sheet1;
  } catch (error) {
    console.error('Ошибка при получении данных продуктов:', error);
  }
}

// Функция для отображения продуктов
function displayProducts(filteredProducts) {
  const productContainer = document.querySelector('.search-results');
  const loadMoreButton = document.querySelector('.load-more-search');

  if (!productContainer || !loadMoreButton) {
    console.error('Контейнер для товаров или кнопка "Загрузить ещё" не найдены');
    return;
  }

  // Если это первый запуск, очищаем контейнер
  if (displayedProductCount === 0) {
    productContainer.innerHTML = '';
  }

  // Если нет товаров
  if (filteredProducts.length === 0) {
    productContainer.innerHTML = '<p>Ничего не найдено.</p>';
    return;
  }

  // Отображаем товары постранично
  const nextProducts = filteredProducts.slice(displayedProductCount, displayedProductCount + PRODUCTS_PER_PAGE);

  nextProducts.forEach(product => {
    const priceInUah = Math.ceil(product.zena * usdToUahRate);
    const photoUrl = product.photo ? product.photo.split(',')[0].trim() : 'default-photo.jpg';
    const productCard = `
      <div class="product-card">
        <img src="${photoUrl}" alt="${product.zapchast}">
        <div>Артикул: ${product.ID_EXT}</div>
        <h3>${product.zapchast}</h3>
        <p>Цена: ${product.zena} ${product.valyuta} / ${priceInUah} грн</p>
        <div class="btn-cart">
          <button class="add-to-cart" data-id="${product.ID_EXT}" data-price="${priceInUah}">Додати до кошика</button>
        </div>
        <div class="product_btn">
          <a href="assets/pages/product.html?id=${product.ID_EXT}">Детальніше</a>
        </div>
      </div>`;
    productContainer.insertAdjacentHTML('beforeend', productCard);
  });

  // Обновляем счётчик отображённых товаров
  displayedProductCount += nextProducts.length;

  // Показываем кнопку, если есть ещё товары
  if (displayedProductCount < filteredProducts.length) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
}

// Обработчик кнопки "Загрузить ещё"
document.querySelector('.load-more-search').addEventListener('click', function () {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const filteredProducts = products.filter(product =>
    (product.zapchast && product.zapchast.toLowerCase().includes(query)) ||
    (product.markaavto && product.markaavto.toLowerCase().includes(query)) ||
    (product.model && product.model.toLowerCase().includes(query))
  );
  displayProducts(filteredProducts);
});

// Обработчик формы поиска
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const query = document.getElementById('search-input').value.trim().toLowerCase();
  console.log('Search query:', query);
  if (query) {

    const filteredProducts = products.filter(product => {
      return (product.ID_EXT && product.ID_EXT.toLowerCase().includes(query)) || 
             (product.zapchast && product.zapchast.toLowerCase().includes(query)) || 
             (product.markaavto && product.markaavto.toLowerCase().includes(query)) ||
             (product.model && product.model.toLowerCase().includes(query)) ||
            (product.category && product.category.toLowerCase().includes(query)) ||
            (product.dop_category && product.dop_category.toLowerCase().includes(query)) ||
            (product.originalnumber && product.originalnumber.toLowerCase().includes(query));
    });
    console.log('Filtered products:', filteredProducts); 
    displayedProductCount = 0;
    displayProducts(filteredProducts);
  } else {
    displayedProductCount = 0;
    displayProducts([]);
  }

  const resultsContainer = document.querySelector('.search-results');
  if (resultsContainer) {
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});


document.getElementById('search-input').addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();

  if (query) {
    const filteredProducts = products.filter(product => {
      return (product.ID_EXT && product.ID_EXT.toLowerCase().includes(query)) || 
             (product.zapchast && product.zapchast.toLowerCase().includes(query)) || 
             (product.markaavto && product.markaavto.toLowerCase().includes(query)) ||
             (product.model && product.model.toLowerCase().includes(query)) ||
            (product.category && product.category.toLowerCase().includes(query)) ||
            (product.dop_category && product.dop_category.toLowerCase().includes(query)) ||
            (product.originalnumber && product.originalnumber.toLowerCase().includes(query));
    });

    displayedProductCount = 0;  
    displayProducts(filteredProducts);
  } else {
    displayedProductCount = 0;
    displayProducts([]);
  }
});

//cart

// Обработчик для кнопок добавления товара в корзину
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-to-cart')) {
    const item = {
      id: event.target.dataset.id, 
      name: event.target.dataset.name, 
      price: parseFloat(event.target.dataset.price || 0), 
      quantity: 1, 
      photo: event.target.dataset.photo 
    };

    addToCart(item);
  }
});


// Функция для добавления товара в корзину
function addToCart(item) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || []; 

  const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1; 
  } else {
    cart.push(item); 
  }

  sessionStorage.setItem("cart", JSON.stringify(cart)); 
  console.log('Корзина обновлена:', cart); 
  showCartModal(); 
}

// Функция для отображения модального окна
function showCartModal() {
  const modal = document.getElementById("cartModal");
  const overlay = document.querySelector(".overlay");

  if (modal && overlay) {
    console.log("Показываем модальное окно");  
    modal.classList.remove("hidden");
    overlay.style.display = "block";

    console.log("Стили модального окна:", window.getComputedStyle(modal));
  } else {
    console.error('Модальное окно или затемняющий фон не найдены!');
  }
}


// Функция для закрытия модального окна
function closeCartModal() {
  const modal = document.getElementById("cartModal");
  const overlay = document.querySelector(".overlay");

  if (modal && overlay) {
    modal.classList.add("hidden");  // Добавляем класс hidden для модального окна
    overlay.style.display = "none";  // Убираем стиль display: none для оверлея
  } else {
    console.error('Модальное окно или затемняющий фон не найдены!');
  }
}



// Функция для перехода к оформлению заказа
function proceedToCheckout() {
  closeCartModal();
  window.location.href = "cart.html";
}

// Инициализация
async function initialize() {
  await fetchCurrencyRate();
  await fetchProducts();
}

// Запуск
initialize();

// document.querySelectorAll('.specialisation-list a').forEach(link => {
//   link.addEventListener('click', function (event) {
//     event.preventDefault();
//      const brand = this.querySelector('img').alt.toLowerCase();
//      const pageUrl = `catalog-template.html?brand=${brand}`;
//      window.location.href = pageUrl;
//   });
// });

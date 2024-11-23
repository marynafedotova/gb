const urlMonoBank = 'https://api.monobank.ua/bank/currency';
let usdToUahRate = 1; // Курс USD к UAH
let currentProductIndex = 0;
const productsPerPage = 12;
let products = []; // Все продукты
let searchResults = []; // Результаты поиска
let searchProductIndex = 0; // Индекс текущего отображаемого продукта в поиске
const productsPerSearchPage = 12; // Количество продуктов на одной странице поиска
// Функция для получения курса валют с кешированием
async function fetchCurrencyRate() {
  const cachedRate = localStorage.getItem('usdToUahRate');
  const cachedTime = localStorage.getItem('usdToUahRateTime');
  const now = Date.now();

  if (cachedRate && cachedTime && now - cachedTime < 5 * 60 * 1000) {
    usdToUahRate = parseFloat(cachedRate);
    return;
  }

  try {
    const response = await fetch(urlMonoBank);
    if (!response.ok) throw new Error('Ошибка загрузки курса валют');
    const data = await response.json();
    const usdToUah = data.find(item => item.currencyCodeA === 840);
    if (usdToUah && usdToUah.rateSell) {
      usdToUahRate = usdToUah.rateSell;
      localStorage.setItem('usdToUahRate', usdToUahRate);
      localStorage.setItem('usdToUahRateTime', now);
    }
  } catch (error) {
    console.error('Ошибка получения курса валют:', error);
  }
}

// Функция для отображения товаров
function displayProducts(filteredProducts = []) {
  const isSearch = filteredProducts.length > 0;
  const productContainer = document.querySelector(isSearch ? '.search-results' : '.product-list');

  if (!productContainer) {
    console.error('Контейнер для товаров не найден');
    return;
  }

  if (isSearch) {
    productContainer.innerHTML = ''; // Очистка результатов поиска
  }

  const productsToDisplay = isSearch
    ? filteredProducts
    : products.slice(currentProductIndex, currentProductIndex + productsPerPage);

  productsToDisplay.forEach(product => {
    const priceInUah = Math.ceil(product.zena * usdToUahRate);
    const productCard = `
      <div class="product-card">
        <img src="${product.photo.split(',')[0].trim()}" alt="${product.zapchast}">
        <h3>Артикул: ${product.ID_EXT}</h3>
        <h3>Назва: ${product.zapchast}</h3>
        <p>Ціна: ${product.zena} ${product.valyuta} / ${priceInUah} грн</p>
        <div class="btn-cart">
          <button class="add-to-cart" data-id="${product.ID_EXT}" data-price="${priceInUah}">Додати до кошика</button>
        </div>
        <div class="product_btn">
          <a href="product.html?id=${product.ID_EXT}">Детальніше</a>
        </div>
      </div>`;
    productContainer.insertAdjacentHTML('beforeend', productCard);
  });

  // Обновляем индекс для каталога
  if (!isSearch) {
    currentProductIndex += productsPerPage;
    if (currentProductIndex >= products.length) {
      document.querySelector('.load-more').style.display = 'none';
    }
  } else if (filteredProducts.length === 0) {
    productContainer.innerHTML = '<p>Ничего не найдено.</p>';
  }
}
// Функция для отображения результатов поиска
function displaySearchResults(filteredProducts = []) {
  const productContainer = document.querySelector('.search-results');
  if (!productContainer) {
    console.error('Контейнер для результатов поиска не найден');
    return;
  }

  const productsToDisplay = filteredProducts.slice(
    searchProductIndex,
    searchProductIndex + productsPerSearchPage
  );

  productsToDisplay.forEach(product => {
    const priceInUah = Math.ceil(product.zena * usdToUahRate);
    const productCard = `
      <div class="product-card">
        <img src="${product.photo.split(',')[0].trim()}" alt="${product.zapchast}">
        <h3>Артикул: ${product.ID_EXT}</h3>
        <h3>Назва: ${product.zapchast}</h3>
        <p>Ціна: ${product.zena} ${product.valyuta} / ${priceInUah} грн</p>
        <div class="btn-cart">
          <button class="add-to-cart" data-id="${product.ID_EXT}" data-price="${priceInUah}">Додати до кошика</button>
        </div>
        <div class="product_btn">
          <a href="product.html?id=${product.ID_EXT}">Детальніше</a>
        </div>
      </div>`;
    productContainer.insertAdjacentHTML('beforeend', productCard);
  });

  searchProductIndex += productsPerSearchPage;

  // Управление кнопкой "Загрузить больше"
  const loadMoreButton = document.querySelector('.load-more-search');
  if (searchProductIndex < filteredProducts.length) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
}


// Модификация функции поиска товаров
function searchProducts(query) {
  const lowerCaseQuery = query.toLowerCase();
  searchResults = products.filter(product =>
    (product.zapchast && product.zapchast.toLowerCase().includes(lowerCaseQuery)) ||
    (product.markaavto && product.markaavto.toLowerCase().includes(lowerCaseQuery)) ||
    (product.model && product.model.toLowerCase().includes(lowerCaseQuery))
  );
  searchProductIndex = 0; // Сброс индекса поиска
  displaySearchResults(searchResults); // Отображаем результаты поиска
}

// Обработчик для кнопки "Загрузить больше"
document.querySelector('.load-more').addEventListener('click', function(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    searchProducts(query);
    this.style.display = 'none'; // Скрыть кнопку после загрузки
  }
});

// Обработчик формы поиска
document.getElementById('search-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  await fetchCurrencyRate(); // Получаем актуальный курс валют

  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if (query) {
    searchResults = products.filter(product => 
      (product.zapchast && product.zapchast.toLowerCase().includes(query)) ||
      (product.markaavto && product.markaavto.toLowerCase().includes(query)) ||
      (product.model && product.model.toLowerCase().includes(query))
    );

    searchProductIndex = 0; // Сбрасываем индекс
    document.querySelector('.search-results').innerHTML = ''; // Очищаем предыдущие результаты
    displaySearchResults(searchResults); // Отображаем первую страницу результатов
  } else {
    // Если поле пустое, очищаем результаты поиска
    searchResults = [];
    document.querySelector('.search-results').innerHTML = '<p>Ничего не найдено.</p>';
  }
    // Прокрутка к результатам поиска
    const resultsContainer = document.querySelector('.search-results');
    if (resultsContainer) {
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
document.querySelector('.load-more-search').addEventListener('click', function(event) {
  event.preventDefault();
  displaySearchResults(searchResults); // Загружаем следующую порцию результатов
});

document.querySelector('.load-more').addEventListener('click', function(event) {
  event.preventDefault();
  displayProducts(); // Загружаем следующую порцию товаров для каталога
});



// Функция инициализации каталога
async function initializeCatalog() {
  await fetchCurrencyRate();

  try {
    const response = await fetch('../data/data.json');
    if (!response.ok) throw new Error('Ошибка загрузки JSON');
    const data = await response.json();
    if (!data || !data.Sheet1) throw new Error('Некорректный формат данных');
    products = data.Sheet1;
    displayProducts(); // Отображаем начальные продукты

    document.querySelector('.load-more').addEventListener('click', event => {
      event.preventDefault();
      displayProducts();
    });
  } catch (error) {
    console.error('Ошибка инициализации каталога:', error);
  }
}

// Инициализация
initializeCatalog();



//accordion
fetch(dataJsonUrl)
    .then(response => response.json())
    .then(data => {
        const cars = data.Sheet1
            .filter(item => item.markaavto && item.model) // Исключаем записи с null или пустыми значениями
            .map(item => ({
                markaavto: item.markaavto,
                model: item.model,
                god: item.god // Добавляем год, чтобы передать его в ссылку
            }));

        const carAccordionData = cars.reduce((acc, car) => {
            if (!acc[car.markaavto]) {
                acc[car.markaavto] = new Set();
            }
            acc[car.markaavto].add(JSON.stringify({ model: car.model, god: car.god }));
            return acc;
        }, {});

        const accordionContainer = document.getElementById('carAccordion');
        for (const [make, models] of Object.entries(carAccordionData)) {
            if (!make) continue; // Пропускаем, если марка null или пустая

            const makeDiv = document.createElement('div');
            makeDiv.classList.add('accordion-item');

            const makeHeader = document.createElement('h3');
            makeHeader.textContent = make;
            makeHeader.classList.add('accordion-header');
            makeHeader.addEventListener('click', () => {
                modelList.classList.toggle('active');
            });
            makeDiv.appendChild(makeHeader);

            const modelList = document.createElement('div');
            modelList.classList.add('accordion-content');
            models.forEach(modelData => {
                const { model, god } = JSON.parse(modelData);
                if (model) { // Пропускаем, если модель null или пустая
                    const modelItem = document.createElement('p');
                    modelItem.textContent = model;
                    modelItem.classList.add('model-item');
                    modelItem.addEventListener('click', () => {
                        window.location.href = `./car-page.html?make=${make}&model=${model}&year=${god}`;
                    });
                    modelList.appendChild(modelItem);
                }
            });

            makeDiv.appendChild(modelList);
            accordionContainer.appendChild(makeDiv);
        }
    })
    .catch(error => console.error('Помилка завантаження даних:', error));

//cars
fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        const carsCatalog = document.getElementById('cars-catalog');
        const uniqueCars = new Set();
        const carsArray = [];

        data.Sheet1.forEach(car => {
            // Проверяем, что марка, модель и год не null и не пусты
            if (car.markaavto && car.model && car.god) {
                const uniqueKey = `${car.markaavto}-${car.model}-${car.god}`;

                if (!uniqueCars.has(uniqueKey)) {
                    uniqueCars.add(uniqueKey);

                    const carObject = {
                        markaavto: car.markaavto,
                        model: car.model,
                        god: car.god,
                        pictures: car.pictures
                    };
                    carsArray.push(carObject);
                }
            }
        });

        const sortedCars = carsArray.sort((a, b) => {
            const makeA = a.markaavto || '';
            const makeB = b.markaavto || '';
            return makeA.localeCompare(makeB);
        });

        sortedCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');

            const carImage = document.createElement('img');
            carImage.src = car.pictures;
            carImage.alt = `${car.markaavto} ${car.model}`;
            carCard.appendChild(carImage);

            const carDetails = document.createElement('div');
            carDetails.classList.add('car-details');

            const carMakeModel = document.createElement('h3');
            carMakeModel.textContent = `${car.markaavto} ${car.model}`;
            carDetails.appendChild(carMakeModel);

            const carYear = document.createElement('p');
            carYear.textContent = `Рік: ${car.god}`;
            carDetails.appendChild(carYear);

            // Обработчик события для картки машины
            carCard.addEventListener('click', () => {
                window.location.href = `./car-page.html?make=${car.markaavto}&model=${car.model}&year=${car.god}`;
            });

            carCard.appendChild(carDetails);
            carsCatalog.appendChild(carCard);
        });
    })
    .catch(error => console.error('Помилка завантаження даних:', error));


//cart
document.addEventListener("DOMContentLoaded", function () {
  const continueShoppingBtn = document.getElementById("continueShopping");
  const addToCartBtns = document.querySelectorAll('.add-to-cart');

  // Обработчик для кнопки "Продолжить покупки"
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      window.location.href = "catalog.html"; // Переход на страницу каталога товаров
    });
  }

  // Обработчик для кнопок добавления в корзину
  addToCartBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const item = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: this.dataset.price,
        quantity: 1 // Количество товара (можно сделать настраиваемым)
      };
      addToCart(item); // Добавление товара в корзину
    });
  });
});

// Функция для отображения модального окна
function showCartModal() {
  const modal = document.getElementById("cartModal");
  const overlay = document.querySelector(".page-overlay");

  if (modal && overlay) {
    modal.classList.remove("hidden"); // Показываем модальное окно
    overlay.style.display = "block"; // Показываем затемняющий фон
  }
}

// Функция для закрытия модального окна
function closeCartModal() {
  const modal = document.getElementById("cartModal");
  const overlay = document.querySelector(".page-overlay");

  if (modal && overlay) {
    modal.classList.add("hidden"); // Скрываем модальное окно
    overlay.style.display = "none"; // Скрываем затемняющий фон
  }
}

// Функция для перехода к оформлению заказа
function proceedToCheckout() {
  closeCartModal();
  window.location.href = "cart.html"; // Переход на страницу корзины для оформления заказа
}

// Функция для добавления товара в корзину
function addToCart(item) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || []; // Получаем корзину из sessionStorage

  // Добавляем новый товар в корзину, если он еще не был добавлен
  const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1; // Увеличиваем количество товара, если он уже есть
  } else {
    cart.push(item); // Иначе добавляем новый товар в корзину
  }

  sessionStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем обновленную корзину

  showCartModal(); // Показываем модальное окно с вариантами продолжить покупки или перейти в корзину
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
//lazy

// var lazyLoadInstance = new LazyLoad({});

// wow
// new WOW().init();
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
document.querySelectorAll('.catalog-list a').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const brand = this.querySelector('img').alt.toLowerCase();
    const pageUrl = `catalog-template.html?brand=${brand}`;
    window.location.href = pageUrl;
  });
});

document.querySelectorAll('.submenu a').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const brand = this.querySelector('img').alt.toLowerCase();
    const pageUrl = `catalog-template.html?brand=${brand}`;
    window.location.href = pageUrl;
  });
});
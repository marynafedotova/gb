// catalog products
let currentProductIndex = 0;
const productsPerPage = 12;
let products = [];

function displayProducts() {
  const productContainer = document.querySelector('.product-list');
  if (!productContainer) {
    console.error('Контейнер для товарів не знайдено.');
    return;
  }

  const productsToDisplay = products.slice(currentProductIndex, currentProductIndex + productsPerPage);

  productsToDisplay.forEach(product => {
    const productCard = `
    <div class="product-card">
      <img src="${product.photo.split(',')[0].trim()}" alt="${product.zapchast}">
      <h3>${product.ID_EXT}</h3>
      <h3>${product.zapchast}</h3>
      <p>${product.zena} ${product.valyuta}</p>
      
      <div class="btn-cart">
<button class="add-to-cart" data-id="${product.ID_EXT}" data-price="${product.zena}">Додати до кошика</button>

        </div>
      <div class="product_btn">
        <a href="product.html?id=${product.ID_EXT}">Детальніше</a>
      </div>
    </div>
  `;
      productContainer.insertAdjacentHTML('beforeend', productCard);
  });

  currentProductIndex += productsPerPage;

  if (currentProductIndex >= products.length) {
    document.querySelector('.load-more').style.display = 'none'; 
  }
}
fetch('../data/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки файла JSON');
    }
    return response.json();
  })
  .then(data => {
    if (!data || !data.Sheet1) {
      throw new Error('Некорректный формат данных');
    }
    products = data.Sheet1;
    displayProducts(); 
    const loadMoreButton = document.querySelector('.load-more');
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', function(event) {
        event.preventDefault();
        displayProducts();
      });
    }    
  })
  .catch(error => console.error('Помилка завантаження каталогу:', error));


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

//accordion
fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        const cars = data.Sheet1
            .filter(item => item.markaavto && item.model) // Исключаем записи с null или пустыми значениями
            .map(item => ({
                markaavto: item.markaavto,
                model: item.model
            }));

        const carAccordionData = cars.reduce((acc, car) => {
            if (!acc[car.markaavto]) {
                acc[car.markaavto] = new Set();
            }
            acc[car.markaavto].add(car.model);
            return acc;
        }, {});

        const accordionContainer = document.getElementById('carAccordion');
        for (const [make, models] of Object.entries(carAccordionData)) {
            if (!make) continue; // Пропускаем если марка null или пустая

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
            models.forEach(model => {
                if (model) { // Пропускаем если модель null или пустая
                    const modelItem = document.createElement('p');
                    modelItem.textContent = model;
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

            // Обробник події для картки машини
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

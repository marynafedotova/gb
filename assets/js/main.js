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
//baner slider

$(document).ready(function() {
  $('#baner').lightSlider({
    item: 1,
    controls: true,
    loop: true,
    auto: true,
    slideMove: 1,
    verticalHeight:500,
    slideMargin: 0,
    speed:700
        });
});

//advantages slider
document.addEventListener('DOMContentLoaded', function () {
  fetch('assets/data/advantages.json')
    .then(response => response.json())
    .then(data => {
      createAdvantagesSlider('advantages_slider', data);
    })
    .catch(error => console.error('Error fetching data:', error));
});

function createAdvantagesSlider(elementId, jsonData) {
  const sliderContainer = $("#" + elementId);
  const ulElement = $("<ul></ul>");
  jsonData.forEach(item => {
    const slideElement = $(`
      <li>
      <div class="adventages-slide">
        <img src="${item.image}" alt="">
        <div class="adventages-text">${item.text}</div>
      </li>
      </div>
    `);
    ulElement.append(slideElement);
  });
  sliderContainer.append(ulElement);
  ulElement.lightSlider({
    item: 2,
    controls: true,
    loop: true,
    auto: true,
    slideMove: 1,
    slideMargin: 20,
    pager: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          item: 2,
          slideMove: 1
        }
      },
      {
        breakpoint: 900,
        settings: {
          item: 1,
          slideMove: 1
        }
      }
    ]
  });
}


// document.addEventListener('DOMContentLoaded', function () {
//   fetch('assets/data/news.json')
//     .then(response => response.json())
//     .then(data => {
//       createSlider('slider2', data);
//     })
//     .catch(error => console.error('Error fetching data:', error));
// });

// function createSlider(elementId, jsonData) {
//   const sliderContainer = $("#" + elementId);
//   const customPrevHtml = '<span class="custom-prev-html">Previous</span>';
//   const customNextHtml = '<span class="custom-next-html">Next</span>';
//   const ulElement = $("<ul></ul>");
//   jsonData.forEach(item => {
//     const slideElement = $(`
//       <li>
//         <div class="slide-top">
//           <img src="${item.image}" alt="${item.title}">
//         </div>
//         <div class="title">${item.title}</div>
//         <div class="news-text">${item.newsText}</div>
//         <div class="author">
//           <div class="avatar">
//             <img src="${item.author.avatar}" alt="${item.author.name}">
//           </div>
//           <div class="author-data">
//           <div class="name-author">${item.author.name}</div>
//           <div class="news-date">${item.author.date}</div>
//           </div>
//           </div>
//       </li>
//     `);
//     ulElement.append(slideElement);
//   });
//   sliderContainer.append(ulElement);
//   ulElement.lightSlider({
//     item: 3,
//     controls: false,
//     loop: true,
//     auto: true,
//     slideMove: 1,
//     slideMargin: 30,
//     pager:true,
//     vertical:false,
//     prevHtml: customPrevHtml,
//     nextHtml: customNextHtml,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           item: 2,
//           slideMove: 1,
//         }
//       },
//       {
//         breakpoint: 900, 
//         settings: {
//           item: 1,
//           slideMove: 1,
//         }
//       }
//     ]
//   });
// }

// lightGallery(document.getElementById('animated-thumbnails'), {
//     allowMediaOverlap: true,
//     toggleThumb: true
// });

const urlMonoBank = 'https://api.monobank.ua/bank/currency';
let products = [];
let usdToUahRate = 1;
// Функция для получения курса валют
async function fetchCurrencyRate() {
  try {
    const cachedRate = localStorage.getItem('usdToUahRate');
    const cachedTime = localStorage.getItem('usdToUahRateTime');
    const now = Date.now();

    // Если кэш действителен (меньше 5 минут)
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
    const response = await fetch('assets/data/data.json');
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
  if (!productContainer) {
    console.error('Контейнер для товаров не найден');
    return;
  }

  // Очищаем контейнер перед выводом новых результатов
  productContainer.innerHTML = '';

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = '<p>Ничего не найдено.</p>';
    return;
  }
  const limitedProducts = filteredProducts.slice(0, 12);
  limitedProducts.forEach(product => {
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

  // Если продуктов больше 12, добавляем сообщение о сокращении списка
  if (filteredProducts.length > 12) {
    productContainer.insertAdjacentHTML(
      'beforeend',
      `<p class="info-message">Показаны первые 12 результатов. Уточните запрос для более точного поиска.</p>`
    );
  }
}

// Обработчик формы поиска
document.getElementById('search-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  await fetchCurrencyRate(); // Получаем актуальный курс валют

  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if (query) {
    const filteredProducts = products.filter(product => 
      (product.zapchast && product.zapchast.toLowerCase().includes(query)) ||
      (product.markaavto && product.markaavto.toLowerCase().includes(query)) ||
      (product.model && product.model.toLowerCase().includes(query))
    );

    displayProducts(filteredProducts);
  }
});

// Инициализация данных
async function initialize() {
  await fetchCurrencyRate();
  await fetchProducts();
}

// Запуск
initialize();



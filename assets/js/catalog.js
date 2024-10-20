// catalog products
let currentProductIndex = 0;
const productsPerPage = 10;
let products = []; // Масив для зберігання продуктів

// Функція для відображення товарів
function displayProducts() {
  const productContainer = document.querySelector('.product-list');
  
  // Відображаємо товари до currentProductIndex
  const productsToDisplay = products.slice(currentProductIndex, currentProductIndex + productsPerPage);
  
  productsToDisplay.forEach(product => {
    const productCard = `
      <div class="product-card">
        <img src="${product.photo.split(',')[0].trim()}" alt="${product.zapchast}">
        <h3>${product.ID_EXT}</h3>
        <h3>${product.zapchast}</h3>
        <p>${product.zena} ${product.valyuta}</p>
       <a href="product.html?id=${product.ID_EXT}">Детальніше</a>
      </div>
    `;
    productContainer.innerHTML += productCard;
  });
  
  // Оновлюємо індекс для наступного завантаження
  currentProductIndex += productsPerPage;

  // Перевіряємо, чи є ще товари для завантаження
  if (currentProductIndex >= products.length) {
    document.querySelector('.load-more').style.display = 'none'; // Ховаємо кнопку, якщо більше немає товарів
  }
}

// Завантажуємо товари з JSON
fetch('../data/products.json')
  .then(response => response.json())
  .then(data => {
    products = data.Sheet1; // Зберігаємо продукти в масиві
    displayProducts(); // Відображаємо перші 10 товарів

    // Додаємо обробник події для кнопки "Завантажити більше" тільки після завантаження продуктів
    const loadMoreButton = document.querySelector('.load-more');
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', displayProducts);
    } else {
      console.error('Кнопка "Завантажити більше" не знайдена.');
    }
  })
  .catch(error => console.error('Помилка завантаження каталогу:', error));

// Отримуємо ID продукту з URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// // Завантажуємо конкретний продукт на сторінці товару
// if (productId) {
//   fetch('../data/products.json')
//     .then(response => response.json())
//     .then(data => {
//       const product = data.Sheet1.find(item => item.ID_EXT === productId);

//       if (product) {
//         // Відображаємо деталі продукту
//         document.querySelector('.product-name').textContent = product.zapchast;
//         document.querySelector('.product-price').textContent = product.zena + ' ' + product.valyuta;
//         document.querySelector('.product-description').textContent = product.opysanye;
//         document.querySelector('.product-image').src = product.photo.split(',')[0].trim();

//         // Додаємо додаткові зображення товару
//         const imageContainer = document.querySelector('.product-images');
//         if (product.photo && typeof product.photo === 'string') {
//           product.photo.split(',').forEach(photoUrl => {
//             const imgElement = `<img src="${photoUrl.trim()}" alt="${product.zapchast}" style="width: 150px; height: auto;">`;
//             imageContainer.innerHTML += imgElement;
//           });
//         } else {
//           console.error('Поле photo не містить даних або не є рядком для товару з ID:', product.ID_EXT);
//         }
//       } else {
//         console.error('Продукт з ID не знайдено:', productId);
//       }
//     })
//     .catch(error => console.error('Помилка завантаження даних продукту:', error));
// }


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
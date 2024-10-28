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
      
      <div class="btn-cart"><button class="add-to-cart"
        data-id="${product.ID_EXT}"
        data-price="${product.zena}"
        data-tipe="${product.zapchast}">Додати до кошика</button>
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

document.addEventListener('DOMContentLoaded', function() {
  shoppingCart.initCart();

  const openCartButton = document.getElementById('openCartBtn');
  if (openCartButton) {
    openCartButton.addEventListener('click', function() {
      if (shoppingCart.cart.length === 0) {
        toast.warning('Кошик порожній!');
        console.log('Кошик порожній!');
      } else {
        showCartModal();
        shoppingCart.updateCartDisplay();
      }
    });
  }

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart')) {
      event.preventDefault();
      const button = event.target;
      const item = {
        id: button.getAttribute('data-id'),
        price: Number(button.getAttribute('data-price')), 
        tipe: button.getAttribute('data-tipe'), 
        quantity: 1
        
      };
      shoppingCart.addItemToCart(item);
      showCartModal();
      console.log("Кнопка 'Добавить в корзину' нажата!");
      console.log("ID товара:", button.getAttribute('data-id')); // Проверяем ID
console.log("Добавляем товар:", item); // Проверяем объект товара
    }
  });
  
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
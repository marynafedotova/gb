document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Функция для установки значения textContent с проверкой наличия элемента
  function setElementTextContent(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = content;
    } else {
      console.warn(`Элемент с селектором ${selector} не найден`);
    }
  }

  // Функция для получения и кэширования курса USD к UAH
  async function getCachedExchangeRate() {
    const cachedRate = sessionStorage.getItem('usdToUahRate');
    const cachedTime = sessionStorage.getItem('currencyUpdateTime');
    const oneHour = 60 * 60 * 1000; // 1 час в миллисекундах

    if (cachedRate && cachedTime && (Date.now() - cachedTime < oneHour)) {
      return parseFloat(cachedRate);
    } else {
      try {
        const response = await fetch('https://api.monobank.ua/bank/currency');
        const data = await response.json();
        const usdToUah = data.find(item => item.currencyCodeA === 840 && item.currencyCodeB === 980);
        if (usdToUah && usdToUah.rateSell) {
          const rate = usdToUah.rateSell;
          // Сохраняем курс и время обновления в sessionStorage
          sessionStorage.setItem('usdToUahRate', rate);
          sessionStorage.setItem('currencyUpdateTime', Date.now());
          return rate;
        }
      } catch (error) {
        console.error('Ошибка при получении курса валют:', error);
        return 1; // Возвращаем базовое значение, если запрос не удался
      }
    }
  }

  if (productId) {
    // Получаем курс валют с кэшированием
    const usdToUahRate = await getCachedExchangeRate();

    // Загружаем данные товара из JSON
    fetch('../data/data.json')
      .then(response => response.json())
      .then(data => {
        const product = data.Sheet1.find(item => item.ID_EXT === productId);

        if (product) {
          // Конвертируем цену в гривны и округляем в большую сторону
          const priceInUah = Math.ceil(product.zena * usdToUahRate);

          // Присваиваем значения элементам на странице
          setElementTextContent('.product-id', product.ID_EXT);
          setElementTextContent('.product-name', product.zapchast);
          setElementTextContent('.product-markaavto', product.markaavto);
          setElementTextContent('.product-dop_category', product.dop_category);
          setElementTextContent('.product-pod_category', product.pod_category);
          setElementTextContent('.product-typ_kuzova', product.typ_kuzova);
          setElementTextContent('.product-price', `${product.zena} ${product.valyuta}`);
          setElementTextContent('.product-price-uah', `${priceInUah} грн`);
          setElementTextContent('.product-model', product.model);
          setElementTextContent('.product-god', product.god);
          setElementTextContent('.product-category', product.category);
          setElementTextContent('.product-toplivo', product.toplivo);
          setElementTextContent('.product-originalnumber', product.originalnumber);

          // Добавление описания продукта в блок с подробной информацией
          setElementTextContent('.opysanye', product.opysanye);

          // Обработка галереи изображений
          const imageGallery = document.querySelector('#imageGallery');
          if (product.photo && typeof product.photo === 'string' && imageGallery) {
            product.photo.split(',').forEach((photoUrl) => {
              const listItem = `
                <li data-thumb="${photoUrl.trim()}" data-src="${photoUrl.trim()}">
                  <a href="${photoUrl.trim()}" data-lightgallery="item">
                    <img src="${photoUrl.trim()}" alt="${product.zapchast}">
                  </a>
                </li>
              `;
              imageGallery.innerHTML += listItem;
            });

            $('#imageGallery').lightSlider({
              gallery: true,
              item: 1,
              thumbItem: 3,
              slideMargin: 20,
              enableDrag: true,
              currentPagerPosition: 'left',
              controls: true,
              verticalHeight: 600,
              loop: true,
              auto: true,
              onSliderLoad: function() {
                $('#imageGallery').removeClass('cS-hidden');
              }
            });
          } else {
            console.error('Поле photo не содержит данных или не является строкой для товара с ID:', productId);
          }
        } else {
          console.error('Продукт с указанным ID не найден:', productId);
        }
      })
      .catch(error => console.error('Ошибка загрузки данных продукта:', error));
  }
});

// Табы для переключения информации
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".info-tab");
  const contents = document.querySelectorAll(".info-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(item => item.classList.remove("active"));
      contents.forEach(content => content.classList.remove("active"));

      tab.classList.add("active");
      document.querySelector(`.${tab.id}-info`).classList.add("active");
    });
  });

  // Добавление логики для кнопки добавления в корзину с модальным окном
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        id: button.getAttribute('data-id'),
        price: button.getAttribute('data-price'),
        tipe: button.getAttribute('data-tipe'),
        name: button.closest('.product-item').querySelector('.product-name').textContent
      };
      addToCart(product);

      // Показать модальное окно вместо alert
      const modal = document.createElement('div');
      modal.classList.add('modal-overlay');
      modal.innerHTML = `
        <div class="modal-window">
          <p>Товар добавлен в корзину!</p>
          <button class="continue-shopping">Продолжить покупки</button>
          <button class="go-to-cart">Перейти в корзину</button>
        </div>
      `;
      document.body.appendChild(modal);

      // Обработчики для кнопок модального окна
      modal.querySelector('.continue-shopping').addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      modal.querySelector('.go-to-cart').addEventListener('click', () => {
        window.location.href = 'cart.html'; // Переход на страницу корзины
      });
    });
  });

  // Функция добавления товара в корзину
  function addToCart(product) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
});

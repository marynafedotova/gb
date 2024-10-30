document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    fetch('../data/data.json')
      .then(response => response.json())
      .then(data => {
        const product = data.Sheet1.find(item => item.ID_EXT === productId);

        if (product) {

          document.querySelector('.product-name').textContent = product.zapchast;
          document.querySelector('.product-markaavto').textContent = product.markaavto;
          document.querySelector('.product-dop_category').textContent = product.dop_category;
          document.querySelector('.product-pod_category').textContent = product.pod_category;
          document.querySelector('.product-typ_kuzova').textContent = product.typ_kuzova;
          document.querySelector('.product-price').textContent = product.zena + ' ' + product.valyuta;
          document.querySelector('.product-description').textContent = product.opysanye;
          document.querySelector('.product-model').textContent = product.model;
          document.querySelector('.product-god').textContent = product.god;
          document.querySelector('.product-category').textContent = product.category;
          document.querySelector('.product-toplivo').textContent = product.toplivo;
          document.querySelector('.product-originalnumber').textContent = product.originalnumber;

          const imageGallery = document.querySelector('#imageGallery');
          if (product.photo && typeof product.photo === 'string') {
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
            console.error('Поле photo не містить даних або не є рядком для товару з ID:', productId);
          }
        } else {
          console.error('Продукт з ID не знайдено:', productId);
        }
      })
      .catch(error => console.error('Помилка завантаження даних продукту:', error));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".info-tab");
  const contents = document.querySelectorAll(".info-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Видалити активні класи з усіх табів і блоків
      tabs.forEach(item => item.classList.remove("active"));
      contents.forEach(content => content.classList.remove("active"));

      // Додати активний клас для вибраного таба і відповідного контенту
      tab.classList.add("active");
      document.querySelector(`.${tab.id}-info`).classList.add("active");
    });
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
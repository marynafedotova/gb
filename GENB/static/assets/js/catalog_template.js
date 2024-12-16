  // Код для обработки кликов по ссылкам
document.querySelectorAll('.submenu a').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const imgElement = this.querySelector('img');
    if (imgElement && imgElement.alt) {
      const brand = imgElement.alt.toLowerCase();
      const pageUrl = `catalog-template.html?brand=${brand}`;
      window.location.href = pageUrl;
    } else {
      console.error('Атрибут alt у изображения не найден.');
    }
  });
});

    document.addEventListener('DOMContentLoaded', function () {
      const urlParams = new URLSearchParams(window.location.search);
      const brand = urlParams.get('brand');
  
      const brandData = {
    acura: { 
      title: 'Acura Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Acura.' 
    },
    audi: { 
      title: 'Audi Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Audi.' 
    },
    bmw: { 
      title: 'BMW Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки BMW.' 
    },
    crysler: { 
      title: 'Chrysler Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Chrysler.' 
    },
    dodge: { 
      title: 'Dodge Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Dodge.' 
    },
    honda: { 
      title: 'Honda Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Honda.' 
    },
    hyundai: { 
      title: 'Hyundai Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Hyundai.' 
    },
    infiniti: { 
      title: 'Infiniti Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Infiniti.' 
    },
    jaguar: { 
      title: 'Jaguar Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Jaguar.' 
    },
    jeep: { 
      title: 'Jeep Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Jeep.' 
    },
    lincoln: { 
      title: 'Lincoln Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Lincoln.' 
    },
    kia: { 
      title: 'Kia Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Kia.' 
    },
    land_rover: { 
      title: 'Land Rover Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів маркиLand Rover.' 
    },
    nissan: { 
      title: 'Nissan Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Nissan.' 
    },
    volkswagen: { 
      title: 'Volkswagen Catalog', 
      description: 'Ласкаво просимо до каталогу запчастин до автомобілів марки Volkswagen.' 
    },
  };
  
  
      if (brand && brandData[brand]) {
        document.getElementById('brand-title').textContent = brandData[brand].title;
        document.getElementById('brand-description').textContent = brandData[brand].description;
      } else {
        const contentElement = document.getElementById('content');
        if (contentElement) {
          contentElement.innerHTML = '<p>Бренд не найден.</p>';
        } else {
          console.error('Элемент с id="content" не найден.');
        }
      }
    });
  
  // Функция для загрузки данных из JSON
  async function loadData() {
    try {
      const response = await fetch('..data/data_ukr.json');
      const data = await response.json();
      return data.Sheet1; 
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return [];
    }
  }
  
  // Функция для фильтрации данных по марке и году
  function filterCars(cars, brand, minYear = 2000) {
    return cars.filter(car => car.markaavto.toLowerCase() === brand.toLowerCase() && car.god >= minYear);
  }
  
  // Функция для создания карточек автомобилей
  function createCarCards(brand, minYear = 2000) {
    loadData().then(cars => {
     
      const filteredCars = filterCars(cars, brand, minYear);
  
      const contentElement = document.getElementById('content');
      if (!contentElement) return;
  
      contentElement.innerHTML = '';
  
      if (filteredCars.length === 0) {
        contentElement.innerHTML = '<p>Нет автомобилей для отображения по выбранному фильтру.</p>';
        return;
      }
  
   
      filteredCars.forEach(car => {
        const card = document.createElement('div');
        card.classList.add('car-card'); 
  
        // Создаем HTML для карточки
        card.innerHTML = `
          <div class="car-image">
            <img src="${car.pictures.split(',')[0]}" alt="${car.model}" />
          </div>
          <div class="car-details">
            <h3>${car.markaavto} ${car.model} (${car.god})</h3>
            <p><strong>Описание:</strong> ${car.description}</p>
            <p><strong>Цена:</strong> ${car.price} ${car.currency}</p>
            <p><a href="${car.link}" target="_blank">Подробнее</a></p>
          </div>
        `;
  
        
        contentElement.appendChild(card);
      });
    });
  }
  
  
  createCarCards('Jaguar', 2012);
  
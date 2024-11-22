window.onload = () => {
  // Декодируем параметры из URL
  const params = new URLSearchParams(window.location.search);
  const markaavto = decodeURIComponent(params.get('make'));
  const model = decodeURIComponent(params.get('model'));
  const year = decodeURIComponent(params.get('year'));

  // Проверяем, что все параметры переданы
  if (!markaavto || !model || !year) {
    document.getElementById('car-info').innerHTML = "<p>Некорректные параметры URL.</p>";
    return;
  }

  fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
      const carsArray = data.Sheet1;
      const carData = carsArray.filter(car =>
        car.markaavto === markaavto &&
        (car.model === model || !model) &&
        (car.god === parseFloat(year) || !year)
      );
      if (carData.length > 0) {
        const car = carData[0];
        
        // Отображаем основную информацию об автомобиле
        const carInfoElement = document.getElementById('car-info');
        carInfoElement.innerHTML = `
          <h2>${car.markaavto} ${car.model} ${car.god}</h2>
          <img src="${car.pictures.split(',')[0].trim()}" alt="${car.markaavto} ${car.model}" width="200px" />
        `;

        // Определяем соответствие категорий данных и вкладок
        const categoryMap = {
          "Інтер'єр / салон": 'interior',
          "Двигун": 'engine',
          "Кузов": 'body',
          "Електрика": 'electronics',
          "Запчастини ІНШІ": 'parts',
          "Гальмівна система": 'brake-system',
          "Підвіска та рульове": 'suspension',
          "Двері": 'doors',
          "Кріплення": 'fasteners',
          "Трансмісія": 'transmission',
          "Колеса": 'wheels',
          "Замок багажника": 'trunk-lock',
          "ГУМА": 'tire'
        };

        // Функция для отображения содержимого вкладки
        function showTabContent(categoryId, partsByCategory) {
          document.querySelectorAll('.tab-panel').forEach(tab => tab.style.display = 'none');
          const tabContentElement = document.getElementById(categoryId);
          tabContentElement.style.display = 'block';
        
          if (partsByCategory.length > 0) {
            let partsList = `<ul>`;
            partsByCategory.forEach(part => {
              // Добавляем ссылку на product.html с параметром id
              partsList += `<li><a href="product.html?id=${part.ID_EXT}">${part.zapchast}</a></li>`;
            });
            partsList += `</ul>`;
            tabContentElement.innerHTML = partsList;
          } else {
            tabContentElement.innerHTML = "<p>Запчасти для этой категории не найдены.</p>";
          }
        }        
        // Устанавливаем обработчики событий для заголовков вкладок
        Object.keys(categoryMap).forEach(categoryName => {
          const categoryId = categoryMap[categoryName];
          const tabTitleElement = document.querySelector(`#tab-titles li a[href="#${categoryId}"]`);
          
          tabTitleElement.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Перенаправляємо на нову сторінку з параметрами URL для фільтрації
            const newUrl = `product-category.html?category=${encodeURIComponent(categoryName)}&make=${encodeURIComponent(markaavto)}&model=${encodeURIComponent(model)}`;
            window.location.href = newUrl;
          });
        });
        
      } else {
        document.getElementById('car-info').innerHTML = "<p>Этот автомобиль не найден.</p>";
      }
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error);
      document.getElementById('car-info').innerHTML = "<p>Произошла ошибка при загрузке данных.</p>";
    });
}

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

  fetch(dataJsonUrl)
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
        
        const carInfoElement = document.getElementById('car-info');
        carInfoElement.innerHTML = `
          <h2>${car.markaavto} ${car.model} ${car.god}</h2>
          <img src="${car.pictures.split(',')[0].trim()}" alt="${car.markaavto} ${car.model}" width="200px" />
        `;

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

        function showTabContent(categoryId, partsByCategory) {
          document.querySelectorAll('.tab-panel').forEach(tab => tab.style.display = 'none');
          const tabContentElement = document.getElementById(categoryId);
          tabContentElement.style.display = 'block';
        
          if (partsByCategory.length > 0) {
            let partsList = `<ul>`;
            partsByCategory.forEach(part => {
              partsList += `<li><a href="product.html?id=${part.ID_EXT}">${part.zapchast}</a></li>`;
            });
            partsList += `</ul>`;
            tabContentElement.innerHTML = partsList;
          } else {
            tabContentElement.innerHTML = "<p>Запчастини для цієї категорії не знайдено.</p>";
          }
        }        
        Object.keys(categoryMap).forEach(categoryName => {
          const categoryId = categoryMap[categoryName];
          const tabTitleElement = document.querySelector(`#tab-titles li a[href="#${categoryId}"]`);
          
          tabTitleElement.addEventListener('click', (event) => {
            event.preventDefault();
            
            const newUrl = `product-category.html?category=${encodeURIComponent(categoryName)}&make=${encodeURIComponent(markaavto)}&model=${encodeURIComponent(model)}`;
            window.location.href = newUrl;
          });
        });
        
      } else {
        document.getElementById('car-info').innerHTML = "<p>Цей автомобіль не знайдено.</p>";
      }
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error);
      document.getElementById('car-info').innerHTML = "<p>Сталася помилка під час завантаження даних.</p>";
    });
}

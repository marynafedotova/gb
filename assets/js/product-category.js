document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const category = decodeURIComponent(params.get('category')).toLowerCase();
  const markaavto = decodeURIComponent(params.get('make')).toLowerCase();
  const model = decodeURIComponent(params.get('model')).toLowerCase();
  const year = decodeURIComponent(params.get('year'));

  console.log("Отримані параметри:", { category, markaavto, model, year });

  fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
      const carsArray = data.Sheet1.map(car => ({
        ...car,
        category: car.category && car.category.toLowerCase(),
        markaavto: car.markaavto && car.markaavto.toLowerCase(),
        model: car.model && car.model.toLowerCase(),
        god: car.god ? Math.floor(car.god) : null // Приводимо рік до цілих чисел
      }));
      
      console.log("Дані з бази даних:", carsArray);

      let filteredParts;
      let alternativeMessage = '';

      // Перевірка параметра року
      const isYearNull = year === "null"; // Перевірка, чи рік не заданий

      // Фільтрація за всіма параметрами (якщо вони не порожні)
      filteredParts = carsArray.filter(car =>
        car.category === category &&
        car.markaavto === markaavto &&
        car.model === model &&
        (!isYearNull ? car.god === parseInt(year) : true) // Якщо рік не заданий, не фільтруємо за ним
      );
      console.log("Результат після першого фільтрування (повний збіг):", filteredParts);

      // Альтернативні варіанти
      if (filteredParts.length === 0) {
        filteredParts = carsArray.filter(car =>
          car.category === category &&
          car.markaavto === markaavto &&
          car.model === model
        );
        alternativeMessage = "Підходящі запчастини в цій категорії не знайдені, але можливо вас зацікавлять інші варіанти для цієї моделі.";
        console.log("Результат після другого фільтрування (категорія, марка, модель):", filteredParts);

        if (filteredParts.length === 0) {
          filteredParts = carsArray.filter(car =>
            car.category === category &&
            car.markaavto === markaavto &&
            (!isYearNull ? car.god === parseInt(year) : true)
          );
          alternativeMessage = "Підходящі запчастини в цій категорії не знайдені, але можливо вас зацікавлять інші варіанти для цієї марки і року.";
          console.log("Результат після третього фільтрування (категорія, марка, рік):", filteredParts);

          if (filteredParts.length === 0) {
            filteredParts = carsArray.filter(car =>
              car.category === category &&
              car.markaavto === markaavto
            );
            alternativeMessage = "Підходящі запчастини в цій категорії не знайдені, але можливо вас зацікавлять інші варіанти для цієї марки.";
            console.log("Результат після четвертого фільтрування (категорія і марка):", filteredParts);

            // Якщо не знайшли жодних запчастин, показуємо всі запчастини для цієї марки
            if (filteredParts.length === 0) {
              filteredParts = carsArray.filter(car => car.markaavto === markaavto);
              alternativeMessage = "Запчастини для цієї марки авто:";
              console.log("Результат після п'ятого фільтрування (тільки марка):", filteredParts);
            }
          }
        }
      }

      const partsContainer = document.getElementById('parts-container');
      if (filteredParts.length > 0) {
        partsContainer.innerHTML = `
          ${alternativeMessage ? `<p>${alternativeMessage}</p>` : ''}
          ${filteredParts.map(part => `
            <div class="part-item">
              <h3>${part.zapchast}</h3>
              <p>Ціна: ${part.zena} ${part.valyuta}</p>
              <p>Рік випуску: ${part.god}</p>
              <a href="product.html?id=${part.ID_EXT}">Переглянути деталі</a>
            </div>
          `).join('')}
        `;
      } else {
        partsContainer.innerHTML = "<p>Запчастини для цієї категорії не знайдені.</p>";
      }
    })
    .catch(error => {
      console.error('Помилка при завантаженні даних:', error);
      document.getElementById('parts-container').innerHTML = "<p>Помилка при завантаженні даних.</p>";
    });
});

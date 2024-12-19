document.addEventListener('DOMContentLoaded', function () {
    const brandField = document.getElementById('id_brand_car');  // ID поля "Марка"
    const modelField = document.getElementById('id_model_car');  // ID поля "Модель"

    brandField.addEventListener('change', function () {
        const brandId = this.value;

        // Очистити попередній список моделей
        modelField.innerHTML = '<option value="">Модель</option>';

        if (brandId) {
            fetch(`/ajax/load-models/?brand=${brandId}`)  // Заміна 'brand_car' на 'brand'
                .then(response => response.json())
                .then(data => {
                    // Якщо список моделей не порожній
                    if (data.models && data.models.length > 0) {
                        data.models.forEach(model => {
                            const option = document.createElement('option');
                            option.value = model;  // Модель буде просто рядком
                            option.textContent = model;  // Текст опції - це назва моделі
                            modelField.appendChild(option);
                        });
                    } else {
                        // Якщо немає моделей, показуємо відповідне повідомлення
                        const option = document.createElement('option');
                        option.value = '';
                        option.textContent = 'Немає доступних моделей';
                        modelField.appendChild(option);
                    }
                })
                .catch(error => console.error('Помилка завантаження моделей:', error));
        }
    });
});




//Script for accardion
document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', function () {
      const brand = this.getAttribute('data-brand');
      const modelsContainer = document.getElementById(`models-${brand}`);
      modelsContainer.style.display = modelsContainer.style.display === 'none' ? 'block' : 'none';

      // Завантажити моделі через AJAX
      if (!modelsContainer// .getAttribute('data-loaded')) {
          fetch(`/get_models/?brand_car=${brand}`)
              .then(response => response.json())
              .then(data => {
                  let modelsHTML = '';
                  data.models.forEach(model => {
                      modelsHTML += `
                          <div>
                              <button class="model-button" data-brand="${brand}" data-model="${model}">
                                  ${model}
                              </button>
                              <div class="years-content" id="years-${brand}-${model}" style="display: none;">
                                  <!-- Роки -->
                              </div>
                          </div>
                      `;
                  });
                  modelsContainer.innerHTML = modelsHTML;
                  modelsContainer.setAttribute('data-loaded', 'true');

                  // Додати обробку для моделей
                  document.querySelectorAll('.model-button').forEach(modelButton => {
                      modelButton.addEventListener('click', function () {
                          const brand = this.getAttribute('data-brand');
                          const model = this.getAttribute('data-model');
                          const yearsContainer = document.getElementById(`years-${brand}-${model}`);
                          yearsContainer.style.display = yearsContainer.style.display === 'none' ? 'block' : 'none';

                          // Завантажити роки через AJAX
                          if (!yearsContainer.getAttribute('data-loaded')) {
                              fetch(`/get_years/?brand_car=${brand}&model_car=${model}`)
                                  .then(response => response.json())
                                  .then(data => {
                                      yearsContainer.innerHTML = data.years.map(year => `<div>${year}</div>`).join('');
                                      yearsContainer.setAttribute('data-loaded', 'true');
                                  });
                          }
                      });
                  });
              });
      }
  });

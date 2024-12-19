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






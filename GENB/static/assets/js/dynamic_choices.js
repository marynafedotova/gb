jQuery(document).ready(function($) {
    const conditionField = $('#id_condition');
    let additionalConditionField = $('#id_additional_condition');
    const additionalConditionLabel = $('label[for="id_additional_condition"]'); // Мітка

    // Опції для стану "Житловий"
    const options = [
        { value: 'good', text: 'Хороший' },
        { value: 'satisfactory', text: 'Задовільний' },
        { value: 'defective', text: 'З дефектом' },
        { value: 'repaired', text: 'Зі слідами ремонту' }
    ];

    function updateAdditionalField() {
        const condition = conditionField.val();

        if (!condition) {
            // Якщо стан не вибрано, ховаємо поле та мітку
            additionalConditionField.hide();
            additionalConditionLabel.hide();
        } else if (condition === 'new') {
            // При стані "new" ховаємо поле та мітку
            additionalConditionField.hide();
            additionalConditionLabel.hide();
        } else if (condition === 'living') {
            // Показуємо поле та мітку
            if (additionalConditionField.is('input')) {
                // Замінюємо текстове поле на селект, якщо це необхідно
                const selectField = $('<select></select>').attr('id', 'id_additional_condition');
                options.forEach(option => {
                    selectField.append(new Option(option.text, option.value));
                });

                additionalConditionField.replaceWith(selectField);
                additionalConditionField = selectField;
            }
            additionalConditionField.show(); // Показуємо поле
            additionalConditionLabel.show(); // Показуємо мітку
        }
    }

    // Відслідковуємо зміну стану conditionField
    conditionField.on('change', updateAdditionalField);

    // Ініціалізація при завантаженні сторінки
    updateAdditionalField();
});

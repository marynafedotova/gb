(function($) {
    $(document).ready(function() {
        const conditionField = $('#id_condition');
        const additionalConditionField = $('#id_additional_condition');

        function updateAdditionalChoices() {
            const condition = conditionField.val();
            const options = {
                living: [
                    {value: 'good', text: 'Хороший'},
                    {value: 'satisfactory', text: 'Задовільний'},
                    {value: 'defective', text: 'З дефектом'},
                    {value: 'repaired', text: 'Зі слідами ремонту'}
                ],
                new: []
            };

            additionalConditionField.empty();

            if (options[condition]) {
                options[condition].forEach(option => {
                    additionalConditionField.append(
                        new Option(option.text, option.value)
                    );
                });
            }
        }

        conditionField.on('change', updateAdditionalChoices);
        updateAdditionalChoices();  // Ініціалізуємо при завантаженні
    });
})(django.jQuery);

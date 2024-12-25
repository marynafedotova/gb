document.addEventListener('DOMContentLoaded', function () {
    // Отримуємо список меню
    const menu = document.querySelector('#nav-sidebar');
    if (!menu) {
        console.error("Меню навігації не знайдено!");
        return;
    }

    // Створюємо нову групу "Справочники"
    const groupTitle = "Справочники";
    const group = document.createElement('div');
    group.classList.add('menu-group');
    group.innerHTML = `
        <h3 style="margin-top: 10px; font-size: 16px; color: #333;">${groupTitle}</h3>
        <ul class="menu-group-items" style="list-style: none; padding-left: 0;"></ul>
    `;

    const groupList = group.querySelector('.menu-group-items');

    // Список назв елементів, які потрібно згрупувати
    const справочники = [
        "Колір", // Точні назви, як вони відображаються в меню
        "Кузови",
        "Марки",
        "Модель",
        "Об'єм двигуна",
        "Особливості"
    ];

    // Переносимо відповідні елементи в нову групу
    справочники.forEach((name) => {
        const menuItem = Array.from(menu.querySelectorAll('a')).find(link => link.textContent.trim() === name);
        if (menuItem) {
            const parentLi = menuItem.closest('li');
            if (parentLi) {
                groupList.appendChild(parentLi);
            }
        }
    });

    // Додаємо нову групу до меню
    menu.appendChild(group);
});

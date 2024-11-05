async function loadData() {
  const response = await fetch('../data/deliverypayment.json');
  const data = await response.json();
  generateContent(data);
}

function generateContent(data) {
  const contentSection = document.getElementById('content');

  // Генерация раздела доставки
  const deliverySection = document.createElement('div');
  deliverySection.innerHTML = `
  <div class="container">
    <h1>${data.delivery.title}</h1>
    <ul>${data.delivery.options.map(option => `<li>&#9733; ${option}</li>`).join('')}</ul>
  </div>`;
  contentSection.appendChild(deliverySection);

  // Генерация раздела оплаты
  const paymentSection = document.createElement('div');
  paymentSection.innerHTML = `
  <div class="container">
    <div class="delivery_payment_title">${data.payment.title}</div>
    <ul>${data.payment.options.map(option => `<li>&#10004; ${option}</li>`).join('')}</ul>
    <div class="important">${data.payment.important}</div>
  </div>`;
  contentSection.appendChild(paymentSection);

  // Генерация графика работы
  const workSchedule = document.createElement('div');
  workSchedule.innerHTML = `
    <div class="container">
    <div class="delivery_payment_title">${data.workingHours.title}</div>
    <ul>${data.workingHours.schedule.map(day => `<li>&#9734; ${day}</li>`).join('')}</ul>
  </div>`;
  contentSection.appendChild(workSchedule);

  // Генерация таблицы запчастей
  const partsSection = document.createElement('div');
  partsSection.innerHTML = `
  <div class="container">
    <div class="delivery_payment_title">Список запчастин</div>
    <table>
      <thead>
        <tr>
          <th>Позиція</th>
          <th class="price">Сума (грн)</th>
        </tr>
      </thead>
      <tbody>
        ${data.partsList.map(part => `<tr><td>${part.name}</td><td class="price">${part.price}</td></tr>`).join('')}
      </tbody>
    </table>
    </div>
  `;
  contentSection.appendChild(partsSection);
}

// Вызов функции загрузки данных
loadData();
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

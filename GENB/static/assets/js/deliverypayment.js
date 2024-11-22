async function loadData() {
  const response = await fetch('../data/deliverypayment.json');
  const data = await response.json();
  generateContent(data);
}

function generateContent(data) {
  const contentSection = document.getElementById('content');

  const deliverySection = document.createElement('div');
  deliverySection.innerHTML = `
  <div class="container">
    <h1>${data.delivery.title}</h1>
    <ul>${data.delivery.options.map(option => `<li>&#9733; ${option}</li>`).join('')}</ul>
  </div>`;
  contentSection.appendChild(deliverySection);

  const paymentSection = document.createElement('div');
  paymentSection.innerHTML = `
  <div class="container">
    <div class="delivery_payment_title">${data.payment.title}</div>
    <ul>${data.payment.options.map(option => `<li>&#10004; ${option}</li>`).join('')}</ul>
    <div class="important">${data.payment.important}</div>
  </div>`;
  contentSection.appendChild(paymentSection);

  const workSchedule = document.createElement('div');
  workSchedule.innerHTML = `
    <div class="container">
    <div class="delivery_payment_title">${data.workingHours.title}</div>
    <ul>${data.workingHours.schedule.map(day => `<li>&#9734; ${day}</li>`).join('')}</ul>
  </div>`;
  contentSection.appendChild(workSchedule);

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

loadData();
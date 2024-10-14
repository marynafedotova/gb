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
//lazy

// var lazyLoadInstance = new LazyLoad({});

// wow
new WOW().init();
//baner slider

$(document).ready(function() {
  $('#baner').lightSlider({
    item: 1,
    controls: true,
    loop: true,
    auto: true,
    slideMove: 1,
    verticalHeight:500,
    slideMargin: 0,
    speed:300
        });
});

//slider
// $(document).ready(function() {
//   $('#news_slider').lightSlider({
//       item:3,
//       loop:false,
//       slideMove:1,
//       easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
//       controls: false,
//       speed:600,
//       auto: true,
//       responsive : [
//           {
//               breakpoint:800,
//               settings: {
//                   item:3,
//                   slideMove:1,
//                   slideMargin:6,
//                 }
//           },
//           {
//               breakpoint:480,
//               settings: {
//                   item:2,
//                   slideMove:1
//                 }
//           }
//       ]
//   });  
// });

//advantages slider
document.addEventListener('DOMContentLoaded', function () {
  fetch('assets/data/advantages.json')
    .then(response => response.json())
    .then(data => {
      createAdvantagesSlider('advantages_slider', data);
    })
    .catch(error => console.error('Error fetching data:', error));
});

function createAdvantagesSlider(elementId, jsonData) {
  const sliderContainer = $("#" + elementId);
  const ulElement = $("<ul></ul>");
  jsonData.forEach(item => {
    const slideElement = $(`
      <li>
      <div>
        <img src="${item.image}" alt="">
        <div>${item.text}</div>
      </li>
      </div>
    `);
    ulElement.append(slideElement);
  });
  sliderContainer.append(ulElement);
  ulElement.lightSlider({
    item: 3,
    controls: true,
    loop: true,
    auto: true,
    slideMove: 1,
    slideMargin: 20,
    pager: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          item: 2,
          slideMove: 1
        }
      },
      {
        breakpoint: 900,
        settings: {
          item: 1,
          slideMove: 1
        }
      }
    ]
  });
}


// document.addEventListener('DOMContentLoaded', function () {
//   fetch('assets/data/news.json')
//     .then(response => response.json())
//     .then(data => {
//       createSlider('slider2', data);
//     })
//     .catch(error => console.error('Error fetching data:', error));
// });

// function createSlider(elementId, jsonData) {
//   const sliderContainer = $("#" + elementId);
//   const customPrevHtml = '<span class="custom-prev-html">Previous</span>';
//   const customNextHtml = '<span class="custom-next-html">Next</span>';
//   const ulElement = $("<ul></ul>");
//   jsonData.forEach(item => {
//     const slideElement = $(`
//       <li>
//         <div class="slide-top">
//           <img src="${item.image}" alt="${item.title}">
//         </div>
//         <div class="title">${item.title}</div>
//         <div class="news-text">${item.newsText}</div>
//         <div class="author">
//           <div class="avatar">
//             <img src="${item.author.avatar}" alt="${item.author.name}">
//           </div>
//           <div class="author-data">
//           <div class="name-author">${item.author.name}</div>
//           <div class="news-date">${item.author.date}</div>
//           </div>
//           </div>
//       </li>
//     `);
//     ulElement.append(slideElement);
//   });
//   sliderContainer.append(ulElement);
//   ulElement.lightSlider({
//     item: 3,
//     controls: false,
//     loop: true,
//     auto: true,
//     slideMove: 1,
//     slideMargin: 30,
//     pager:true,
//     vertical:false,
//     prevHtml: customPrevHtml,
//     nextHtml: customNextHtml,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           item: 2,
//           slideMove: 1,
//         }
//       },
//       {
//         breakpoint: 900, 
//         settings: {
//           item: 1,
//           slideMove: 1,
//         }
//       }
//     ]
//   });
// }

// lightGallery(document.getElementById('animated-thumbnails'), {
//     allowMediaOverlap: true,
//     toggleThumb: true
// });


// form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedback_form');
  const nameFld = document.getElementById('exampleInputName');
  const telFld = document.getElementById('exampleInputTel');

  if (!form || !nameFld || !telFld) {
    console.error('Form or fields not found!');
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameFld.value ? nameFld.value.trim() : ''; 
    const tel = telFld.value ? telFld.value.trim() : '';

    const errors = [];

    // Очистка классов ошибок
    nameFld.classList.remove('is-invalid');
    telFld.classList.remove('is-invalid');

    if (name === '') {
      errors.push("Введіть, будь ласка, Ваше ім'я");
      nameFld.classList.add('is-invalid');
    } else if (name.length < 2) {
      errors.push('Ваше ім\'я занадто коротке');
      nameFld.classList.add('is-invalid');
    }

    if (tel === '' || tel.length < 17) {  // Длина номера должна быть 17 символов
      errors.push('Введіть, будь ласка, правильний номер телефону');
      telFld.classList.add('is-invalid');
    }

    if (errors.length > 0) {
      toast.error(errors.join('. '));
      return;
    }

    // Отправка данных в Telegram
    const CHAT_ID = '836622266';
    const BOT_TOKEN = '8046931960:AAHhJdRaBEv_3zyB9evNFxZQlEdiz8FyWL8';
    const message = `<b>Ім'я: </b> ${name}\r\n<b>Телефон: </b>${tel}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=HTML`;

    fetch(url, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        nameFld.value = '';
        telFld.value = '';
        toast.success('Ваше повідомлення успішно надіслано.');
      } else {
        toast.error('Сталася помилка.');
      }
    })
    .catch(error => {
      toast.error('Помилка: ' + error.message);
    });
  });

  telFld.addEventListener('input', function (e) {
    let input = e.target.value.replace(/\D/g, ''); // Удаляем все, кроме цифр
    let formattedInput = '';

    if (input.length > 0) {
      formattedInput += '+38 (';
    }
    if (input.length >= 1) {
      formattedInput += input.substring(0, 3);
    }
    if (input.length >= 4) {
      formattedInput += ') ' + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formattedInput += '-' + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formattedInput += '-' + input.substring(8, 10);
    }

    e.target.value = formattedInput;
  });
 // Запрещаем ввод чисел в поле имени
 nameFld.addEventListener('input', function (e) {
  let input = e.target.value;
  // Оставляем только буквы и специальные символы для имени
  e.target.value = input.replace(/[^A-Za-zА-Яа-яІіЇїЄє']/g, '');
});
});
//scroll
// document.getElementById('scrollButton').addEventListener('click', function(event) {
//   event.preventDefault();
//   const targetElement = document.getElementById('news');
//   const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
//   window.scrollTo({
//     top: targetPosition,
//     behavior: 'smooth'
//   });
// });


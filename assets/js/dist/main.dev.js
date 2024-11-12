"use strict";

//baner slider
$(document).ready(function () {
  $('#baner').lightSlider({
    item: 1,
    controls: true,
    loop: true,
    auto: true,
    slideMove: 1,
    verticalHeight: 500,
    slideMargin: 0,
    speed: 700
  });
}); //advantages slider

document.addEventListener('DOMContentLoaded', function () {
  fetch('assets/data/advantages.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    createAdvantagesSlider('advantages_slider', data);
  })["catch"](function (error) {
    return console.error('Error fetching data:', error);
  });
});

function createAdvantagesSlider(elementId, jsonData) {
  var sliderContainer = $("#" + elementId);
  var ulElement = $("<ul></ul>");
  jsonData.forEach(function (item) {
    var slideElement = $("\n      <li>\n      <div class=\"adventages-slide\">\n        <img src=\"".concat(item.image, "\" alt=\"\">\n        <div class=\"adventages-text\">").concat(item.text, "</div>\n      </li>\n      </div>\n    "));
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
    responsive: [{
      breakpoint: 1200,
      settings: {
        item: 2,
        slideMove: 1
      }
    }, {
      breakpoint: 900,
      settings: {
        item: 1,
        slideMove: 1
      }
    }]
  });
} // document.addEventListener('DOMContentLoaded', function () {
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
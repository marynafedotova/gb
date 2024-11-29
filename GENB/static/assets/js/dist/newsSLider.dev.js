"use strict";

//news
document.addEventListener('DOMContentLoaded', function () {
  fetch(dataJsonNews).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log('Fetched data:', data);
    createNewsSlider('news_slider', data);
  })["catch"](function (error) {
    return console.error('Error fetching news data:', error);
  }); // Обработка ошибок
});

function createNewsSlider(elementId, jsonData) {
  console.log(jsonData);

  if (!Array.isArray(jsonData)) {
    console.error('Expected an array, but got:', jsonData);
    return;
  }

  var sliderContainer = $("#" + elementId);
  var ulElement = $("<ul></ul>");
  jsonData.forEach(function (item, index) {
    var imageGalleryId = "image-gallery-".concat(index);
    var imageSlider = $("<div class='image-gallery' id='".concat(imageGalleryId, "'></div>"));
    item.images.forEach(function (image) {
      var imageSlide = $("<a href=\"".concat(image, "\" ><img src=\"").concat(image, "\" alt=\"").concat(item.title, "\"></a>"));
      imageSlider.append(imageSlide);
    });
    var slideElement = $("<li>\n      <div class=\"slide\">\n        <div class=\"slide-top\"></div>\n        <div class=\"title\">".concat(item.title, "</div>\n        <div class=\"vehicle-details\">\n          <div><strong>\u0420\u0456\u043A \u0432\u0438\u043F\u0443\u0441\u043A\u0443:</strong> ").concat(item.vehicle.year, "</div>\n          <p><strong>VIN:</strong> ").concat(item.vehicle.vin, "</p>\n          <p><strong>\u0414\u0432\u0438\u0433\u0443\u043D:</strong> ").concat(item.vehicle.engine, "</p>\n          <p><strong>\u041A\u043E\u0440\u043E\u0431\u043A\u0430 \u043F\u0435\u0440\u0435\u0434\u0430\u0447:</strong> ").concat(item.vehicle.transmission, "</p>\n          <p><strong>\u041A\u043E\u043B\u0456\u0440 \u043A\u0443\u0437\u043E\u0432\u0430:</strong> ").concat(item.vehicle.body_color, "</p>\n          <p><strong>\u041F\u0440\u0438\u0432\u0456\u0434:</strong> ").concat(item.vehicle.drive, "</p>\n        </div>\n      </div>\n    </li>"));
    slideElement.find(".slide-top").append(imageSlider);
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
    verticalHeight: 1000
  });
  setTimeout(function () {
    $('.image-gallery').each(function () {
      lightGallery(this, {
        allowMediaOverlap: true,
        toggleThumb: true
      });
    });
  }, 100);
}
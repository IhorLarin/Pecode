'use strict';

/* ===================================================
    form.input.animation
  ==================================================== */

$('.user-input').focus(function () {
  $(this).parent().addClass('focus');
}).blur(function () {
  if($(this).val() === '') {
    $(this).parent().removeClass('focus');
  }
});


/* ===================================================
    google.maps.create
  ==================================================== */

function initMap() {

  var element = document.getElementById('map');
  var options = {
    zoom: 15,
    center: {
      lat: 49.843987,
      lng: 24.038661
    },
    disableDefaultUI: true,
    fullscreenControl: true
  };

  var myMap = new google.maps.Map(element, options);
  var marker = new google.maps.Marker({
    position: {
      lat: 49.848093,
      lng: 24.039173
    },
    map: myMap,
    icon: 'img/icons/pin.png',
    animation: google.maps.Animation.DROP
  });

  marker.addListener('click', toggleBounce);


  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}

/* ===================================================
    PageScroll2id - скрол сторінки
  ==================================================== */

$(".menu__link, .up").mPageScroll2id({
  // offset: 20
});

/* ===================================================
    menu.button
  ==================================================== */

var menu_btn = $('.menu-btn');
var menu = $('.menu');
var menu_link = $('.menu__link');

menu_btn.click(function () {
  menu_btn.toggleClass('active');
  menu.toggleClass('active');
});

menu_link.click(function () {
  menu_btn.toggleClass('active');
  menu.toggleClass('active');
});



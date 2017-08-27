// scripts.js

$(document).ready(function(){
  "use strict";

  // deklaracja zmiennych
  var carouselList = $('#carousel ul');

  var imgPause = 3000;
  var animationTime = 1200;

  var marginZero = 0;
  var marginOne = 800; // wartość równa przyjętej w CSS szerokości obrazka

  var firstItem;
  var lastItem;

  var interval;

  // wyliczenie długości całej listy w zależności od ilości zdjęć
  var galleryLength = $('ul').width($('ul').find('li').length * marginOne);
  console.log(galleryLength);

  // przesunięcie obrazka w lewo
  var moveFirstSlide = function(){
    firstItem = carouselList.find('li:first');
    lastItem = carouselList.find('li:last');
    lastItem.after(firstItem);
    carouselList.css({marginLeft:marginZero});
  };
  
    // przesunięcie obrazka w prawo
  var moveLastSlide = function(){
    firstItem = carouselList.find('li:first');
    lastItem = carouselList.find('li:last');
    firstItem.before(lastItem);
    carouselList.css({marginLeft:-marginOne});
  };

  // automatyczna zmiana zdjęcia
  function moveSlideForward (){
    carouselList.animate({'marginLeft':'-='+marginOne}, animationTime, moveFirstSlide);
  }

  function autoAnimation(){
    interval = setInterval(moveSlideForward, imgPause);
  }
  autoAnimation();

  // zatrzymanie automatycznej zmiany zdjęcia po najechaniu myszką na obrazek
  function stopAutoAnimation(){
    clearInterval(interval);
  }

  $('#carousel').on('mouseenter', stopAutoAnimation).on('mouseleave', autoAnimation);

  // przesuwanie slajdów po kliknięciu na strzałkę
  function moveSlideBackwards (){
    moveLastSlide();
    carouselList.animate({'marginLeft':marginZero}, animationTime);
  }

  $('.fa-chevron-left').on('click', function(){
    moveSlideBackwards();
  });

  $('.fa-chevron-right').on('click', function(){
    moveSlideForward();
  });

});
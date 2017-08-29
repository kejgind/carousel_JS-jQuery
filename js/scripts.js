// scripts.js

$(document).ready(function(){
  "use strict";

  // deklaracja zmiennych
  var carouselList = $('#carousel ul');

  // ustawienie czasu wyświetlania obrazka oraz czasu animacji przejścia
  var imgPause = 2000;
  var animationTime = 1000;

  // określenie wartości dla przesuwania galerii obrazków
  var marginZero = 0;
  var marginOne = 800; // wartość równa przyjętej w CSS szerokości obrazka

  // wyliczenie długości całej listy w zależności od ilości zdjęć
  var galleryImagesCount = $('#carousel li').length;
  var galleryLength = galleryImagesCount * marginOne;
  console.log(galleryImagesCount, galleryLength);

  // zdefiniowanie indexu wyświetlanego obecnia obrazka z galerii
  var displayedImageIndex = 0;

  var firstItem;
  var lastItem;
  var interval;

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
    // sprawdzanie i ustawianie nr wyświetlanego obrazka przy zmianie obrazka w przód
    if ((displayedImageIndex + 1) % galleryImagesCount !== 0){
      displayedImageIndex++;
    } else {
      displayedImageIndex = 0;
    };
    changeBulletIcon();
    console.log(displayedImageIndex);
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

  // przesuwanie slajdów wstecz
  function moveSlideBackwards (){
    moveLastSlide();
    carouselList.animate({'marginLeft':marginZero}, animationTime);
    // sprawdzanie i ustawianie nr wyświetlanego obrazka przy zmianie obrazka w tył
    if ((displayedImageIndex + 1) % galleryImagesCount === 0){
      displayedImageIndex--;
    } else if (displayedImageIndex > 0){
      displayedImageIndex--;
    } else {
      displayedImageIndex = (galleryImagesCount - 1);
    };
    changeBulletIcon();
    console.log(displayedImageIndex);
  }

  // przesuwanie slajdów po kliknięciu na strzałkę
  $('.fa-chevron-left').on('click', function(){
    moveSlideBackwards();
  });

  $('.fa-chevron-right').on('click', function(){
    moveSlideForward();
  });

  // wskazanie (na liście kropek) aktualnie wyświetlanego zdjęcia
  function changeBulletIcon(){
    $('i.bullet').removeClass('fa-circle').addClass('fa-circle-thin').eq(displayedImageIndex).removeClass('fa-circle-thin').addClass('fa-circle');
  };

});
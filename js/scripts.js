// scripts.js

$(document).ready(function(){
  "use strict";

  // (EN) variables declaration | (PL) deklaracja zmiennych
  var carouselList = $('#carousel ul');

  // (EN) declaration of variable responsible for checking, if there is animation in progress | (PL) ustawienie zmiennej odpowiedzialnej za sprawdzenie, czy aktualnie trwa animacja zmiany obrazka
  var isAnimating = false;

  // (EN) setting time for image display and animation duration | (PL) ustawienie czasu wyświetlania obrazka oraz czasu animacji przejścia
  var imgPause = 2000;
  var animationTime = 1000;

  // | (PL) określenie wartości dla przesuwania galerii obrazków
  var marginZero = 0;
  var marginOne = 800; // wartość równa przyjętej w CSS szerokości obrazka

  // | (PL) wartość równa przyjętej w CSS szerokości obrazka
  var galleryImagesCount = $('#carousel li').length;
  var galleryLength = galleryImagesCount * marginOne;
  console.log(galleryImagesCount, galleryLength);

  // | (PL) zdefiniowanie indexu wyświetlanego obecnie obrazka z galerii
  var displayedImageIndex = 0;

  var firstItem;
  var lastItem;
  var interval;

  // | (PL) przesunięcie obrazka w lewo
  var moveFirstSlide = function(){
    firstItem = carouselList.find('li:first');
    lastItem = carouselList.find('li:last');
    lastItem.after(firstItem);
    carouselList.css({marginLeft:marginZero});
  };

  // | (PL) przesunięcie obrazka w prawo
  var moveLastSlide = function(){
    firstItem = carouselList.find('li:first');
    lastItem = carouselList.find('li:last');
    firstItem.before(lastItem);
    carouselList.css({marginLeft:-marginOne});
  };

  // | (PL) automatyczna zmiana zdjęcia
  function moveSlideForward (){
    if (isAnimating == true){
      return;
    } else {
      isAnimating = true;
      carouselList.animate({'marginLeft':'-='+marginOne}, animationTime, moveFirstSlide);
      // | (PL) sprawdzanie i ustawianie nr wyświetlanego obrazka przy zmianie obrazka w przód
      displayedImageIndex = (displayedImageIndex + 1) % galleryImagesCount;
      changeBulletIcon();
      // console.log(displayedImageIndex);
      isAnimating = false;
    };
  }

  function autoAnimation(){
    interval = setInterval(moveSlideForward, imgPause);
  }
  autoAnimation();

  // | (PL) zatrzymanie automatycznej zmiany zdjęcia po najechaniu myszką na obrazek
  function stopAutoAnimation(){
    clearInterval(interval);
  }
  $('#carousel').on('mouseenter', stopAutoAnimation).on('mouseleave', autoAnimation);

  // | (PL) przesuwanie slajdów wstecz
  function moveSlideBackwards (){
    if (isAnimating == true){
      return;
    } else {
      isAnimating = true;
      moveLastSlide();
      carouselList.animate({'marginLeft':marginZero}, animationTime);
      // | (PL) sprawdzanie i ustawianie nr wyświetlanego obrazka przy zmianie obrazka w tył
      displayedImageIndex = (displayedImageIndex - 1) % galleryImagesCount;
      if (displayedImageIndex < 0){
        displayedImageIndex = galleryImagesCount - 1;
      };
      changeBulletIcon();
      // console.log(displayedImageIndex);
      isAnimating = false;
    };
  };

  // | (PL) przesuwanie slajdów po kliknięciu na strzałkę
  $('.fa-chevron-left').on('click', function(){
    moveSlideBackwards();
  });
  $('.fa-chevron-right').on('click', function(){
    moveSlideForward();
  });

  // | (PL) wskazanie (na liście kropek) aktualnie wyświetlanego zdjęcia
  function changeBulletIcon(){
    $('i.bullet').removeClass('fa-circle').addClass('fa-circle-thin')
      .eq(displayedImageIndex)
      .removeClass('fa-circle-thin').addClass('fa-circle');
  };

  // | (PL) sprawdzenie nr klikniętego elementu wyboru zdjęcia
  var bulletIconClicked = $('i.bullet').click(function(){
    bulletIconClicked = $(this).index();
    console.log(bulletIconClicked);
  });

});

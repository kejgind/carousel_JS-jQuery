$(document).ready(function(){
  "use strict";

  // wyliczenie długości całej listy w zależności od ilości zdjęć
  // var galleryLength = $('ul').width($('ul').find('li').length * 800);
  // console.log(galleryLength);

  var carouselList = $('#carousel ul');

  var imgPause = 5000;
  var imgPauseOnClick = 500;
  var animationTime = 1500;

  var marginZero = 0;
  var marginOne = 800;

  var firstItem;
  var lastItem;

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

  // automatyczne zmiana zdjęcia
  var interval;
  function autoAnimation(){
    interval = setInterval(function(){
      carouselList.animate({'marginLeft':'-='+marginOne}, animationTime, moveFirstSlide);},
      imgPause);
  };
  autoAnimation();

  // zatrzymanie automatycznej zmiany zdjęcia po najechaniu myszką na obrazek
  function stopAutoAnimation(){
    clearInterval(interval);
  };

  $('#carousel').on('mouseenter', stopAutoAnimation).on('mouseleave', autoAnimation);

  // podświetlenie strzałek i przesunięcie zdjęcia
  // $('.arrow').on('mouseenter', function(){
  //   $(this).css('opacity', 1);}
  // ).on('mouseleave', function(){
  //   $(this).css('opacity', 0.4);});

  $('.fa-chevron-right').on('click', function(){
    setTimeout(function(){
      carouselList.animate({
        'marginLeft':-marginOne
      }, animationTime, moveFirstSlide);
    }, imgPauseOnClick);
  });

  $('.fa-chevron-left').on('click', function(){
    setTimeout(function(){
      carouselList.animate({
        'marginLeft':marginZero
      }, animationTime, moveLastSlide);
    }, imgPauseOnClick);
  });

  var imgShown = function(){
    carouselList.find('li:first').html();
  };

  console.log(imgShown);

});
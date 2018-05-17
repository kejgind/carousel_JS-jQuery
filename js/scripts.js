// scripts.js

// grab elements from DOM, list of images, buttons, etc.
const elementsFromDOM = {
  carousel: document.getElementById("carousel"),
  carouselList: document.querySelector("#carousel ul"),
  galleryImages: Array.from(document.querySelectorAll("#carousel li")),
  prevSlide: document.querySelector(".fa-chevron-left"),
  nextSlide: document.querySelector(".fa-chevron-right"),
  bulletsContainer: document.querySelector(".carousel-bullets"),
};

// create bullets
const addBullets = (gallery, container) => {
  const bullets = gallery.map((image, index) => {
    image.classList.add(`image-${index}`);
    return `<i class="fa fa-circle-thin bullet" data-image="image-${index}"></i>`;
  });
  container.innerHTML = bullets
    .join(" ")
    .replace("fa-circle-thin", "fa-circle")
    .replace(/,/g, "");
  return Array.from(container.children);
};

const bulletsGlobal = addBullets(
  elementsFromDOM.galleryImages,
  elementsFromDOM.bulletsContainer
);

console.log(bulletsGlobal);

// set things that can be altered
const configuration = {
  imgDisplayTime: 2000, // set duration to 2 seconds
  animationTime: 1000, // set animation duration to 1 sec
};

const otherSettings = {
  startPosition: 0,
  endPosition: elementsFromDOM.galleryImages[0].offsetWidth, // value equal to image width set in css file
  galleryImagesCount: elementsFromDOM.galleryImages.length,
  displayedImageIndex: 0,
  isAnimating: false,
};

const galleryLength =
  otherSettings.endPosition * otherSettings.galleryImagesCount;

const moveSlideLeft = () => {
  let gallery = elementsFromDOM.galleryImages;
  let elList = elementsFromDOM.carouselList;
  elList.style.marginLeft = `${-otherSettings.endPosition}px`;
  const firstElem = gallery.shift();
  elList.removeChild(firstElem);
  elList.style.marginLeft = `${otherSettings.startPosition}px`;
  gallery.push(firstElem);
  elList.insertAdjacentElement("beforeend", firstElem);
  setActiveBullet(gallery[0].classList[0]);
  return gallery;
};

const moveSlideRight = () => {
  let gallery = elementsFromDOM.galleryImages;
  let elList = elementsFromDOM.carouselList;
  const lastElem = gallery.pop();
  elList.removeChild(lastElem);
  gallery.unshift(lastElem);
  elList.insertAdjacentElement("afterbegin", lastElem);
  elList.style.marginLeft = `${otherSettings.startPosition}px`;
  setActiveBullet(gallery[0].classList[0]);
  return gallery;
};

const setActiveBullet = currentImage => {
  const bullets = bulletsGlobal;
  const bullet = bullets.filter(el => el.dataset.image === currentImage)[0];
  bullets.map(el => {
    el.classList.remove("fa-circle");
    el.classList.add("fa-circle-thin");
  });
  bullet.classList.remove("fa-circle-thin");
  bullet.classList.add("fa-circle");
};



elementsFromDOM.prevSlide.addEventListener("click", moveSlideLeft);
elementsFromDOM.nextSlide.addEventListener("click", moveSlideRight);

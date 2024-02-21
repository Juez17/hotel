'use strict';

const heroSection = document.querySelector('.hero-section');
const slideTitle = document.querySelector('.slide__title');
const slideText = document.querySelector('.slide__text');
const slider = document.querySelector('.slide');

const modal = document.querySelector('.modal');
const modalX = document.querySelector('.modal__x');
const modalImg = document.querySelector('.modal__img');

const dots = document.querySelectorAll('.dots__dot');

const hotelSection = document.querySelector('.hotel-section');
const hotelSectionTitle = document.querySelector('.hotel-section__title');
const hotelSectionText = document.querySelector('.hotel-section__text');
const hotelSectionGraphicInfo = document.querySelector(
  '.hotel-section__graphic-info'
);
const hotelSectionCircle = document.querySelector('.circle');



const restaurantSection = document.querySelector('.restaurant-section');
const restaurantSectionTitle = document.querySelector('.restaurant-section__title');
const restaurantSectionText = document.querySelector('.restaurant-section__text'); 
const restaurantSectionMenuContainer = document.querySelector('.restaurant-section__menu-container'); 
const menuContainer = document.querySelector('.menu-container');

const bookingSection = document.querySelector('.booking-section');
const bookingSectionTitle = document.querySelector('.booking-section__title');
const bookingSectionImg = document.querySelector('.booking-section__img');
const bookingSectionText = document.querySelector('.booking-section__text');
const bookingSectionButton = document.querySelector('.booking-section__button');

const contactSection = document.querySelector('.contact-section');
const contactSectionTitle = document.querySelector('.contact-section__title');
const contactSectionAddress = document.querySelector('.info-card__address');
const contactSectionCompany = document.querySelector('.info-card__company');
const contactSectionReception = document.querySelector('.info-card__reception');
const contactSectionMap = document.querySelector('.contact-section__map');

const arrowLeft = document.querySelector('.slider__arrow--left');
const arrowRight = document.querySelector('.slider__arrow--right');

let currentSlideIndex = 0;

const menuCards = document.querySelectorAll('.menu-container__img');

const imgAr = [
  'assets/img/slider-1.webp',
  'assets/img/slider-2.webp',
  'assets/img/slider-3.webp',
];

const titleAr = [
  'Witamy w Hotelu Anton!',
  'Konferencje z Antonem',
  'Idealny dla sportowców',
];

const textAr = [
  'Nasz elegancki i wygodny hotel znajduje się w Pruszkowie, tuż przy urokliwym boisku piłkarskim. Nasza lokalizacja jest idealna dla osób szukających spokoju i ciszy, a jednocześnie chcących mieć łatwy dostęp do atrakcji turystycznych i rozrywek.',
  'Nasz hotel oferuje cztery przestronne sale konferencyjne, wyposażone w nowoczesny sprzęt audiowizualny, klimatyzację oraz dostęp do Wi-Fi. Nasz zespół specjalistów z przyjemnością pomoże w organizacji każdego wydarzenia, od zaprojektowania ustawienia sali po zorganizowanie cateringu i zakwaterowania dla uczestników.',
  'Nasze pokoje są idealnym miejscem na wypoczynek po dniu pełnym wrażeń. Wygodne łóżka, eleganckie wnętrza i przyjazna atmosfera pozwolą naszym gościom zrelaksować się i przygotować do kolejnego dnia.',
];


const openModal = (shouldNotZoom)=> {
  modal.classList.remove('hidden');
  // img = document.querySelector('.modal__img')
  // makeImgMagnifiable(img)
  if(shouldNotZoom) {
    console.log('returning');
    return;
  } 
  document.querySelector('.img-2').style.backgroundImage = `url(${document.querySelector('.img-1').src})`;
};

const closeModal = (e)=> {
  if(e.target !== e.currentTarget) {
    return;
  }
  document.querySelector('.img-2').style.display = 'initial';
  modal.classList.add('hidden');
};

menuCards.forEach(el => {
  el.addEventListener('click', ()=> {
    modalImg.src = el.src;
    openModal();
  });
});




modal.addEventListener('click', closeModal);
modalX.addEventListener('click', closeModal);



const createObserver = (target, root = null, threshold = 0.3, fn) => {
  const options = {
    root: root,
    threshold: threshold,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fn();
        observer.disconnect();
      }
    });
  }, options);
  observer.observe(target);
};


createObserver(hotelSection, null, 0.3, () => {
  hotelSectionTitle.style.opacity = '1';
  hotelSectionTitle.style.translate = '0';

  hotelSectionText.style.opacity = '1';
  hotelSectionText.style.translate = '0';

  hotelSectionCircle.style.opacity = '1';
  hotelSectionCircle.style.scale = '1';

  hotelSectionGraphicInfo.style.opacity = '1';
  hotelSectionGraphicInfo.style.translate = '0';
});

createObserver(restaurantSection, null, 0.3, () => {
  restaurantSectionTitle.style.opacity = '1';
  restaurantSectionTitle.style.translate = '0';

  restaurantSectionText.style.opacity = '1';
  restaurantSectionText.style.translate = '0';

  menuContainer.style.opacity = '1';
  menuContainer.style.translate = '0';
});

createObserver(bookingSection, null, 0.3, () => {
  bookingSectionTitle.style.opacity = '1';
  bookingSectionTitle.style.translate = '0';

  bookingSectionImg.style.opacity = '1';

  bookingSectionText.style.opacity = '1';
  bookingSectionText.style.translate = '0';

  bookingSectionButton.style.opacity = '1';
  bookingSectionButton.style.translate = '0';
});

createObserver(contactSection, null, 0.3, () => {
  contactSectionTitle.style.opacity = '1';
  contactSectionTitle.style.translate = '0';

  contactSectionAddress.style.opacity = '1';
  contactSectionAddress.style.translate = '0';

  contactSectionMap.style.opacity = '1';

  contactSectionCompany.style.opacity = '1';
  contactSectionCompany.style.translate = '0';

  contactSectionReception.style.opacity = '1';
  contactSectionReception.style.translate = '0';
});

const slide = (direction) => {
  arrowLeft.removeEventListener('click', arrowLeftListener);
  arrowRight.removeEventListener('click', arrowRightListener);

  dots[0].removeEventListener('click', dot0Listener);
  dots[1].removeEventListener('click', dot1Listener);
  dots[2].removeEventListener('click', dot2Listener);

  clearInterval(intervalId);

  if (direction === 'left') {
    currentSlideIndex -= 1;
  } else {
    currentSlideIndex += 1;
  }

  currentSlideIndex === -1
    ? (currentSlideIndex = imgAr.length - 1)
    : currentSlideIndex > imgAr.length - 1
    ? (currentSlideIndex = 0)
    : currentSlideIndex;
  heroSection.classList.add('hero-section--wide');
  heroSection.classList.add('hero-section--slid');

  setTimeout(() => {
    heroSection.classList.remove('hero-section--slid');
    heroSection.style.background = `url('${imgAr[currentSlideIndex]}') left 25% bottom 0 / cover`;

    slideTitle.textContent = titleAr[currentSlideIndex];
    slideText.textContent = textAr[currentSlideIndex];
    dots.forEach((el, i) => {
      i === currentSlideIndex
        ? el.classList.add('dots__dot--active')
        : el.classList.remove('dots__dot--active');
    });

    setTimeout(() => {
      heroSection.classList.remove('hero-section--wide');

      arrowLeft.addEventListener('click', arrowLeftListener);
      arrowRight.addEventListener('click', arrowRightListener);
      dots[0].addEventListener('click', dot0Listener);
      dots[1].addEventListener('click', dot1Listener);
      dots[2].addEventListener('click', dot2Listener);
      intervalId = setInterval(slide.bind(null, 'right'), 12000);
    }, 2000);
  }, 2000);
};

const arrowLeftListener = slide.bind(null, 'left');
const arrowRightListener = slide.bind(null, 'right');

arrowLeft.addEventListener('click', arrowLeftListener);
arrowRight.addEventListener('click', arrowRightListener);

const slideDot = (dotIndex) => {
  if (currentSlideIndex === dotIndex) return;

  if (dotIndex === 0 && currentSlideIndex === 1) slide('left');
  else if (dotIndex === 0 && currentSlideIndex === 2) slide('right');
  else if (dotIndex === 1 && currentSlideIndex === 2) slide('left');
  else if (dotIndex === 1 && currentSlideIndex === 0) slide('right');
  else if (dotIndex === 2 && currentSlideIndex === 1) slide('right');
  else if (dotIndex === 2 && currentSlideIndex === 0) slide('left');
};

const dot1Listener = slideDot.bind(null, 1);
const dot0Listener = slideDot.bind(null, 0);
const dot2Listener = slideDot.bind(null, 2);

dots[0].addEventListener('click', dot0Listener);
dots[1].addEventListener('click', dot1Listener);
dots[2].addEventListener('click', dot2Listener);

let intervalId = setInterval(slide.bind(null, 'right'), 12000);





// MAGNIFIER
let zoomer = function (){
  document.querySelector('.modal')
    .addEventListener('mousemove', function(e) {

    let original = document.querySelector('.img-1'),
        magnified = document.querySelector('.img-2'),
        style = magnified.style,
        x = e.clientX - original.offsetLeft,
        y = e.clientY - original.offsetTop,
        imgWidth = original.offsetWidth,
        imgHeight = original.offsetHeight,

        xperc = ((x / imgWidth) * 100),
        yperc = ((y / imgHeight) * 100);
    
      style.backgroundPositionX = (xperc) + '%';
      style.backgroundPositionY = (yperc) + '%';
    
      style.left = `${e.x}px`;
      style.top = `${e.y }px`;
  }, false);
}();

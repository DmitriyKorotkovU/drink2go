function initializeSlider(sliderElement) {
  const slider = sliderElement;
  const sliderWrapper = slider.querySelector('.slider__line-wrapper');
  const sliderLine = slider.querySelector('.slider__line');
  const prevButton = slider.querySelector('.slider-button-prev');
  const nextButton = slider.querySelector('.slider-button-next');
  const sliderPagination = slider.querySelector('.slider-pagination');
  window.console.log(sliderPagination);

  let sliderCount = 0;
  let sliderWidth;
  let startTouchX = 0;
  let endTouchX = 0;

  const slides = Array.from(sliderLine.children);
  const sliderDots = [];

  sliderWrapper.addEventListener('touchstart', handleTouchStart);
  sliderWrapper.addEventListener('touchmove', handleTouchMove);
  prevButton.addEventListener('click', showPreviousSlide);
  nextButton.addEventListener('click', showNextSlide);

  function handleTouchStart(event) {
    startTouchX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    endTouchX = event.touches[0].clientX;
  }

  function handleSwipe() {
    const deltaX = endTouchX - startTouchX;
    if (deltaX > 60) {
      showPreviousSlide();
    } else if (deltaX < -60) {
      showNextSlide();
    }
  }

  function createDots() {
    if (sliderPagination) {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-pagination__item');
        dot.addEventListener('click', () => {
          sliderCount = i;
          rollSlider();
          updateDots();
        });
        sliderPagination.appendChild(dot);
        sliderDots.push(dot);
      }
      updateDots();
    }
  }

  function updateDots() {
    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('slider-pagination__item--active', i === sliderCount);
    });
  }

  function showSlide() {
    sliderWidth = sliderWrapper.offsetWidth;
    sliderLine.style.width = `${sliderWidth * slides.length}px`;
    rollSlider();
  }

  function showNextSlide() {
    if (sliderCount < slides.length - 1) {
      sliderCount++;
      rollSlider();
      updateDots();
    }
  }

  function showPreviousSlide() {
    if (sliderCount > 0) {
      sliderCount--;
      rollSlider();
      updateDots();
    }
  }

  function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderWidth * sliderCount}px)`;
  }

  createDots();
  showSlide();

  window.addEventListener('resize', () => {
    showSlide();
  });

  sliderWrapper.addEventListener('touchend', handleSwipe);
}

const sliders = document.querySelectorAll('.slider');
sliders.forEach((slider) => {
  initializeSlider(slider);
});

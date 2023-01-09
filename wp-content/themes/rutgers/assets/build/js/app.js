(() => {
  // assets/src/js/app.js
  window.onload = function() {
    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    btn.addEventListener("click", navToggle);
    function navToggle() {
      btn.classList.toggle("open");
      menu.classList.toggle("flex");
      menu.classList.toggle("hidden");
    }
    var swiper = new Swiper(".swiper", {
      slidesPerView: 3,
      centeredSlides: true,
      loop: true,
      spaceBetween: 100,
      pagination: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        320: {
          slidesPerView: 1.5,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 1.5,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 40
        },
        976: {
          slidesPerView: 3,
          spaceBetween: 100
        }
      }
    });
    var newswiper = new Swiper(".mySwiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
    lightGallery(document.getElementById("gallery-videos-demo"), {
      plugins: [lgVideo],
      counter: false,
      download: false
    });
  };
})();

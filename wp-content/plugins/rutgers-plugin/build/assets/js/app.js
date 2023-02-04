// Navigation toggle
window.onload = function () {
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
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // when window width is >= 220px
      220: {
        slidesPerView: 1.75,
        spaceBetween: 20,
      },
      // when window width is >= 320px
      320: {
        slidesPerView: 1.75,
        spaceBetween: 85,
      },
      // when window width is >= 480px
      520: {
        slidesPerView: 1.75,
        spaceBetween: 85,
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 1.75,
        spaceBetween: 85,
      },
      // when window width is >= 976px
      1024: {
        slidesPerView: 3,
        spaceBetween: 100,
      },
    },
  });

  var newswiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
};

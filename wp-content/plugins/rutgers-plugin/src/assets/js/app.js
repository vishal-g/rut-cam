// Navigation toggle
window.onload = function () {
  // const btn = document.getElementById("menu-btn");
  // const menu = document.getElementById("menu");

  // btn.addEventListener("click", navToggle);

  // function navToggle() {
  //   btn.classList.toggle("open");
  //   menu.classList.toggle("flex");
  //   menu.classList.toggle("hidden");
  // }
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
        slidesPerView: 3.01,
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

  jQuery(function ($) {
    $(".wpzoom-video-popup-block[href]").magnificPopup({
      type: "iframe",
      iframe: {
        patterns: {
          youtube: {
            index: "youtu",
            id: function (url) {
              const m = url.match(
                /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/
              );
              if (!m || !m[1]) return null;

              let start = 0;

              if (url.indexOf("t=") != -1) {
                const split = url.split("t=");
                const hms = split[1]
                  .replace("h", ":")
                  .replace("m", ":")
                  .replace("s", "");
                const a = hms.split(":");

                if (a.length == 1) {
                  start = a[0];
                } else if (a.length == 2) {
                  start = +a[0] * 60 + +a[1];
                } else if (a.length == 3) {
                  start = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
                }
              }

              let suffix = "?autoplay=1";

              if (start > 0) {
                suffix = `?start=${start}&autoplay=1`;
              }

              return m[1] + suffix;
            },
            src: "//www.youtube.com/embed/%id%",
          },
          vimeo: {
            index: "vimeo.com/",
            id: function (url) {
              const m = url.match(
                /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/
              );
              if (!m || !m[5]) return null;
              return m[5];
            },
            src: "//player.vimeo.com/video/%id%?autoplay=1",
          },
        },
      },
    });
  });

  const footer = document.querySelector(".ta-footer-container");
  if (footer) {
    footer.innerHTML = footer.innerHTML.replace(
      /Copyright ©\s?\d{4}/i,
      `Copyright ©${new Date().getFullYear()}`
    );
  }
};

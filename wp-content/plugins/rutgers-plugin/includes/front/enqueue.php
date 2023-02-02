<?php 

function tbones_enqueue_scripts() {

    // Swiper
    wp_enqueue_style( 'swiper-css', "build/assets/vendors/swiper/swiper-bundle.min.css", array(),'8.4.7'  );
    wp_enqueue_script( 'swiper-js', tbones_asset( 'build/assets/vendors/swiper/swiper-bundle.min.js' ), array(), '8.4.7' );

    // Lottie player
	wp_enqueue_script( 'lottie-js', tbones_asset( 'build/assets/vendors/lottie-player/lottie-player.js' ), array(), '1.7.0' );

    // Custom Scripts
    wp_enqueue_script( 'tbones-js', tbones_asset( 'build/assets/js/app.js' ));

 }
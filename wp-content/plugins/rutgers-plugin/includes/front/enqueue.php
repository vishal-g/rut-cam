<?php

function tbones_enqueue_scripts()
{

   // Swiper
   wp_enqueue_style('swiper-css', TBONES_PLUGIN_DIR_URL . "build/assets/vendors/swiper/swiper-bundle.min.css", array(), '8.4.7');

   // To make swiper-css load first item in the head even before block styles
   wp_register_style('swiper-css', TBONES_PLUGIN_DIR_URL . "build/assets/vendors/swiper/swiper-bundle.min.css");

   array_unshift(wp_styles()->queue, 'swiper-css');

   //-------------------------------------------------------------------

   wp_enqueue_script('swiper-js', TBONES_PLUGIN_DIR_URL . 'build/assets/vendors/swiper/swiper-bundle.min.js', array(), '8.4.7');

   // magnific-popup==================================================

   wp_enqueue_style('magnific-popup-css', TBONES_PLUGIN_DIR_URL . "build/assets/vendors/magnific-popup/magnific-popup.css", array(), '1.0.0');

   // To make swiper-css load first item in the head even before block styles
   wp_register_style('magnific-popup-css', TBONES_PLUGIN_DIR_URL . "build/assets/vendors/magnific-popup/magnific-popup.css");

   wp_enqueue_script('magnific-popup-js', TBONES_PLUGIN_DIR_URL . 'build/assets/vendors/magnific-popup/jquery.magnific-popup.min.js', array("jquery"), '1.1.0');

}

// High pripority enquing...loaded in the end on front - using hook - wp_enqueue_scripts

function tbones_enqueue_scripts_hp()
{
   // Custom Scripts
   wp_enqueue_script('tbones-plugin-js', TBONES_PLUGIN_DIR_URL . 'build/assets/js/app.js', array("swiper-js"), "1.0.1");
}

// Loading plugin assests on both front and editor - using hook - enqueue_block_assets


function tbones_enqueue_plugin_assets_hp()
{
   wp_enqueue_style(
      'base-css',
      TBONES_PLUGIN_DIR_URL . "build/assets/css/app.css",
      array()
   );
}

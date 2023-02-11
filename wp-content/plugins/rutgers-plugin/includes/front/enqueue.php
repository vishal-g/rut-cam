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
}

// High pripority enquing...loaded in the end

function tbones_enqueue_scripts_hp()
{

   wp_enqueue_style('swiper-css', TBONES_PLUGIN_DIR_URL . "build/assets/css/app.css", array());
   // Custom Scripts
   wp_enqueue_script('tbones-plugin-js', TBONES_PLUGIN_DIR_URL . 'build/assets/js/app.js', array("swiper-js"));
}
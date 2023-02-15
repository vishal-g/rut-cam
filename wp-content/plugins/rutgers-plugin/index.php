<?php

/**
 * Plugin Name: Rutgers Plugin
 * Plugin URI: https://camden.rutgers.edu/
 * Description: A plugin for Rutgers Camden Theme.
 * Version: 1.0.0
 * Requires at least: 5.9
 * Requires PHP: 7.2
 * Author: Tapping Bones
 * Author URI: https://tappingbones.com/
 * Text Domain: tbones-p
 * Domain Path: /languages
 */

if (!function_exists('add_action')) {
  echo "Seems like you stumbled here by accident. 😛";
  exit;
}

// Setup
define('TBONES_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('TBONES_PLUGIN_DIR_URL', plugin_dir_url(__FILE__));

// Includes
$rootFiles = glob(TBONES_PLUGIN_DIR . "includes/*.php");
$subdirectoryFiles = glob(TBONES_PLUGIN_DIR . "includes/**/*.php");
$allFiles = array_merge($rootFiles, $subdirectoryFiles);
foreach ($allFiles as $filename) {
  include_once($filename);
}

// Hooks
register_activation_hook(__FILE__, 'tbones_activate_plugin');
add_action('init', 'tbones_register_blocks');
// add_action('init', 'up_recipe_post_type');
add_action('after_setup_theme', 'tbones_setup_theme');
add_filter('image_size_names_choose', 'tbones_custom_image_sizes');
add_action('wp_enqueue_scripts', 'tbones_enqueue_scripts', 1);
add_action('wp_enqueue_scripts', 'tbones_enqueue_scripts_hp', 98);
// add_action('save_post_recipe', 'up_save_post_recipe');
// add_filter('rest_recipe_query', 'up_rest_recipe_query', 10, 2);
add_action('rest_api_init', 'tbones_rest_api_init');

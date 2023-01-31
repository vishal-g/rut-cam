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
define('UP_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Includes
$rootFiles = glob(UP_PLUGIN_DIR . "includes/*.php");
$subdirectoryFiles = glob(UP_PLUGIN_DIR . "includes/**/*.php");
$allFiles = array_merge($rootFiles, $subdirectoryFiles);
foreach ($allFiles as $filename) {
  include_once($filename);
}

// Hooks
register_activation_hook(__FILE__, 'tbones_activate_plugin');
add_action('init', 'tbones_register_blocks');
add_action('after_setup_theme', 'tbones_setup_theme');
add_filter('image_size_names_choose', 'tbones_custom_image_sizes');
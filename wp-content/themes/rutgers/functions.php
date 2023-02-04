<?php

/**
 * Get asset path.
 *
 * @param string  $path Path to asset.
 *
 * @return string
 */


//variables

//includes

include(get_theme_file_path( '/includes/front/enqueue.php' ));
include(get_theme_file_path( '/includes/setup.php' ));
include(get_theme_file_path( '/includes/register.php' ));
include(get_theme_file_path( '/includes/class-tgm-plugin-activation.php' ));
include(get_theme_file_path( '/includes/register-plugins.php' ));



//hooks
add_action( 'init' , 'tbt_registrations' );
add_action( 'tgmpa_register' , 'tbt_register_plugins');
add_action( 'after_setup_theme' , 'tbt_setup' , 99 );
add_action( 'wp_enqueue_scripts' , 'tbt_enqueue' , 99 );
add_action( 'init', 'tbt_block_course_theme_unregister_patterns', 15 );
add_action( 'init', 'tbt_cc_gutenberg_register_files' );
<?php

/**
 * Theme setup.
 */
function tbt_setup() {

	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		)
	);


	add_theme_support( 'align-wide' );
	add_theme_support( 'wp-block-styles' );

	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/build/css/editor-style.css' );

	add_editor_style( 'assets/build/css/app.css' );

	remove_theme_support( 'core-block-patterns' );
}


// Remove Core Block Patterns

function tbt_block_course_theme_unregister_patterns() {
	add_filter( 'should_load_remote_block_patterns', '__return_false' );
}



/* Remove Unwanted Gutenberg Options for Editor */

// Youtube URL - https://www.youtube.com/watch?v=a1TzCyQ7eUI

function tbt_cc_gutenberg_register_files() {
	// script file
	wp_register_script(
		'cc-block-script',
		get_stylesheet_directory_uri() .'/assets/build/js/editor-script.js', // adjust the path to the JS file
		array( 'wp-blocks', 'wp-edit-post' )
	);
	// register block editor script
	register_block_type( 'cc/ma-block-files', array(
		'editor_script' => 'cc-block-script'
	) );

}
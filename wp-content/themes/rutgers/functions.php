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

include(get_theme_file_path( '/includes/class-tgm-plugin-activation.php' ));
include(get_theme_file_path( '/includes/register-plugins.php' ));


//hooks
add_action('tgmpa_register', 'ta_register_plugins');


////////////////////////////////////////////////////////

function tbones_asset( $path ) {
	if ( wp_get_environment_type() === 'production' ) {
		return get_stylesheet_directory_uri() . '/' . $path;
	}

	return add_query_arg( 'time', time(),  get_stylesheet_directory_uri() . '/' . $path );
}

/**
 * Theme setup.
 */
function tbones_setup() {

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

add_action( 'after_setup_theme', 'tbones_setup' );


/**
 * Enqueue theme assets.
 */
function tbones_theme_enqueue_scripts() {
	$theme = wp_get_theme();
	wp_enqueue_style( 'tbones-css', tbones_asset( 'assets/build/css/app.css' ), array(), $theme->get( 'Version' ) );
	
	wp_enqueue_script( 'tbones-js', tbones_asset( 'assets/build/js/app.js' ), array(), $theme->get( 'Version' ) );
}

add_action( 'wp_enqueue_scripts', 'tbones_theme_enqueue_scripts', 9 );

//
///**
// * Enqueue individual block stylesheets.
// */
//function tbones_enqueue_block_styles() {
//
//	// Get all available block namespaces.
//	$block_namespaces = glob( dirname( __FILE__ ) . '/assets/build/css/blocks/*/' );
//	$block_namespaces = array_map(
//		function( $type_path ) { return basename( $type_path ); },
//		$block_namespaces
//	);
//
//	foreach ( $block_namespaces as $block_namespace ) {
//
//		// Get all available block styles of the given block namespace.
//		$block_styles = glob( dirname( __FILE__ ) . '/assets/build/css/blocks/' . $block_namespace . '/*.css' );
//		$block_styles = array_map(
//			function( $styles_path ) { return basename( $styles_path, '.css' ); },
//			$block_styles
//		);
//
//		foreach ( $block_styles as $block_style ) {
//
//			// Enqueue individual block stylesheets.
//			wp_enqueue_block_style(
//				$block_namespace . '/' . $block_style,
//				array(
//					'handle' => 'tbones-' . $block_namespace . '-' . $block_style . '-styles',
//					'src'    => get_theme_file_uri( 'assets/build/css/blocks/' . $block_namespace . '/' . $block_style . '.css' ),
//
//					// Add "path" to allow inlining of block styles when possible.
//					'path'   => get_theme_file_path( 'assets/build/css/blocks/' . $block_namespace . '/' . $block_style . '.css' ),
//				),
//			);
//		}
//	}
//}
//add_action( 'wp', 'tbones_enqueue_block_styles' );

/**
 * Register block styles.
 *
 * @since 1.0.0
 */
function tbones_registrations() {

	// Register block styles

	$block_styles = array(
		'core/paragraph' => array(
			'big-text'    => __( 'Big Text', 'tbones' )
		)
	);

	foreach ( $block_styles as $block => $styles ) {
		foreach ( $styles as $style_name => $style_label ) {
			register_block_style(
				$block,
				array(
					'name'  => $style_name,
					'label' => $style_label,
				)
			);
		}
	}

	// Register pattern categories

	register_block_pattern_category( 'rutgers', array(
		'label' => __( 'Rutgers', 'tbones' )
	) );

	register_block_pattern_category( 'sections', array(
		'label' => __( 'Sections', 'tbones' )
	) );

	register_block_pattern_category( 'templates', array(
		'label' => __( 'Templates', 'tbones' )
	) );
}
add_action( 'init', 'tbones_registrations' );



// Remove Core Block Patterns

add_action( 'init', 'block_course_theme_unregister_patterns', 15 );

function block_course_theme_unregister_patterns() {
	add_filter( 'should_load_remote_block_patterns', '__return_false' );
}



/* Remove Unwanted Gutenberg Options for Editor */

// Youtube URL - https://www.youtube.com/watch?v=a1TzCyQ7eUI

function cc_gutenberg_register_files() {
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
add_action( 'init', 'cc_gutenberg_register_files' );
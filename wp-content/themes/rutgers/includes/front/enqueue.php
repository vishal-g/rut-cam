<?php

function tbt_enqueue()
{


    $themecsspath = get_stylesheet_directory() . ('/assets/build/css/app.css');
    $themejspath = get_stylesheet_directory() . ('/assets/build/js/app.js');


    // Lottie player - Currently not required since loading from iframe
    // wp_enqueue_script( 'theme-lottie-js', tbones_asset('assets/build/js/vendors/lottie-player/lottie-player.js') , array(), '1.7.0' );

    wp_enqueue_style('tbones-css', get_stylesheet_directory_uri() . ('/assets/build/css/app.css'), array(),  filemtime($themecsspath));

    wp_enqueue_script('tbones-js',  get_stylesheet_directory_uri() . ('/assets/build/js/app.js'), array(), filemtime($themejspath));
}



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
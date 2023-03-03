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

include(get_theme_file_path('/includes/front/enqueue.php'));
include(get_theme_file_path('/includes/setup.php'));
include(get_theme_file_path('/includes/register.php'));
include(get_theme_file_path('/includes/class-tgm-plugin-activation.php'));
include(get_theme_file_path('/includes/register-plugins.php'));
include(get_theme_file_path('/includes/register-showbreadcrumbs.php'));



//hooks
add_action('init', 'tbt_registrations');
add_action('tgmpa_register', 'tbt_register_plugins');
add_action('after_setup_theme', 'tbt_setup', 99);
add_action('wp_enqueue_scripts', 'tbt_enqueue', 99);
add_action('init', 'tbt_block_course_theme_unregister_patterns', 15);
// add_action('init', 'tbt_cc_gutenberg_register_files');


// Add active menu class to parent of active link
add_action('wp_footer', function () {
?>
<script>
document.body.querySelectorAll('.wp-block-navigation').forEach(function(navBlock) {
    navBlock.querySelectorAll('[href="' + window.location.href + '"]').forEach(function(navActiveLink) {

        if (navActiveLink.parentNode.closest(".wp-block-navigation-submenu")) {

            navActiveLink.parentNode.closest(".wp-block-navigation-submenu").classList.add(
                'active-nav-item-parent');

            navActiveLink.parentNode.classList.add('active-nav-item');

        } else {
            navActiveLink.parentNode.classList.add('active-nav-item-top-lvl');

        };

    });
});
</script>
<?php
});

// Adding json mime type to upload json file via media folder
function my_mime_types($mimes)
{
    $mimes['json'] = 'text/plain';
    return $mimes;
}
add_filter('upload_mimes', 'my_mime_types');
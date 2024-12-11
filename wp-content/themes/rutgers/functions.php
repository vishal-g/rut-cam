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

        document.body.querySelectorAll('.wp-block-navigation__container .current-menu-item').forEach(function(currentItem) {
            currentItem.parentNode.closest(".wp-block-navigation-submenu").classList.add(
                'active-nav-item-parent');
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

// add search fuctionality
// Add the search icon to the header using a hook
function add_search_icon_to_header() {
    ?>
        <!-- Popup Modal for Search -->
        <div id="search-popup-modal" class="search-popup-modal">
            <div>
                
            </div>
            <div class="search-popup-content">
                <button class="close-btn" id="close-btn">
                    <!-- &times; -->
                <svg role="presentation" version="1.1" class="close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 23.3" xml:space="preserve">
                    <title>Close Search</title>
                    <path d="M2.8,0L12,9.2L21.2,0l2.1,2.1l-9.2,9.2l9.9,9.9l-2.1,2.1L12,13.4l-9.9,9.9L0,21.2l9.9-9.9L0.7,2.1L2.8,0z"></path>
                </svg>
                </button>
                
                <!-- Site Logo -->
                 <div class="search-popup-logo has-global-padding">
                    <img src="<?php echo esc_url( get_site_url() ) . '/wp-content/uploads/2023/02/Outlook-foetqaec.png'; ?>" alt="Site Logo">
                </div>
                
                <!-- Search Form -->
                <form id="search-form" method="get" action="">
                    <div class="search-inputfield">
                        <input type="text" name="s" id="search-textfield" placeholder="Search" required>
                       
                        <button type="submit" id="search-btn">
                            <svg class="popup-serach-icon-svg"version="1.1" role="img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 28 28">
                                <title>Search</title>
                                <path d="M11.1,0C5,0,0,5,0,11.1s5,11.1,11.1,11.1c2.3,0,4.5-0.7,6.3-2l7.3,7.3c0.8,0.8,2,0.8,2.8,0c0.8-0.8,0.8-2,0-2.8
                                    l-7.3-7.3c1.3-1.8,2-4,2-6.3C22.1,5,17.2,0,11.1,0z M11.1,3.9c4,0,7.2,3.2,7.2,7.2c0,4-3.2,7.2-7.2,7.2c-4,0-7.2-3.2-7.2-7.2
                                    C3.9,7.1,7.1,3.9,11.1,3.9z"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- <div class="search-radio-buttons">
                        <div class="radio-wrapper">
                        <input type="radio" name="search-option" value="site" checked><label> Search this site</label>
                        </div>
                        <div class="radio-wrapper">
                        <input type="radio" name="search-option" value="rutgers"> <label>Search all Rutgers</label>
                        </div>
                        <div class="radio-wrapper">
                        <input type="radio" name="search-option" value="people"><label> Search People</label>
                        </div>
                    </div> -->

                    <div class="search-radio-buttons">
                        <div class="radio-wrapper">
                            <input type="radio" name="search-option" value="site" id="search-site" checked>
                            <label for="search-site"> Search this site</label>
                        </div>
                        <div class="radio-wrapper">
                            <input type="radio" name="search-option" value="rutgers" id="search-rutgers">
                            <label for="search-rutgers">Search all Rutgers</label>
                        </div>
                        <div class="radio-wrapper">
                            <input type="radio" name="search-option" value="people" id="search-people">
                            <label for="search-people"> Search People</label>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    <?php
}
add_action('wp_footer', 'add_search_icon_to_header'); 
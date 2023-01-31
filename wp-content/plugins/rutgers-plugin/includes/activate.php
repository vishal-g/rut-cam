<?php

function tbones_activate_plugin()
{
    // 6.0 < 5.8
    if (version_compare(get_bloginfo('version'), '5.8', '<')) {
        wp_die(
            __('You must update WordPress to use this plugin.', 'tbones-p')
        );
    }

    flush_rewrite_rules();
}
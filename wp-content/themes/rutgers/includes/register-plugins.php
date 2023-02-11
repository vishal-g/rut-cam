<?php

function tbt_register_plugins()
{
    $plugins = [
        [
            'name' => 'Rutgers Plugin',
            'slug' => 'rutgers-plugin',
            'required' => true,
            'source' => get_template_directory() . '/plugins/rutgers-plugin.zip'
        ],
        [
            'name' => 'Regenerate Thumbnails',
            'slug' => 'regenerate-thumbnails',
            'required' => false
        ],
        [
            'name' => 'Video Popup by WPZoom',
            'slug' => 'wpzoom-video-popup-block',
            'required' => false
        ],
        [
            'name' => 'SVG Support by BenBodhi',
            'slug' => 'svg-support',
            'required' => false
        ],
        [
            'name' => 'WP All In One Migration Free',
            'slug' => 'all-in-one-wp-migration',
            'required' => false
        ],
        [
            'name' => 'WP Migrate',
            'slug' => 'wp-migrate-db-pro',
            'required' => false,
            'source' => get_template_directory() . '/plugins/wp-migrate-db-pro.zip'
        ],
        [
            'name' => 'WP Migrate',
            'slug' => 'wp-migrate-db-pro',
            'required' => false,
            'source' => get_template_directory() . '/plugins/wp-migrate-db-pro.zip'
        ]
    ];
    $configs = [
        'id' => 'tbones',
        'menu' => 'tgmpa-install-plugins',
        'parent_slug' => 'themes.php',
        'capability' => 'edit_theme_options',
        'has_notices' => true,
        'dismissable' => true
    ];
    tgmpa($plugins, $configs);
}

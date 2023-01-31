<?php 

function ta_register_plugins() {
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
    tgmpa($plugins, $configs)
}
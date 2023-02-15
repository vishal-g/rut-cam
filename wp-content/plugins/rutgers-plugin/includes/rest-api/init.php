<?php

function tbones_rest_api_init()
{
    register_rest_route('tbones/v1', '/tags', [
        'methods' => 'GET',
        'callback' => 'tbones_rest_api_tags_handler',
        'permission_callback' => '__return_true'
    ]);
}

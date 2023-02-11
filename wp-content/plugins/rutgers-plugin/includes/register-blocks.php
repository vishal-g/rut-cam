<?php
function tbones_register_blocks()
{

    $blocks = [
        ['name' => 'carousel-slider'],
        ['name' => 'carousel-slider-item'],
        [ 'name' => 'popular-recipes', 'options' => [
            'render_callback' => 'up_popular_recipes_cb'
          ]],
    ];


    foreach ($blocks as $block) {
        register_block_type(
            TBONES_PLUGIN_DIR . 'build/blocks/' . $block['name'],
            isset($block['options']) ? $block['options'] : []
        );
    }
}
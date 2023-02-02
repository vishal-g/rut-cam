<?php
function tbones_register_blocks()
{

    $blocks = [
        ['name' => 'carousel-slider'],
        ['name' => 'carousel-slider-item']
    ];


    foreach ($blocks as $block) {
        register_block_type(
            TBONES_PLUGIN_DIR . 'build/blocks/' . $block['name'],
            isset($block['options']) ? $block['options'] : []
        );
    }
}
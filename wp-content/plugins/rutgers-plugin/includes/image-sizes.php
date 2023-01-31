<?php

function tbones_custom_image_sizes($sizes)
{
    return array_merge($sizes, [
        'carouselSlider' => __('Carousel Slider', 'tbones-p')
    ]);
}
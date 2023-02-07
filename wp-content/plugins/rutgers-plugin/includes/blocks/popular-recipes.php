<?php

function up_popular_recipes_cb($atts) {
  $title = esc_html($atts['title']);
  $cuisineIDs = array_map(function($term) {
    return $term['id'];
  }, $atts['cuisines']);

  $args = [
    'post_type' => 'recipe',
    'posts_per_page' => $atts['count'],
    'orderby' => 'meta_value_num',
    'meta_key' => 'recipe_rating',
    'order' => 'DESC'
  ];

  if(!empty($cuisineIDs)) {
    $args['tax_query'] = [
      [
        'taxonomy' => 'cuisine',
        'field' => 'term_id',
        'terms' => $cuisineIDs
      ]
    ];
  }

  $query = new WP_Query($args);

  ob_start();
  ?>
  <div class="wp-block-tbones-p-popular-recipes">
    <h6><?php echo $title; ?></h6>
    <?php

    if($query->have_posts()) {
      while($query->have_posts()) {
        $query->the_post();
        ?>
        <div class="single-post">
          <a class="single-post-image" href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail('thumbnail'); ?>
          </a>
          <div class="single-post-detail">
            <a href="<?php the_permalink(); ?>">
              <?php the_title(); ?>
            </a>
            <span>
              By
              <a href="<?php the_permalink(); ?>">
                <?php the_author(); ?>
              </a>
            </span>
          </div>
        </div>
        <?php
      }
    }

    ?>
  </div>
  <?php

  wp_reset_postdata();

  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}
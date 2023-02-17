<?php

function tbones_post_list_cb($atts)
{
  $title = esc_html($atts['title']);

  $tagIDs = array_map(function ($term) {
    return $term['id'];
  }, $atts['tags']);

  $args = [
    'post_type' => 'post',
    'posts_per_page' => $atts['count'],
    'orderby' => 'date',
    'order' => 'DESC'
  ];

  if (!empty($tagIDs)) {
    $args['tax_query'] = [
      [
        'taxonomy' => 'post_tag',
        'field' => 'term_id',
        'terms' => $tagIDs
      ]
    ];
  }

  $query = new WP_Query($args);

  ob_start();
?>
  <div class="wp-block-tbones-p-post-list">

    <?php if (!$atts["hidetitle"]) : ?>
      <h3><?php echo $title; ?></h3>
    <?php endif; ?>
    <ul class="ta-sidebar-blog-widget">
      <?php

      if ($query->have_posts()) {
        while ($query->have_posts()) {
          $query->the_post();

          $post_date = get_the_date('F j, Y');

          $authorInitials = substr(get_the_author(), 0, 2);
          $authorPageUrl = get_author_posts_url(get_the_author_meta('ID'));

          $posttags = get_the_tags();

      ?>
          <li class="ta-sidebar-blog-widget__blog-item">
            <ul class="ta-category-listing">

              <?php

              if ($posttags) {
                foreach ($posttags as $tag) {
              ?>

                  <li>
                    <a href="<?php echo get_tag_link($tag->term_id) ?>" class="ta-tags"><?php echo $tag->name; ?></a>
                  </li>
              <?php }
              }
              ?>


            </ul>
            <div class="ta-post-title">
              <a href="<?php the_permalink() ?>">
                <?php the_title(); ?>
              </a>
            </div>
            <div class="ta-author-data flex flex-row space-x-3 justify-start">
              <div class="ta-name-initials">
                <a href="<?php echo $authorPageUrl  ?>">
                  <?php echo $authorInitials ?>
                </a>
              </div>
              <div class="basis-[100%]">
                <div class="font-bold ta-author">
                  <a href="<?php echo $authorPageUrl  ?>"><?php the_author(); ?></a>
                </div>
                <p class="ta-post-date"><?php echo $post_date ?></p>
              </div>
              <img src="/wp-content/uploads/2022/12/bookmark_icon_black.svg" class="w-4 h-4 basis-1/5" alt="" />
            </div>
          </li>

      <?php
        }
      }

      ?>
    </ul>
  </div>
<?php

  wp_reset_postdata();

  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}

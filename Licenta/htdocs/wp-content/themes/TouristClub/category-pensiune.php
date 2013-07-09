<?php get_header(); 

//change excerpt length
function custom_excerpt_length( $length ) {
	return 35;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function new_excerpt_more( $more ) {
	return ' <a class="read-more" href="'. get_permalink( get_the_ID() ) . '">Mai mult..</a>';
}
add_filter( 'excerpt_more', 'new_excerpt_more' );

?>

<section>
  <aside class="floatleft">
    <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar1") ) : ?>
    <?php endif; ?>
  </aside>
  <article class="floatright">
    <h1><?php single_cat_title(); ?></h1>
    <div id="breadcrumb">
      <?php
      if (class_exists('breadcrumb_navigation_xt')) {
      // new breadcrumb object
      $mybreadcrumb = new breadcrumb_navigation_xt;
      // Display the breadcrumb
      $mybreadcrumb->opt['title_blog'] = 'Home';
          $mybreadcrumb->opt['separator'] = ' &raquo; ';
          $mybreadcrumb->opt['singleblogpost_category_display'] = true;
      $mybreadcrumb->display();
      }
      ?>
    </div>
    <!-- [breadcrumb] -->
    
    <?php echo FrmProDisplaysController::get_shortcode(array('id' => 184)) ?>
    
  </article>
</section>
<?php get_footer(); ?>

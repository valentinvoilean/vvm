<?php get_header(); ?>
<section>
  <article class="floatleft">
	<?php while ( have_posts() ) : the_post(); ?>
    <?php the_content(); ?>
    <?php the_meta(); ?>
    <?php endwhile; // end of the loop. ?>
  </article>
  
  <aside class="floatright">
  <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar1") ) : ?><?php endif; ?>
    <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar3") ) : ?><?php endif; ?>
  </aside>
</section>
<?php get_footer(); ?>


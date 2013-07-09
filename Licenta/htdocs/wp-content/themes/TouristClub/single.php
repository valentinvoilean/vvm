<?php get_header(); ?>


<section>
  <aside class="floatleft">
    <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar1") ) : ?><?php endif; ?>
    <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar3") ) : ?><?php endif; ?>
  </aside>
  <article class="floatright">
    
        <?php while ( have_posts() ) : the_post(); ?>
        <?php the_content(); ?>
        <?php endwhile; // end of the loop. ?>
        
  </article>
</section>
<?php get_footer(); ?>

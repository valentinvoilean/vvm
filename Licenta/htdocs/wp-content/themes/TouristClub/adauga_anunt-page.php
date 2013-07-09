<?php 
/*
Template Name: Adauga Anunt
*/
get_header(); ?>
<section>
  <article class="floatleft">
   <?php
	if ( is_user_logged_in() ) {
	  while ( have_posts() ) : the_post();
		the_content();
		the_meta();
	  endwhile;
	} else {
    echo '<h1>Acces Interzis !</h1><p style="margin-top:50px; font-size:14px;">Pentru a accesa aceasta pagina, trebuie sa fiti logat.<br> Daca nu aveti cont, va rugam sa va <a href="/cont-nou">INREGISTRATI</a>.</p>';
	}
?> 
  </article>
  
  <aside class="floatright">
  <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar3") ) : ?><?php endif; ?>
  </aside>
</section>
<?php get_footer(); ?>


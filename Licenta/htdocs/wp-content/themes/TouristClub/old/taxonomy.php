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
    <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar") ) : ?>
    <?php endif; ?>
  </aside>
  <article class="floatright">
    <h1><?php echo apply_filters( 'the_title', $term->name ); ?></h1>
    <div class="breadcrumb">
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
    
    
   
    <ul id="post_items">
	<?php if ( have_posts() ): while ( have_posts() ): the_post(); ?>
    <li>
      <div style="overflow:hidden; clear:both">
        <div class="cat_thumb">
          <a href="<?php the_permalink() ?>"><?php the_post_thumbnail(array(130,130) ); ?></a>
        </div>
      
        <div style="float:left; width:445px">
          <h2 style="background:none; margin:0 10px 0 0;padding:0; float:left; margin-bottom:20px"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
          <?php
            $cat_Id = get_the_category($post->ID);
            $categories = $cat_Id[0]->cat_name; 
             if ($categories == "Pensiune") 
             switch ($cat_Id[1]->cat_name) {
             case "Pensiune 1 margareta":
                   echo '<div class="margareta"></div>';
                   break;
             case "Pensiune 2 margarete":
                   echo '<div class="margareta"></div><div class="margareta"></div>';
                   break;
             case "Pensiune 3 margarete":
                   echo '<div class="margareta"></div><div class="margareta"></div><div class="margareta"></div>';
                   break;
             case "Pensiune 4 margarete":
                   echo '<div class="margareta"></div><div class="margareta"></div><div class="margareta"></div><div class="margareta"></div>';
                   break;
             case "Pensiune 5 margarete":
                   echo '<div class="margareta"></div><div class="margareta"></div><div class="margareta"></div><div class="margareta"></div><div class="margareta"></div>';
                   break;
          };
            if ($categories == "Hotel") 
             switch ($cat_Id[1]->cat_name) {
             case "Hotel 1 * / stea":
                   echo '<div class="star"></div>';
                   break;
             case "Hotel 2 ** / stele":
                   echo '<div class="star"></div><div class="star"></div>';
                   break;
             case "Hotel 3 *** / stele":
                   echo '<div class="star"></div><div class="star"></div><div class="star"></div>';
                   break;
             case "Hotel 4 **** / stele":
                   echo '<div class="star"></div><div class="star"></div><div class="star"></div><div class="star"></div>';
                   break;
             case "Hotel 5 ***** / stele":
                   echo '<div class="star"></div><div class="star"></div><div class="star"></div><div class="star"></div><div class="star"></div>';
                   break;
          };
          ?>
          <a href="<?php the_permalink() ?>#tabs-2" style="float:right; text-align:right"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())),' vot(uri)'; ?><br><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'average', 272 => get_the_ID(), round =>'2' )); ?> / 10</a>
        </div>
       
        <p style="margin:0 0 5px 0; font-style:italic">
          <?php echo get_post_meta($post->ID, "adresa", true); ?>, <?php echo get_post_meta($post->ID, "oras", true); ?>, <a href="/judet/<?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name; ?>"><?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name; ?></a>
        </p>
        <?php the_excerpt(); ?>
      </div>
      
	  <?php if (($categories == "Pensiune") || ($categories == "Hotel")) { ?>
        <table style="clear:both; width:100%; margin-top:20px">
          <tr style="background:#eeeeee; font-weight:bold">
            <td colspan="3" style="height:20px; padding-left:5px">Facilitati Generale</td>
          </tr>
          <tr style="border-bottom:1px dotted #eeeeee">
              <td colspan="3" style="padding-left:5px">  
              <?php   
			  $facilitati = wp_get_object_terms($post->ID,"facilitati-hotel");
               $count = count($facilitati);
               if ( $count > 0 ){
                   echo "<ul class='facilitati'>";
                   foreach ( $facilitati as $facilitate ) {
                     echo "<li style='line-height:15px; border-bottom:0; background:none'><a href='/facilitati-hotel/".$facilitate->slug."'>" . $facilitate->name . "</a></li>";
                      
                   }
                   echo "</ul>";
               } ?>
              </td>
          </tr>
    	  <tr style="height:20px"><td></td></tr>
          <tr style="background:#eeeeee; font-weight:bold">
            <td style="height:20px; padding-left:5px">Camere</td><td>Oferta</td><td>Pret</td>
          </tr>
          
          <?php if (get_post_meta($post->ID, "camera1", true)) { ?>
              <tr style="border-bottom:1px dotted #eeeeee">
              <td style="padding-left:5px"><?php echo get_post_meta($post->ID, "camera1", true);?></td><td><?php if (get_post_meta($post->ID, "pret_f1", true)) echo get_post_meta($post->ID, "pret_f1", true); ?></td><td><?php echo get_post_meta($post->ID, "pret_c1", true).' RON';?></td>
              </tr>
          <?php }?>
          
          <?php if (get_post_meta($post->ID, "camera2", true)) { ?>
              <tr style="border-bottom:1px dotted #eeeeee">
              <td style="padding-left:5px"><?php echo get_post_meta($post->ID, "camera2", true);?></td><td><?php if (get_post_meta($post->ID, "pret_f2", true)) echo get_post_meta($post->ID, "pret_f2", true); ?></td><td><?php echo get_post_meta($post->ID, "pret_c2", true).' RON';?></td>
              </tr>
          <?php }?>
          
          <?php if (get_post_meta($post->ID, "camera2", true)) { ?>
              <tr style="border-bottom:1px dotted #eeeeee">
              <td style="padding-left:5px"><?php echo get_post_meta($post->ID, "camera2", true);?></td><td><?php if (get_post_meta($post->ID, "pret_f3", true)) echo get_post_meta($post->ID, "pret_f3", true); ?></td><td><?php echo get_post_meta($post->ID, "pret_c3", true).' RON';?></td>
              </tr>
          <?php }?>
        </table>
      <?php }?>
      
      
      <?php if ($categories == "Restaurant") { ?>
        <table style="clear:both; width:100%; margin-top:20px">
        
        <tr style="background:#eeeeee; font-weight:bold">
            <td colspan="3" style="height:20px; padding-left:5px">Facilitati Generale</td>
          </tr>
          <tr style="border-bottom:1px dotted #eeeeee">
              <td colspan="3" style="padding-left:5px">  
              <?php   
			  $facilitati = wp_get_object_terms($post->ID,"facilitati-restaurant");
               $count = count($facilitati);
               if ( $count > 0 ){
                   echo "<ul class='facilitati'>";
                   foreach ( $facilitati as $facilitate ) {
                     echo "<li style='line-height:15px; border-bottom:0; background:none'><a href='/facilitati-restaurant/".$facilitate->slug."'>" . $facilitate->name . "</a></li>";
                      
                   }
                   echo "</ul>";
               } ?>
              </td>
          </tr>
    	  <tr style="height:20px"><td></td></tr>
          
          <tr style="background:#eeeeee; font-weight:bold">
            <td style="height:20px; padding-left:5px">Categorie</td><td>Program</td><td>Capacitate</td>
          </tr>
          <tr style="border-bottom:1px dotted #eeeeee">
              <td style="padding-left:5px"><?php echo $cat_Id[1]->cat_name ?></td><td><?php echo get_post_meta($post->ID, "program", true); ?></td><td><?php echo get_post_meta($post->ID, "capacitate", true).' persoane';?></td>
          </tr>
          
        </table>
      <?php }?>
          
      
      
    </li>
	<?php endwhile; else: ?>

		<p>Nu sunt anunturi ce corespund cerintelor dumneavoastra.</p>

		<?php endif; ?>
	</ul>
    
    <?php if(function_exists('wp_paginate')) {
    wp_paginate();
} ?>

  </article>
</section>
<?php get_footer(); ?>

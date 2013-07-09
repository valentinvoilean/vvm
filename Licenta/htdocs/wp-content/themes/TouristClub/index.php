<?php include (TEMPLATEPATH . '/header-home.php'); 

//change excerpt length
function custom_excerpt_length( $length ) {
	return 15;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );


?>

<section>
  <article class="floatleft">
    <div style="border-bottom:1px solid #e3e3e3; overflow:hidden; margin:10px 0 30px">
      <h1 class="floatleft"><a class="hotel-pic" title="ultimele hoteluri" href="/tip/hotel"></a> <a title="ultimele hoteluri" href="/tip/hotel">Ultimele Hoteluri</a></h1>
      <a title="vezi toate hotelurile" style="margin-top:10px;float:right" href="/tip/hotel">Vezi toate</a> </div>
    <div style="overflow: hidden">
      <?php 
    query_posts(array( 
        'post_type' => 'post',
        'showposts' => 4,
		'category_name' => 'hotel',
    ) );  
?>
      <?php while (have_posts()) : the_post(); ?>
      <span itemscope itemtype="http://schema.org/Hotel" style="display:none"> <span itemprop="name">
      <?php the_title(); ?>
      </span>
      <div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating"> <span itemprop="ratingValue"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'average', 272 => get_the_ID(), round =>'2' ));?></span> <span itemprop="reviewCount"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())); ?></span> </div>
      <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"> <span itemprop="streetAddress"><?php echo get_post_meta($post->ID, "adresa", true); ?></span> <span itemprop="addressLocality"><?php echo get_post_meta($post->ID, "oras", true); ?></span> <span itemprop="addressRegion">
        <?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name ?>
        </span> </div>
      </span>
      <?php endwhile; ?>
      <table>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0px 5px"><div style="width:130px;height:130px;padding:4px; border:1px solid #e3e3e3; position:relative"> <a href="<?php the_permalink() ?>">
              <?php the_post_thumbnail(array(130,130) ); ?>
              </a> <a href="<?php the_permalink() ?>#tabs-2" style="width:80px; height:20px; position:absolute; bottom:11px; right:10px; background: rgba(255,255,255,0.8); text-align:center; font-size:10px; font-weight:bold">Nota: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'average', 272 => get_the_ID(), round =>'2' ));?></a> </div></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><h4 style="line-height:14px;margin-top:5px; font-size:14px"><a style="color:#69d2e7; font-weight:bold" href="<?php the_permalink() ?>">
              <?php the_title(); ?>
              </a></h4></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><div style="clear:both;line-height:14px; font-size:10px; padding:3px 0 "><a href="/tip/hotel/?oras=<?php echo get_post_meta($post->ID, 'oras', true); ?>"><?php echo get_post_meta($post->ID, "oras", true); ?></a>, jud. <a href="/tip/hotel/?judet=<?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->slug ?>" style="color:#f38630; font-weight:bold">
              <?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name ?>
              </a></div>
          </td>
          <?php endwhile; ?>
        </tr>
        <tr>
         <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px">
        <div style="clear:both; margin-top:-5px; overflow:hidden">
              <?php
	$cat_Id = get_the_category($post->ID);
    $categories = $cat_Id[0]->cat_name;
    
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
            </div>
            </td>
            <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><div style="clear:both; font-size:10px;margin-top:5px; line-height:14px;"><?php echo get_the_excerpt(); ?></div></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><table style="margin-top:5px; border-top:1px solid #e3e3e3; border-bottom:1px solid #e3e3e3; width:140px">
              <tr>
                <td><div class="stea-pareri"></div></td>
                <td><a style="color:#bcbcbc" href="<?php the_permalink() ?>#tabs-2"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())); if (FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())) == 1) echo ' vot'; else echo ' voturi';?></a></td>
                <td style="text-align:right"><a style="color:#f38630" href="<?php the_permalink() ?>">Mai mult..</a></td>
              </tr>
            </table></td>
          <?php endwhile; ?>
        </tr>
      </table>
    </div>
    <div style="border-bottom:1px solid #e3e3e3; overflow:hidden; margin-bottom:30px; margin-top:50px">
      <h1 class="floatleft"><a class="hotel-pic" href="/tip/pensiune"></a> <a href="/tip/pensiune">Ultimele Pensiuni</a></h1>
      <a style="margin-top:10px;float:right" href="/tip/pensiune">Vezi toate</a> </div>
    <div style="overflow: hidden">
      <?php 
    query_posts(array( 
        'post_type' => 'post',
        'showposts' => 4,
		'category_name' => 'pensiune',
    ) );  
?>
      <?php while (have_posts()) : the_post(); ?>
      <span itemscope itemtype="http://schema.org/Hostel" style="display:none"> <span itemprop="name">
      <?php the_title(); ?>
      </span>
      <div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating"> <span itemprop="ratingValue"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'average', 272 => get_the_ID(), round =>'2' ));?></span> <span itemprop="reviewCount"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())); ?></span> </div>
      <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"> <span itemprop="streetAddress"><?php echo get_post_meta($post->ID, "adresa", true); ?></span> <span itemprop="addressLocality"><?php echo get_post_meta($post->ID, "oras", true); ?></span> <span itemprop="addressRegion">
        <?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name ?>
        </span> </div>
      </span>
      <?php endwhile; ?>
      <table>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0px 5px"><div style="width:130px;height:130px;padding:4px; border:1px solid #e3e3e3; position:relative"> <a href="<?php the_permalink() ?>">
              <?php the_post_thumbnail(array(130,130) ); ?>
              </a> <a href="<?php the_permalink() ?>#tabs-2" style="width:80px; height:20px; position:absolute; bottom:11px; right:10px; background: rgba(255,255,255,0.8); text-align:center; font-size:10px; font-weight:bold">Nota: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'average', 272 => get_the_ID(), round =>'2' ));?></a> </div></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><h4 style="line-height:14px;margin-top:5px; font-size:14px"><a style="color:#69d2e7; font-weight:bold" href="<?php the_permalink() ?>">
              <?php the_title(); ?>
              </a></h4></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><div style="clear:both;line-height:14px; color:#f38630; font-size:10px; padding:3px 0 "><a href="/tip/pensiune/?oras=<?php echo get_post_meta($post->ID, 'oras', true); ?>"><?php echo get_post_meta($post->ID, "oras", true); ?></a>, jud. <a href="/tip/pensiune/?judet=<?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->slug ?>" style="color:#f38630; font-weight:bold">
              <?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name ?>
              </a></div>
          </td>
		  <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px">
            <div style="clear:both; margin-top:-5px; overflow:hidden">
              <?php
	$cat_Id = get_the_category($post->ID);
    $categories = $cat_Id[0]->cat_name;
    
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

?>
            </div></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><div style="clear:both; font-size:10px;margin-top:5px; line-height:14px;"><?php echo get_the_excerpt(); ?></div></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><table style="margin-top:5px; border-top:1px solid #e3e3e3; border-bottom:1px solid #e3e3e3; width:140px">
              <tr>
                <td><div class="stea-pareri"></div></td>
                <td><a style="color:#bcbcbc" href="<?php the_permalink() ?>#tabs-2"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())); if (FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())) == 1) echo ' vot'; else echo ' voturi';?></a></td>
                <td style="text-align:right"><a style="color:#f38630" href="<?php the_permalink() ?>">Mai mult..</a></td>
              </tr>
            </table></td>
          <?php endwhile; ?>
        </tr>
      </table>
    </div>
    <div style="border-bottom:1px solid #e3e3e3; overflow:hidden; margin-bottom:30px; margin-top:50px">
      <h1 class="floatleft"><a class="restaurant-pic" href="/tip/restaurant"></a> <a href="/tip/restaurant">Ultimele Restaurante</a></h1>
      <a style="margin-top:10px;float:right" href="/tip/restaurant">Vezi toate</a> </div>
    <div style="overflow: hidden">
      <?php 
    query_posts(array( 
        'post_type' => 'post',
        'showposts' => 4,
		'category_name' => 'restaurant',
    ) );  
?>
      <?php while (have_posts()) : the_post(); ?>
      <span itemscope itemtype="http://schema.org/Restaurant" style="display:none"> <span itemprop="name">
      <?php the_title(); ?>
      </span>
      <div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating"> <span itemprop="ratingValue"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 285, 'type' => 'average', 287 => get_the_ID(), round =>'2' ));?></span> <span itemprop="reviewCount"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 285, 'type' => 'count', 287 => get_the_ID())); ?></span> </div>
      <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress"> <span itemprop="streetAddress"><?php echo get_post_meta($post->ID, "adresa", true); ?></span> <span itemprop="addressLocality"><?php echo get_post_meta($post->ID, "oras", true); ?></span> <span itemprop="addressRegion">
        <?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name ?>
        </span> </div>
      </span>
      <?php endwhile; ?>
      <table>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0px 5px"><div style="width:130px;height:130px;padding:4px; border:1px solid #e3e3e3; position:relative"> <a href="<?php the_permalink() ?>">
              <?php the_post_thumbnail(array(130,130) ); ?>
              </a> <a href="<?php the_permalink() ?>#tabs-2" style="width:80px; height:20px; position:absolute; bottom:11px; right:10px; background: rgba(255,255,255,0.8); text-align:center; font-size:10px; font-weight:bold">Nota: <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 285, 'type' => 'average', 287 => get_the_ID(), round =>'2' )); ?></a> </div></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><h4 style="line-height:14px;margin-top:5px; font-size:14px"><a style="color:#69d2e7; font-weight:bold" href="<?php the_permalink() ?>">
              <?php the_title(); ?>
              </a></h4></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><div style="clear:both;line-height:14px; color:#f38630; font-size:10px; padding:3px 0 "><a href="/tip/restaurant/?oras=<?php echo get_post_meta($post->ID, 'oras', true); ?>"><?php echo get_post_meta($post->ID, "oras", true); ?></a>, jud. <a href="/tip/restaurant/?judet=<?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->slug ?>" style="color:#f38630; font-weight:bold">
              <?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name ?>
              </a></div></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><div style="clear:both; font-size:10px;margin-top:5px; line-height:14px;"><?php echo get_the_excerpt(); ?></div></td>
          <?php endwhile; ?>
        </tr>
        <tr>
          <?php while (have_posts()) : the_post(); ?>
          <td style="width:140px;padding:0 5px"><table style="margin-top:5px; border-top:1px solid #e3e3e3; border-bottom:1px solid #e3e3e3; width:140px">
              <tr>
                <td><div class="stea-pareri"></div></td>
                <td><a style="color:#bcbcbc" href="<?php the_permalink() ?>#tabs-2"><?php echo FrmProStatisticsController::stats_shortcode(array('id' => 285, 'type' => 'count', 287 => get_the_ID())); if (FrmProStatisticsController::stats_shortcode(array('id' => 285, 'type' => 'count', 287 => get_the_ID())) == 1) echo ' vot'; else echo ' voturi';?></a></td>
                <td style="text-align:right"><a style="color:#f38630" href="<?php the_permalink() ?>">Mai mult..</a></td>
              </tr>
            </table></td>
          <?php endwhile; ?>
        </tr>
      </table>
    </div>
  </article>
  <aside class="floatright">
    <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar2") ) : ?>
    <?php endif; ?>
  </aside>
</section>
<?php get_footer(); ?>

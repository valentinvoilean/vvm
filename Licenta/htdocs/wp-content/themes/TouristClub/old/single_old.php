<?php get_header(); ?>

<section>
  <aside class="floatleft">
    <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar") ) : ?>
    <?php endif; ?>
  </aside>
  <article class="floatright">
    <h1 style="float:left"><?php echo get_the_title(); ?></h1><?php echo FrmProEntriesController::get_field_value_shortcode(array('field_id' => 85, 'entry_id' => 'current'));?>
    
    
	<?php
	$cat_Id = get_the_category($post->ID);
    $categories = $cat_Id[0]->cat_name; 
	 
	// Calculam Media Rate-urilor // 
	if (($categories == "Pensiune") || ($categories == "Hotel")) $total = FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'average', 272 => get_the_ID(), round =>'2' )); else $total = FrmProStatisticsController::stats_shortcode(array('id' => 285, 'type' => 'average', 287 => get_the_ID(), round =>'2' ));

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
	<a href="<?php the_permalink() ?>#tabs-2" onclick="window.location.href = '<?php the_permalink() ?>#tabs-2';location.reload()" style="float:right; font-weight:bold; font-size:18px; color:#e17009; text-align:right">Nota: <?php echo $total ?><br><span style="font-size:12px">din <?php if (($categories == "Pensiune") || ($categories == "Hotel")){ echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())); if (FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())) == 1) echo ' vot'; else echo ' voturi';} else { echo FrmProStatisticsController::stats_shortcode(array('id' => 285, 'type' => 'count', 287 => get_the_ID())); if (FrmProStatisticsController::stats_shortcode(array('id' => 285, 'type' => 'count', 287 => get_the_ID())) == 1) echo ' vot'; else echo ' voturi';}  ?></span></a>
    <div style="clear:both; font-style:italic"><?php echo get_post_meta($post->ID, "adresa", true); ?>, <?php echo get_post_meta($post->ID, "oras", true); ?>,
      
      
      <?php 
	  
 	  //Returns Array of Term Names for "my_term"
	  $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name;


/* $product_terms = wp_get_object_terms($post->ID, 'judet');
if(!empty($product_terms)){
  if(!is_wp_error( $product_terms )){
    echo '<ul>';
    foreach($product_terms as $term){
      echo '<li><a href="'.get_term_link($term->slug, 'judet').'">'.$term->name.'</a></li>'; 
    }
    echo '</ul>';
  }
}*/
	  
	  ?>
      
    </div>
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
    
    <?php
    $args = array( 'post_type' => 'attachment', 'numberposts' => -1, 'post_status' => null, 'post_parent' => $post->ID ); 
    $attachments = get_posts($args);
	$feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'full' );
	?>
    
    
      
      
    <div id="content-tabs">
      <ul>
        <li><a href="#tabs-1">Descriere</a></li>
        <li><a href="#tabs-2">Pareri Vizitatori</a></li>
        <li><a href="#tabs-3">Contact</a></li>
      </ul>
      <div id="tabs-1">
        <div style="clear:both; overflow:hidden">
        <div class="featuredimage"><a class="group1" href="<?php echo $feat_image ?>"><?php the_post_thumbnail( array(250,250) ); ?></a></div>
        <?php while ( have_posts() ) : the_post(); ?>
        <?php the_content(); ?>
        <?php endwhile; // end of the loop. ?>
        </div>
        <div class="gallery">
          <?php if (get_post_meta($post->ID, "imaginea2", true)) {?>
          <div class="galleryimg"> <a class="group1" href="<?php echo wp_get_attachment_url( get_post_meta($post->ID, "imaginea2", true) )?>" title="<?php echo get_post_meta($post->ID, "dsc_img2", true); ?>"> <?php echo wp_get_attachment_image( get_post_meta($post->ID, "imaginea2", true), array(115,115) )?> </a> </div>
          <?php }?>
          <?php if (get_post_meta($post->ID, "imaginea3", true)) {?>
          <div class="galleryimg"> <a class="group1" href="<?php echo wp_get_attachment_url( get_post_meta($post->ID, "imaginea3", true) )?>" title="<?php echo get_post_meta($post->ID, "dsc_img3", true); ?>"> <?php echo wp_get_attachment_image( get_post_meta($post->ID, "imaginea3", true), array(115,115) )?> </a> </div>
          <?php }?>
          <?php if (get_post_meta($post->ID, "imaginea4", true)) {?>
          <div class="galleryimg"> <a class="group1" href="<?php echo wp_get_attachment_url( get_post_meta($post->ID, "imaginea4", true) )?>" title="<?php echo get_post_meta($post->ID, "dsc_img4", true); ?>"> <?php echo wp_get_attachment_image( get_post_meta($post->ID, "imaginea4", true), array(115,115) )?> </a> </div>
          <?php }?>
          <?php if (get_post_meta($post->ID, "imaginea5", true)) {?>
          <div class="galleryimg lastimg"> <a class="group1" href="<?php echo wp_get_attachment_url( get_post_meta($post->ID, "imaginea5", true) )?>" title="<?php echo get_post_meta($post->ID, "dsc_img5", true); ?>"> <?php echo wp_get_attachment_image( get_post_meta($post->ID, "imaginea5", true), array(115,115) )?> </a> </div>
          <?php }?>
          <div style="clear:both">
          <div class="imgdesc"><?php echo get_post_meta($post->ID, "dsc_img2", true); ?></div>
          <div class="imgdesc"><?php echo get_post_meta($post->ID, "dsc_img3", true); ?></div>
          <div class="imgdesc"><?php echo get_post_meta($post->ID, "dsc_img4", true); ?></div>
          <div class="imgdesc lastdesc"><?php echo get_post_meta($post->ID, "dsc_img5", true); ?></div>
          </div>
        </div>
      
      
      
      <div id="camere">
        <h3>Detalii <?php echo $categories; ?></h3>
          <div>
            <div class="optiune">
              <p style="width:150px; float:left;"><b>Facilitati Generale:</b></p>
              <div style="width:300px; float:right">
              

			  
			  
			  <?php 
			  if (wp_get_object_terms($post->ID,"facilitati-hotel")){
			  $facilitati = wp_get_object_terms($post->ID,"facilitati-hotel");
			  $facilitati_tip="facilitati-hotel";}
			  if (wp_get_object_terms($post->ID,"facilitati-restaurant")){
			  $facilitati = wp_get_object_terms($post->ID,"facilitati-restaurant");
			  $facilitati_tip="facilitati-hotel";}
               $count = count($facilitati);
               if ( $count > 0 ){
                   echo "<ul class='facilitati'>";
                   foreach ( $facilitati as $facilitate ) {
                     echo "<li style='line-height:15px; border-bottom:0; background:none'>". $facilitate->name . "</li>";
                      
                   }
                   echo "</ul>";
               } ?>
              </div>
            </div>
            
			<?php if (get_post_meta($post->ID, "program", true)) { ?>
            <div class="optiune">
              <p style="width:150px; float:left;"><b>Program de functionare:</b></p>
              <div style="width:300px; float:right; color:#676767">
              <?php echo get_post_meta($post->ID, "program", true) ?>
              </div>
            </div>
			<?php } ?>
            
            <?php if (get_post_meta($post->ID, "capacitate", true)) { ?>
            <div class="optiune">
              <p style="width:150px; float:left;"><b>Capacitate Incapere:</b></p>
              <div style="width:300px; float:right; color:#676767">
              <?php echo get_post_meta($post->ID, "capacitate", true) ?>
              </div>
            </div>
			<?php } ?>
			
			
			<?php if (get_post_meta($post->ID, "start_checkin", true)) { ?>
            <div class="optiune">
              <p style="width:150px; float:left;"><b>Check-In:</b></p>
              <div style="width:300px; float:right;color:#676767">
              de la ora <?php echo get_post_meta($post->ID, "start_checkin", true) ?> la ora <?php echo get_post_meta($post->ID, "stop_checkin", true) ?>
              </div>
            </div>
            <?php } ?>
            
            <?php if (get_post_meta($post->ID, "start_checkout", true)) { ?>
            <div class="optiune">
              <p style="width:150px; float:left;"><b>Check-Out:</b></p>
              <div style="width:300px; float:right;color:#676767">
              de la ora <?php echo get_post_meta($post->ID, "start_checkout", true) ?> la ora <?php echo get_post_meta($post->ID, "stop_checkout", true) ?>
              </div>
            </div>
			<?php } ?>

            <?php if (get_post_meta($post->ID, "pets", true)) { ?>
            <div class="optiune">
              <p style="width:150px; float:left;"><b>Animale de companie:</b></p>
              <div style="width:300px; float:right; color:#676767">
              <?php echo get_post_meta($post->ID, "pets", true) ?>
              </div>
            </div>
			<?php } ?>
            
            <div class="optiune">
              <p style="width:150px; float:left;"><b>Parcare:</b></p>
              <div style="width:300px; float:right;color:#676767">
              <?php echo get_post_meta($post->ID, "parcare", true) ?>
              </div>
            </div>
            
            <?php if (get_post_meta($post->ID, "wifi", true)) { ?>
            <div class="optiune">
              <p style="width:150px; float:left;"><b>Internet Wifi:</b></p>
              <div style="width:300px; float:right; color:#676767">
              <?php echo get_post_meta($post->ID, "wifi", true) ?>
              </div>
            </div>
			<?php } ?>
           

          </div>
          
          <?php if (get_post_meta($post->ID, "camera1", true)) {
			
			  ?>
            <h3><?php echo get_post_meta($post->ID, "camera1", true);  if (get_post_meta($post->ID, "pret_f1", true)) echo ' - '.get_post_meta($post->ID, "pret_f1", true); ?></h3>
            <div>
              
              <div class="optiune">
                <p style="width:150px; float:left;">
                        <span style="text-transform: capitalize"><b>Descriere:</b></span><br>
                        <?php if (get_post_meta($post->ID, "imaginea6", true)) {?>
                        	 <a class="group1 cameraimg" href="<?php echo wp_get_attachment_url( get_post_meta($post->ID, "imaginea6", true) )?>"> <?php echo wp_get_attachment_image( get_post_meta($post->ID, "imaginea6", true), array(115,115) )?> </a> 
                        <?php }?>
                </p>        
                <div style="width:300px; float:right; font-size:12px; color:#676767; margin-top:25px"><?php echo get_post_meta($post->ID, "dsc_c1", true) ?></div>
              </div>
              
              <div style="clear:both"></div>
            
              <div class="optiune">  
                <p style="width:150px; float:left;"><b>Facilitati:</b></p>
                <div style="width:300px; float:right">
                <?php $facilitati = wp_get_object_terms($post->ID,"facilitati-camera-1");
                 $count = count($facilitati);
                 if ( $count > 0 ){
                   echo "<ul class='facilitati'>";
                   foreach ( $facilitati as $facilitate ) {
                     echo "<li style='line-height:15px; border-bottom:0; background:none'>" . $facilitate->name . "</li>";
                      
                   }
                   echo "</ul>";
               } ?>
                </div>         
              </div>
              
              
              <div class="optiune">  
                <p style="width:150px; float:left;"><b>Pret:</b></p>
                <div style="width:300px; float:right; color:#676767">
                <?php echo get_post_meta($post->ID, "pret_c1", true);?>
                </div>         
              </div>
              
            </div>
          <?php }?>
          
          
          
           <?php if (get_post_meta($post->ID, "camera2", true)) {
			
			  ?>
            <h3><?php echo get_post_meta($post->ID, "camera2", true);  if (get_post_meta($post->ID, "pret_f2", true)) echo ' - '.get_post_meta($post->ID, "pret_f2", true); ?></h3>
            <div>
              
              <div class="optiune">
                <p style="width:150px; float:left;">
                        <span style="text-transform: capitalize"><b>Descriere:</b></span><br>
                        <?php if (get_post_meta($post->ID, "imaginea7", true)) {?>
                        	 <a class="group1 cameraimg" href="<?php echo wp_get_attachment_url( get_post_meta($post->ID, "imaginea7", true) )?>"> <?php echo wp_get_attachment_image( get_post_meta($post->ID, "imaginea7", true), array(115,115) )?> </a> 
                        <?php }?>
                </p>        
                <div style="width:300px; float:right; font-size:12px; color:#676767; margin-top:25px"><?php echo get_post_meta($post->ID, "dsc_c2", true) ?></div>
              </div>
              
              <div style="clear:both"></div>
            
              <div class="optiune">  
                <p style="width:150px; float:left;"><b>Facilitati:</b></p>
                <div style="width:300px; float:right">
                <?php $facilitati = wp_get_object_terms($post->ID,"facilitati-camera-2");
                 $count = count($facilitati);
                 if ( $count > 0 ){
                   echo "<ul class='facilitati'>";
                   foreach ( $facilitati as $facilitate ) {
                     echo "<li style='line-height:15px; border-bottom:0; background:none'>" . $facilitate->name . "</li>";
                      
                   }
                   echo "</ul>";
               } ?>
                </div>         
              </div>
              
              
              <div class="optiune">  
                <p style="width:150px; float:left;"><b>Pret:</b></p>
                <div style="width:300px; float:right; color:#676767">
                <?php echo get_post_meta($post->ID, "pret_c2", true);?>
                </div>         
              </div>
              
            </div>
          <?php }?>
          
          
          
          
          
          
          <?php if (get_post_meta($post->ID, "camera3", true)) {
			
			  ?>
            <h3><?php echo get_post_meta($post->ID, "camera3", true);  if (get_post_meta($post->ID, "pret_f3", true)) echo ' - '.get_post_meta($post->ID, "pret_f3", true); ?></h3>
            <div>
              
              <div class="optiune">
                <p style="width:150px; float:left;">
                        <span style="text-transform: capitalize"><b>Descriere:</b></span><br>
                        <?php if (get_post_meta($post->ID, "imaginea8", true)) {?>
                        	 <a class="group1 cameraimg" href="<?php echo wp_get_attachment_url( get_post_meta($post->ID, "imaginea8", true) )?>"> <?php echo wp_get_attachment_image( get_post_meta($post->ID, "imaginea8", true), array(115,115) )?> </a> 
                        <?php }?>
                </p>        
                <div style="width:300px; float:right; font-size:12px; color:#676767; margin-top:25px"><?php echo get_post_meta($post->ID, "dsc_c3", true) ?></div>
              </div>
              
              <div style="clear:both"></div>
            
              <div class="optiune">  
                <p style="width:150px; float:left;"><b>Facilitati:</b></p>
                <div style="width:300px; float:right">
                <?php $facilitati = wp_get_object_terms($post->ID,"facilitati-camera-3");
                 $count = count($facilitati);
                 if ( $count > 0 ){
                   echo "<ul class='facilitati'>";
                   foreach ( $facilitati as $facilitate ) {
                     echo "<li style='line-height:15px; border-bottom:0; background:none'>" . $facilitate->name . "</li>";
                      
                   }
                   echo "</ul>";
               } ?>
                </div>         
              </div>
              
              
              <div class="optiune">  
                <p style="width:150px; float:left;"><b>Pret:</b></p>
                <div style="width:300px; float:right; color:#676767">
                <?php echo get_post_meta($post->ID, "pret_c3", true);?>
                </div>         
              </div>
              
            </div>
          <?php }?>
          
      </div>
      
      
      
     
      
      </div>
      <div id="tabs-2">
      <?php if (($categories == "Pensiune") || ($categories == "Hotel")) {?>
        <div id="rate"><?php echo FrmEntriesController::show_form(10, $key = '', $title=false, $description=false); ?></div>
        <div id="average">
          <ul id="totalrate">
            <li>
              Medie curatenie : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 262, 'type' => 'star', 272 => get_the_ID() ));  ?> 
            </li>
            
            <li>
              Medie confort : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 264, 'type' => 'star', 272 => get_the_ID() ));  ?> 
            </li>
            
            <li>
              Medie locatie : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 265, 'type' => 'star', 272 => get_the_ID() ));  ?> 
            </li>
            
            <li>
              Medie facilitati : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 266, 'type' => 'star', 272 => get_the_ID() )); ?> 
            </li>
            
            <li>
              Medie personal : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 267, 'type' => 'star', 272 => get_the_ID() )); ?> 
            </li>
            
            <li>
              Medie Raport Calitate-Pret : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 268, 'type' => 'star', 272 => get_the_ID() )); ?> 
            </li>
            <li>
              <b>TOTAL</b> : <br /><?php echo $total ?> din <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 270, 'type' => 'count', 272 => get_the_ID())); ?> voturi.
            </li>
          </ul>
        </div>
        <?php } else {?>
        <div id="rate"><?php echo FrmEntriesController::show_form(12, $key = '', $title=false, $description=false); ?></div>
        <div id="average">
          <ul id="totalrate">
            <li>
              Medie mancare : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 279, 'type' => 'star', 287 => get_the_ID() ));  ?> 
            </li>
            
            <li>
              Medie servicii : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 280, 'type' => 'star', 287 => get_the_ID() ));  ?> 
            </li>
            
            <li>
              Medie locatie : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 281, 'type' => 'star', 287 => get_the_ID() ));  ?> 
            </li>
            
            <li>
              Medie personal : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 283, 'type' => 'star', 287 => get_the_ID() )); ?> 
            </li>
            
            <li>
              Medie Raport Calitate-Pret : <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 284, 'type' => 'star', 287 => get_the_ID() )); ?> 
            </li>
            <li>
              <b>TOTAL</b> : <br /><?php echo $total ?> din <?php echo FrmProStatisticsController::stats_shortcode(array('id' => 285, 'type' => 'count', 287 => get_the_ID())); ?> voturi.
            </li>
          </ul>
        </div>
        <?php }?>
        
      <div id="comments">
        <?php comments_template( '', true ); ?>
      </div>
      </div>
      <div id="tabs-3">
      	<div id="contacttabs">
      	  <h3>Detalii contact</h3>
          <div>
          
              <div class="optiune">
                <p style="width:150px; float:left;"><b>Telefon:</b></p>
                <div style="width:300px; float:right;color:#676767">
                <?php echo get_post_meta($post->ID, "telefon", true) ?>
                </div>
              </div>
              
              <div class="optiune">
                <p style="width:150px; float:left;"><b>Mobil:</b></p>
                <div style="width:300px; float:right;color:#676767">
                <?php echo get_post_meta($post->ID, "mobil", true) ?>
                </div>
              </div>
              
              <div class="optiune">
                <p style="width:150px; float:left;"><b>Fax:</b></p>
                <div style="width:300px; float:right;color:#676767">
                <?php echo get_post_meta($post->ID, "fax", true) ?>
                </div>
              </div>
              
              <div class="optiune">
                <p style="width:150px; float:left;"><b>Email:</b></p>
                <div style="width:300px; float:right;color:#676767">
                <?php echo get_post_meta($post->ID, "email", true) ?>
                </div>
              </div>
              
              <div class="optiune">
                <p style="width:150px; float:left;"><b>Website:</b></p>
                <div style="width:300px; float:right;color:#676767">
                <?php echo get_post_meta($post->ID, "website", true) ?>
                </div>
              </div>
              
              <div class="optiune">
                <p style="width:150px; float:left;"><b>Adresa:</b></p>
                <div style="width:300px; float:right;color:#676767">
                <?php echo get_post_meta($post->ID, "adresa", true) ?>
                </div>
              </div>
              
              <div class="optiune">
                <p style="width:150px; float:left;"><b>Oras:</b></p>
                <div style="width:300px; float:right;color:#676767">
                <?php echo get_post_meta($post->ID, "oras", true) ?>
                </div>
              </div>
              
              <div class="optiune">
                <p style="width:150px; float:left;"><b>Judet:</b></p>
                <div style="width:300px; float:right;color:#676767">
                <?php $judete = wp_get_object_terms($post->ID, 'judet'); echo $judete[0]->name; ?>
                </div>
              </div>

            
          </div>
          <h3>Foloseste formularul pentru contact</h3>
		  <div>
          <p>Va rugam sa folositi acest formular in cazul in care doriti sa contactati locatia direct. <br> Comunicarea (schimbul de mesaje) se face direct intre hotelier si turist.</p>
		  <?php echo FrmEntriesController::show_form(11, $key = '', $title=false, $description=false); ?>
          </div>
        </div>
      </div>
    </div>
  </article>
</section>
<?php get_footer(); ?>

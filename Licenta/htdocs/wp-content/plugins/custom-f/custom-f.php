<?php
/*
Plugin Name: Custom Scripts Formidable
Description: Custom Scripts Formidable
Version: 1.0
*/

add_filter( 'get_avatar', 'get_frm_avatar', 10, 5 );
function get_frm_avatar( $avatar = '', $id_or_email, $size = '96', $default = '', $alt = false ){
  $user_meta_name = 'avatar';
  if ( is_numeric($id_or_email) ){
    $user_id = (int) $id_or_email;
  }elseif ( is_string($id_or_email) ){
    if ( $user = get_user_by_email( $id_or_email ) )
      $user_id = $user->ID;	
  }elseif ( is_object($id_or_email) && !empty($id_or_email->user_id) ){
      $user_id = (int) $id_or_email->user_id;
  }	
  if ( isset($user_id) ){
    $avatar_id = get_user_meta( $user_id, $user_meta_name, true );
    if($size < 150)
      $temp_size = 'thumbnail';
    else if($size < 250)
      $temp_size = 'medium';
    else
      $temp_size = 'full';
    $local_avatars = FrmProFieldsHelper::get_media_from_id($avatar_id, $temp_size);
  }	
  if ( !isset($local_avatars) || empty($local_avatars) ){
    if ( !empty($avatar) )  // if called by filter
      return $avatar;
			
    remove_filter( 'get_avatar', 'get_frm_avatar' );
    $avatar = get_avatar( $id_or_email, $size, $default );
    add_filter( 'get_avatar', 'get_frm_avatar', 10, 5 );
    return $avatar;
  }
		
  if ( !is_numeric($size) ) // ensure valid size
    $size = '96';
			
  if ( empty($alt) )
    $alt = get_the_author_meta( 'display_name', $user_id );
		
  $author_class = is_author( $user_id ) ? ' current-author' : '' ;
  $avatar = "<img alt='" . esc_attr($alt) . "' src='" . $local_avatars . "' class='avatar avatar-{$size}{$author_class} photo' height='{$size}' width='{$size}' />";
		
  return $avatar;
}

//register widget ultimele commenturi

class ultimele_commenturi extends WP_Widget {
  function ultimele_commenturi() {
	$widget_options = array(
    'classname' => 'ultimele_commenturi',
    'description' => 'Arata ultimele comentarii' );
     parent::WP_Widget("ultimele_commenturi", "Ultimele commenturi", $widget_options);
  }
 
  public function form( $instance ) {
	$instance = wp_parse_args( (array) $instance, array( 'title' => '') );
	$title = $instance['title'];
	?>
    <p>
    <label for="<?php echo $this->get_field_id('title'); ?>">Title</label>
    <input id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo   $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo $title ?>"   />
    </p>
	<?php
  }
 
  public function update( $new_instance, $old_instance ) {
	$instance = array(); 
	$instance['title'] = $new_instance['title'];
	return $instance;
  }
 
  public function widget( $args, $instance ) {
	extract( $args );
	$title = apply_filters( 'widget_title', $instance['title'] );
	echo $before_widget;
	?>
    <div id="comments-wrapper">
    <div style="border-bottom:1px solid #e3e3e3; overflow:hidden; margin-bottom:30px">
      <h1 class="floatleft"><div class="pareri-pic"></div><?php echo $title?></h1>
    </div>
    <ul id="sidebarcomments">
	  <?php //selectam primele 3 intrari ordonate descrescator dupa data din formularele 10,12 ( commenturile pt hoteluri,pensiuni si restaurante ).
      $forms= mysql_query("SELECT * FROM wp_frm_items WHERE form_id in (10,12) ORDER BY created_at Desc LIMIT 0, 3");
      while ($comment = mysql_fetch_array($forms))
          { //dupa ce am gasit Id-urile comment-urilor cautam valorile acestora.
              $result = mysql_query("SELECT * FROM wp_frm_item_metas WHERE item_id=".$comment['id']);
              while($row = mysql_fetch_array($result))
                {
                //fiecare field din formularele create cu Formidable pro are atribuit cate un ID. In functie de acel ID, ne vom da seama cui apartin acele valori
					if ($row['field_id']==332) $nume=$row['meta_value'];
					if ($row['field_id']==334) $descriere=$row['meta_value'];
					if ($row['field_id']==285) $nota=$row['meta_value'];
					if ($row['field_id']==287) $postid=$row['meta_value'];
					
					if ($row['field_id']==326) $nume=$row['meta_value'];
					if ($row['field_id']==328) $descriere=$row['meta_value'];
					if ($row['field_id']==270) $nota=$row['meta_value'];
					if ($row['field_id']==272) $postid=$row['meta_value'];		
                }?>
				
                <li>
                  <div>
                  <div style="clear:both; overflow:hidden;margin-bottom:10px">
                    <div class="part1">
                    <span><b><?php echo $nume ?></b>, despre</span><br>
                    <h4><a href="<?php echo get_permalink($postid)?>"><?php echo get_the_title($postid)?></a></h4>
                    <p style="line-height:14px; color:#f38630; font-size:10px;"><a style=";" href="/tip/hotel/?oras=<?php echo get_post_meta($postid, 'oras', true); ?>"><?php echo get_post_meta($postid, "oras", true); ?></a>, jud. <a href="/tip/hotel/?judet=<?php $judete = wp_get_object_terms($postid, 'judet'); echo $judete[0]->slug ?>" style="color:#f38630; font-weight:bold"><?php $judete = wp_get_object_terms($postid, 'judet'); echo $judete[0]->name ?></a>
                    </p>
                    <p>Calificativ: <?php echo floor($nota * 100) / 100?></p>
                    </div>
                    <div class="part2">
                    <a href="<?php echo get_permalink($postid) ?>"><?php echo get_the_post_thumbnail($postid,array(80,80)) ?></a>
                    </div>
                  </div>
                  <div style="clear:both; position:relative">     
                  	  <div style="position:absolute;top:0px; font-size:50px;line-height:35px; font-weight:bold; font-family:serif; ">“</div>             
                      <p style="font-size:12px; font-style:italic; text-indent:30px;">
					  <?php // limitam descrierea la max 100 caractere
					  $descriere = strip_tags($descriere);
					  if (strlen($descriere) > 100) {
						  $stringCut = substr($descriere, 0, 100);
						  $descriere = substr($stringCut, 0, strrpos($stringCut, ' ')).'... <a class="readmore" href="'.get_permalink($postid).'#tabs2">Citeste tot</a>'; 
					  }
					  echo $descriere; ?>
                      </p>                  
                  </div>
                  </div>
                  <hr>
                </li>
          
		  
		  <?php }
      ?>	
    </ul>
    </div>
	<?php echo $after_widget;
  }
}
add_action( 'widgets_init', create_function( '', 'register_widget("ultimele_commenturi");'));

?>
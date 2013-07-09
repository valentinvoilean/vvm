<?php

/**
 * Redirect back to homepage and not allow access to 
 * WP admin for Subscribers.
 */
function themeblvd_redirect_admin(){
	if ( ! current_user_can( 'edit_posts' ) ){
		wp_redirect( site_url() );
		exit;		
	}
}
add_action( 'admin_init', 'themeblvd_redirect_admin' );

add_theme_support( 'post-thumbnails' ); 

// show admin bar only for admins
if (!current_user_can('manage_options')) {
	add_filter('show_admin_bar', '__return_false');
}

//register taxonomy
add_action( 'init', 'register_taxonomy_judet' );
function register_taxonomy_judet() {
$labels = array(
'name' => _x( 'Judet', 'judet' ),
'menu_name' => _x( 'Judet', 'judet' ),
);
$args = array(
'labels' => $labels,
'public' => true,
'show_in_nav_menus' => true,
'show_ui' => true,
'show_tagcloud' => true,
'show_admin_column' => true,
'hierarchical' => true,
'rewrite' => false,
'query_var' => false
);
register_taxonomy( 'judet', array('post'), $args );
} 
	
//register widget1 (search)
if ( function_exists('register_sidebar') ){
    register_sidebar(array(
        'name' => 'Sidebar1',
        'before_widget' => '<div class="widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
));
}

if ( function_exists('register_sidebar') ){
    register_sidebar(array(
        'name' => 'Sidebar2',
        'before_widget' => '',
        'after_widget' => '',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
));
}

if ( function_exists('register_sidebar') ){
    register_sidebar(array(
        'name' => 'Sidebar3',
        'before_widget' => '',
        'after_widget' => '',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
));
}

//[breadcrumb]
function breadcrumb_func( $atts ){
 if (class_exists('breadcrumb_navigation_xt')) {
      // new breadcrumb object
      $mybreadcrumb = new breadcrumb_navigation_xt;
      // Display the breadcrumb
	  echo '<div id="bread">';
      $mybreadcrumb->opt['title_blog'] = 'Home';
          $mybreadcrumb->opt['separator'] = ' &raquo; ';
          $mybreadcrumb->opt['singleblogpost_category_display'] = true;
      $mybreadcrumb->display();
	  echo '</div>';
      }
}
add_shortcode( 'breadcrumb', 'breadcrumb_func' );


function my_formatter($content) {
$new_content = '';
$pattern_full = '{(\[raw\].*?\[/raw\])}is';
$pattern_contents = '{\[raw\](.*?)\[/raw\]}is';
$pieces = preg_split($pattern_full, $content, -1, PREG_SPLIT_DELIM_CAPTURE);

foreach ($pieces as $piece) {
if (preg_match($pattern_contents, $piece, $matches)) {
$new_content .= $matches[1];
} else {
$new_content .= wptexturize(wpautop($piece));
}
}

return $new_content;
}

remove_filter('the_content', 'wpautop');
remove_filter('the_content', 'wptexturize');

add_filter('the_content', 'my_formatter', 99);

?>

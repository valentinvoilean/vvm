<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <title><?php wp_title(); ?></title>
        
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" type="text/css" media="screen" />
        <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/redmond/jquery-ui.min.css">
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <?php if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); ?>
        <!--[if gte IE 9]>
  		<style type="text/css">
    	.gradient {
       		filter: none;
    		}
  		</style>
		<![endif]-->
        <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/colorbox.css" />
		<?php wp_enqueue_script( 'jquery-ui-full' ); ?>
        <?php wp_head(); ?>
		<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.colorbox.js"></script>
        <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/header-scripts.js"></script>
        <?php include (TEMPLATEPATH . '/js/progressbar.php')?>
    </head>
<body>
  <header>
  	<section>
      
      <div id="logo" onClick="window.location='/'" title="Tourist Club Hoteluri Restaurante">
        <div id="logoimage"></div>	
        <div style="float:right; ">
          <span style="font-size:30px; text-shadow: 2px 2px rgba(0, 0, 0, 0.5); font-weight:bold">Tourist</span>
          <span style="font-size:30px; background:#fff; color:#0189b3;padding-left:5px;padding-right:5px; font-weight:bold">Club</span><br>
          <span style="font-size:14px; margin-left:5px;line-height:20px">Cazare, Restaurante</span>
        </div>
      </div>
      
      <div style="float:right">
      	<nav id="topnav">
          <ul>
           <?php
			if ( is_user_logged_in() ) {?>
             <li>Bine ai venit, <a href="/contul-meu/" style="text-decoration:underline"><b><?php global $current_user; get_currentuserinfo();echo $current_user->user_login;?></b></a></li>
             <li><a href="/contul-meu/">Contul meu</a></li>
             <li><a href="/adauga-anunt/" style="color:#02ade1; background:#fff;padding:0 2px 0 2px">Adaugă anunț</a></li>
             <li><a href="<?php echo wp_logout_url( home_url() ); ?>" title="Logout">Logout</a></li>
			 <?php
			} else {
   			 ?>
             <li><a href="/adauga-anunt/" style="color:#02ade1; background:#fff;padding:0 2px 0 2px">Adaugă anunț</a></li>
             <li><a href="/wp-login.php/">Login</a></li>
             <li><a href="/cont-nou/">Cont Nou</a></li>
             <?php
			}
			?> 
          </ul>
        </nav>
        <form id="top-search-form" style="float:right;margin-top:5px; position:relative" action="/tip/hotel">
        	<table>
              <tbody>
              <tr>
              	<td>
                <input id="select-oras" class="rounded oras" type="text" name="oras" placeholder="Introdu localitatea">
                </td>
                <td>
                <select name="tip" id="tip_search"> 
                	<option value="hotel">Hotel</option>
                    <option value="pensiune">Pensiune</option>
                    <option value="restaurant">Restaurant</option>
                </select>
                </td>
                <td>
                <input type="submit" id="cautabtn" value="Cauta">
                </td>
              </tr>
              <tr style="font-size:12px; color:#fff">
                <td>Alege o destinație
                </td>
                <td>Ce cauți?
                </td>
                <td>
                </td>
              </tr>
              </tbody
            ></table>
        </form>
      </div>
    </section>
  </header>
  
  <nav id="bignav">
      <?php wp_nav_menu( array('menu' => 'Main menu' )); ?>
  </nav>
  
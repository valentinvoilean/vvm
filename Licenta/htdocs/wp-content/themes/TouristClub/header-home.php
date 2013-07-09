<!DOCTYPE html>
<html <?php language_attributes(); ?>><head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <title><?php wp_title(); ?></title>
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <?php if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); ?>
        <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" type="text/css" media="screen" />
        <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/redmond/jquery-ui.min.css">
        <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/home-styles.css">
        <!--[if gte IE 9]>
  		<style type="text/css">
    	.gradient {
       		filter: none;
    		}
  		</style>
		<![endif]-->
        <?php wp_enqueue_script( 'jquery-ui-full' ); ?>
        <?php wp_head(); ?>
        <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/header-home-scripts.js"></script>
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
                <input id="select-oras" class="rounded oras" type="text"  placeholder="Introdu localitatea">
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
  <div id="homegallery">
  	<div id="searchbgd">
      <section>
        <h1>Alege o destinație... oriunde !</h1>
        <h2>Descoperă cea mai bună vacanță alături de TouristClub</h2>
        <div id="tabs">
        <ul>
        <li><a href="#tabs-1">Hoteluri</a></li>
        <li><a href="#tabs-2">Pensiuni</a></li>
        <li><a href="#tabs-3">Restaurante</a></li>
        </ul>
        <div id="tabs-1">
        <form id="search-form" action="/tip/hotel/">
          <input id="oras" type="text"  placeholder="Introduceți Localitatea sau numele Hotelului">
          <input id="denumirehotel" type="hidden" name="id" >
          <input id="denumireoras" type="hidden" name="oras" >
          <input type="submit" disabled class="searchsubmit" value="Caută Hotel">
        </form>
        </div>
        <div id="tabs-2">
        <form id="search-form2" action="/tip/pensiune/">
          <input id="oras2" type="text"  placeholder="Introduceți Localitatea sau numele Pensiunii">
          <input id="denumirepensiune" type="hidden" name="denumire" >
          <input id="denumireoras2" type="hidden" name="oras" >
          <input type="submit" disabled class="searchsubmit" value="Caută Pensiune">
        </form>
        </div>
        <div id="tabs-3">
        <form id="search-form3" action="/tip/restaurant">
          <input name="oras" id="oras3" type="text"  placeholder="Introduceți Localitatea">
          <select id="specialitate" name="specific">
            <option value="">Specialitate..</option>
            <option value="American">Specific American</option>
            <option value="Arabesc">Specific Arabesc</option>
            <option value="Belgian">Specific Belgian</option>
            <option value="Brazilian">Specific Brazilian</option>
            <option value="Chinezesc">Specific Chinezesc</option>
            <option value="Frantuzesc">Specific Frantuzesc</option>
            <option value="Grecesc">Specific Grecesc</option>
            <option value="Indian">Specific Indian</option>
            <option value="International">Specific International</option>
            <option value="Italian">Specific Italian</option>
            <option value="Japonez">Specific Japonez</option>
            <option value="Libanez">Specific Libanez</option>
            <option value="Mediteranean">Specific Mediteranean</option>
            <option value="Mexican">Specific Mexican</option>
            <option value="Mongol">Specific Mongol</option>
            <option value="Oriental">Specific Oriental</option>
            <option value="Portughez">Specific Portughez</option>
            <option value="Romanesc">Specific Romanesc</option>
            <option value="Sud-american">Specific Sud-American</option>
            <option value="Turcesc">Specific Turcesc</option>
            <option value="Unguresc">Specific Unguresc</option>
            <option value="Vegetarian">Specific Vegetarian</option>
            <option value="Fast-food">Fast Food</option>
            <option value="Pescaresc-marin">Specific Pescaresc-Marin</option>
            <option value="Pizzerie">Pizzerie</option>
          </select>
          <input type="hidden" name="tip" value="Restaurant">
          <input type="submit" class="searchsubmit" value="Caută Restaurant">      
        </form>
        </div>
        </div>
      </section>
    </div>
  </div>
  <nav id="bignav">
     <?php wp_nav_menu( array('menu' => 'Main menu' )); ?>
  </nav>

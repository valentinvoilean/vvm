<!-- BEGIN sidebar -->
<div id="sidebar">

	<?php if ( !function_exists('dynamic_sidebar')
	|| !dynamic_sidebar(1) ) : ?>

  <?php
      include("mdetect.php");
      $uagent_obj = new uagent_info();
 	      if (($uagent_obj->DetectMobileLong() == $uagent_obj->true) || ($uagent_obj->DetectTierTablet() == $uagent_obj->true) ) { ?>
          	<div class="box">
<div class="video-js-box vjs-paused" style="width: 345px;"> <video width="345" height="280" preload="auto" class="video-js vjs-paused" tabindex="0" style="height: 280px;"> <source type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" src="http://www.twinchefs.net/video/110316_gma_mathison_embed.ipad.mp4"></source> <source type="video/webm; codecs=&quot;vp8, vorbis&quot;" src="http://www.twinchefs.net/video/video.webm"></source> <source type="video/ogg; codecs=&quot;theora, vorbis&quot;" src="http://www.twinchefs.net/video/video.ogg"></source> </video><div class="vjs-styles-check" style="position: absolute; display: none;"></div><div class="vjs-big-play-button" style="display: none;"><span></span></div><div class="vjs-spinner" style="display: none;"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div class="vjs-controls" style="display: none;"><div class="vjs-play-control vjs-paused"><span></span></div><div class="vjs-progress-control"><div class="vjs-progress-holder"><div class="vjs-load-progress" style="width: 100%;"></div><div class="vjs-play-progress" style="width: 7.34%;"></div></div></div><div class="vjs-time-control"><span class="vjs-current-time-display">00:23</span><span> / </span><span class="vjs-duration-display">05:16</span></div><div class="vjs-volume-control"><div><span class="vjs-volume-level-on"></span><span class="vjs-volume-level-on"></span><span class="vjs-volume-level-on"></span><span class="vjs-volume-level-on"></span><span class="vjs-volume-level-on"></span><span class="vjs-volume-level-on"></span></div></div><div class="vjs-fullscreen-control"><div><span></span><span></span><span></span><span></span></div></div></div></div>
	</div>
		  <?php } 
          else { ?>
          <div class="box">
<img style="visibility:hidden;width:0px;height:0px;" border="0" width="0" height="0" src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMDA3NDIxODY1MjUmcHQ9MTMwMDc*MjE5NjQ3MiZwPTEyNTg*MTEmZD1BQkNOZXdzX1NGUF9Mb2NrZV9FbWJlZCZn/PTImbz*5MzFkMjhmNDI2NTg*OTYwYjcwODIwNjI2MjFlNDNhMCZvZj*w.gif"/><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0" width="345" height="280" id="ABCESNWID"><param name="movie" value="http://abcnews.go.com/assets/player/walt2.6/flash/SFP_Walt_2_65.swf"></param><param name="quality" value="high"></param><param name="allowScriptAccess" value="never"></param><param name="allowNetworking" value="all"></param><param name="flashvars" value="configUrl=http://abcnews.go.com/video/sfp/embedPlayerConfig&amp;configId=406732&amp;clipId=13147545&amp;showId=13147545&amp;gig_lt=1300742186525&amp;gig_pt=1300742196472&amp;gig_g=2"></param><param name="allowfullscreen" value="true"></param><embed wmode="opaque" src="http://abcnews.go.com/assets/player/walt2.6/flash/SFP_Walt_2_65.swf" quality="high" allowscriptaccess="never" allownetworking="all" allowfullscreen="true" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="345" height="280" flashvars="configUrl=http://abcnews.go.com/video/sfp/embedPlayerConfig&amp;configId=406732&amp;clipId=13147545&amp;showId=13147545&amp;gig_lt=1300742186525&amp;gig_pt=1300742196472&amp;gig_g=2" name="ABCESNWID"></embed> <param name="wmode" value="opaque"></param></object>
	</div>
		  <?php }
       
  ?>

	
    
	<!-- end featured video -->

	<!-- begin featured video
	<div class="box">
	<script type='text/javascript' src='http://www.twinchefs.net/wp-content/plugins/oiopub-direct/js.php?type=banner&align=center&zone=3'></script> 
	</div> -->
	<!-- end featured video -->
	
	<!-- begin search -->
	<div class="search box">
	<form action="<?php echo get_option('home'); ?>">
	<input type="text" name="s" id="s" value="<?php the_search_query(); ?>" />
	<button type="submit">Search</button>
	</form>
	</div>
	<!-- end search -->
	

	<!-- begin advertisement -->

<!-- Begin Adify tag for "Island300x250" Ad Space (300x250) ID #1000003989007
<script type="text/javascript">
	sr_adspace_id = 1000003989007;
	sr_adspace_width = 300;
	sr_adspace_height = 250;
	sr_ad_new_window = true;
	sr_adspace_type = "graphic";
</script>
<script type="text/javascript" src="http://ad.afy11.net/srad.js?azId=1000003989007">
</script>
End Adify tag for "Island300x250" Ad Space (300x250) ID #1000003989007 -->


<script src="http://widgets.twimg.com/j/2/widget.js"></script>
<script>
new TWTR.Widget({
  version: 2,
  type: 'search',
  search: 'LillyAudrey',
  interval: 6000,
  title: '',
  subject: 'Lilly and Audrey',
  width: 351,
  height: 200,
  theme: {
    shell: {
      background: '#9fcdee',
      color: '#ffffff'
    },
    tweets: {
      background: '#ffffff',
      color: '#444444',
      links: '#1985b5'
    }
  },
  features: {
    scrollbar: false,
    loop: false,
    live: true,
    hashtags: true,
    timestamp: true,
    avatars: true,
    behavior: 'all'
  }
}).render().start();
</script>

<!-- begin facebook -->
	<div class="search box" style="margin-top:8px; padding:3px 0px; text-align:center; cursor:pointer; outline:none;">
	<a href="http://www.facebook.com/pages/Twin-Chefs-Lilly-Audrey/272652284020?ref=ts" target="_blank"><img src="http://www.twinchefs.net/wp-content/uploads/fb.jpg" alt="Find us on Facebook"></a>
	</div>
	<!-- end facebook -->
<!-- amy atlas -->
	<div style="margin:0px 0px 10px 0px; text-align:center;">
	<embed wmode="opaque" src="http://static.ning.com/socialnetworkmain/widgets/index/swf/badge.swf?v=201103110049" FlashVars="backgroundColor=0xFFFFFF&textColor=0x663300&config=http%3A%2F%2Famyatlas.ning.com%2Fmain%2Fbadge%2FshowPlayerConfig%3Fxg_source%3Dbadge%26size%3Dsmall%26username%3D3nd80gaoeqo5s" width="100%" height="104" bgColor="#FFFFFF" scale="noscale" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"> </embed><br /><small><a href="http://amyatlas.ning.com">Visit <em>Amy Atlas</em></a></small><br />
	</div>
	<!-- end amy atlas -->
	
	<!-- end advertisement -->
	

	
	<?php endif; ?>
	
	<!-- BEGIN left -->
	<div class="l">
	
		<?php if ( !function_exists('dynamic_sidebar')
		|| !dynamic_sidebar(2) ) : ?>
		
		<?php endif; ?>
	
	</div>
	<!-- END left -->
	
	<!-- BEGIN right -->
	<div class="r">
	
		<?php if ( !function_exists('dynamic_sidebar')
		|| !dynamic_sidebar(3) ) : ?>
	
		
		<?php endif; ?>
	
	</div>
	<!-- END right -->
<div class="clear"></div>
</div></div>
<!-- END sidebar -->

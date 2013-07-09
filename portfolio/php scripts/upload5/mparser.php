<?php
$count=0;
 //parser
 
 set_time_limit(2000); 
$myFile = "result.xml";
$fh = fopen($myFile, 'w') or die("can't open file");
fwrite($fh,'<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
	xmlns:excerpt="http://wordpress.org/export/1.1/excerpt/"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:wp="http://wordpress.org/export/1.1/"
>

<channel>
	<wp:wxr_version>1.1</wp:wxr_version>
	
	<wp:author><wp:author_id>2</wp:author_id><wp:author_login>admin</wp:author_login><wp:author_email>nick@trialfacts.com</wp:author_email><wp:author_display_name><![CDATA[admin]]></wp:author_display_name><wp:author_first_name><![CDATA[Nick]]></wp:author_first_name><wp:author_last_name><![CDATA[Karrasch]]></wp:author_last_name></wp:author>


	<generator>http://wordpress.org/?v=3.1.3</generator>'."\r");

if ($handle = opendir('xmlfiles')) {
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != ".." ) {
		
	$doc = new DOMDocument();
	
	if ($doc->load('xmlfiles/'.$file)) {
	$items = $doc->getElementsByTagName('clinical_study');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	  
	
		foreach($headlines as $headline) {
			if(++$hc == 1) {
fwrite($fh,"\r\t".'<item>'."\r\t\t".'<title>'.str_replace(array("&","'","|",'"',"<",">"),array("&amp;","&#039;","&#124;","quot;","",""),$headline['brief_title']).'</title>'."\r\t\t".'<dc:creator>admin</dc:creator>');
	$old = array(" ", "_", ".","'",",","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","/",":","&","<",">","©","®","À","Á","Â","Ã","Ä","Å","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï","Ð","Ñ","Ò","Ó","Ô","Õ","Ö","×","Ø","Ù","Ú","Û","Ü","Ý","Þ","ß","à","á","â","ã");
$new   = array("-", "-", "","","","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","-","-","-","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","");	
			$phrase  = $headline['brief_title'];
			$newphrase = str_replace($old, $new, $phrase);	  
			}
		}
	
	}//the end of title
	$items = $doc->getElementsByTagName('brief_summary');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	  
	
		foreach($headlines as $headline) {
			if(++$hc == 1) {
				fwrite($fh,"\r\t\t".'<content:encoded><![CDATA[<div class="section">'."\r".'<h3>Background</h3>'."\r".'<div class="holder">'."\r\r".str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['textblock'])."\r\r".'</div>'."\r".'</div>'."\r".']]></content:encoded>'."\r\t\t".'<wp:post_id>'.$count++.'</wp:post_id>'."\r\t\t".'<wp:comment_status>open</wp:comment_status>'."\r\t\t".'<wp:ping_status>closed</wp:ping_status>'."\r\t\t".'<wp:post_name>'.$newphrase.'</wp:post_name>'."\r\t\t".'<wp:status>publish</wp:status>'."\r\t\t".'<wp:post_type>medical-trial</wp:post_type>');
				
				  
			}
		}
	}//the end of background

	$items = $doc->getElementsByTagName('address');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	  
	
		foreach($headlines as $headline) {
			if(++$hc == 1) {
				$phrase  = str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['state']);
				
				  
			}
		}
	
	 
	}
	$newphrase = str_replace($old, $new, $phrase);
 
	 fwrite($fh,"\r\t\t".'<category domain="category" nicename="'.$newphrase.'"><![CDATA['.$phrase.']]></category>');//the end of category	

	$items = $doc->getElementsByTagName('clinical_study');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	  
	
		foreach($headlines as $headline) {
			if(++$hc <= 3) {
				$phrase  = str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['condition']);
				
				  
			}
		}
		 
	}
	$newphrase = str_replace($old, $new, $phrase);
 
	 fwrite($fh,"\r\t\t".'<category domain="post_tag" nicename="'.$newphrase.'"><![CDATA['.$phrase.']]></category>');//the end of conditions
	 
$items = $doc->getElementsByTagName('facility');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	  
	
		foreach($headlines as $headline) {
			if(++$hc == 1) {
			fwrite($fh,"\r\t\t".'<wp:postmeta>'."\r\t\t\t".'<wp:meta_key>rcenter</wp:meta_key>'."\r\t\t\t".'<wp:meta_value><![CDATA['.str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['name']).']]></wp:meta_value>'."\r\t\t".'</wp:postmeta>');
				  
			}
		}//the end of rcenter
	}	 
	 	
	$items = $doc->getElementsByTagName('address');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	  
	
		foreach($headlines as $headline) {
			if(++$hc == 1) {
			fwrite($fh,"\r\t\t".'<wp:postmeta>'."\r\t\t\t".'<wp:meta_key>location</wp:meta_key>'."\r\t\t\t".'<wp:meta_value><![CDATA['.str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['city']).','.str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['state']).','.str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['country']).']]></wp:meta_value>'."\r\t\t".'</wp:postmeta>');
			}
		}
	}		//the end of location
		
		

	$items = $doc->getElementsByTagName('overall_official');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	 foreach($headlines as $headline) {
			if(++$hc == 1) {
						
	fwrite($fh,"\r\t\t".'<wp:postmeta>'."\r\t\t\t".'<wp:meta_key>lphysician</wp:meta_key>'."\r\t\t\t".'<wp:meta_value><![CDATA['.str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['last_name']).']]></wp:meta_value>'."\r\t\t".'</wp:postmeta>');		  
			}
		} 
	
	}//end of physician		
		


	$items = $doc->getElementsByTagName('oversight_info');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	  
	
		foreach($headlines as $headline) {
			if(++$hc == 1) {
	
		fwrite($fh,"\r\t\t".'<wp:postmeta>'."\r\t\t\t".'<wp:meta_key>ethicalrb</wp:meta_key>'."\r\t\t\t".'<wp:meta_value><![CDATA['.str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['authority']).']]></wp:meta_value>'."\r\t\t".'</wp:postmeta>');			  
			}
		}
	}//end  ethicalrb		
		
	
	
	$items = $doc->getElementsByTagName('eligibility');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	  
	
		foreach($headlines as $headline) {
			if(++$hc == 1) {
			fwrite($fh,"\r\t\t".'<wp:postmeta>'."\r\t\t\t".'<wp:meta_key>participate1</wp:meta_key>'."\r\t\t\t".'<wp:meta_value><![CDATA['.str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['gender']).']]></wp:meta_value>'."\r\t\t".'</wp:postmeta>'."\r\t\t".'<wp:postmeta>'."\r\t\t\t".'<wp:meta_key>participate2</wp:meta_key>'."\r\t\t\t".'<wp:meta_value><![CDATA[Age: '.str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['minimum_age']).' to '.str_replace(array("&","'","|",'"'),array("&amp;","&#039;","&#124;","quot;"),$headline['maximum_age']).']]></wp:meta_value>'."\r\t\t".'</wp:postmeta>');
				
				  
			}
		}
	
	}	//the end of "gender + age"
	

	$items = $doc->getElementsByTagName('criteria');
	$headlines = array();
	
	foreach($items as $item) {
		$headline = array();
	   
		if($item->childNodes->length) {
			foreach($item->childNodes as $i) {
				$headline[$i->nodeName] = $i->nodeValue;
			}
		}
	   
		$headlines[] = $headline;
	}
	
	if(!empty($headlines)) {
		$hc = 0;
	   
	  
	
		foreach($headlines as $headline) {
			if(++$hc == 1) {
			fwrite($fh,"\r\t\t".'<wp:postmeta>'."\r\t\t\t".'<wp:meta_key>participate3</wp:meta_key>'."\r\t\t\t".'<wp:meta_value><![CDATA['.str_replace(array("&","'","|",'"'," - "),array("&amp;","&#039;","&#124;","quot;","<br /> - "),$headline['textblock']).']]></wp:meta_value>'."\r\t\t".'</wp:postmeta>'."\r\t".'</item>');	
				  
			}
		}
	
	 
	}

	}//the end of DOM
}}}


fwrite($fh,"\r".'</channel>'."\r".'</rss>');	



fclose($fh);
//stergere
    $dir = 'xmlfiles/';
   foreach(glob($dir.'*.*') as $v){
   unlink($v);
   }
   
   $dir = 'upload/';
   foreach(glob($dir.'*.*') as $v){
   unlink($v);
   }


header('Location: download.php?file=result.xml');
?> 
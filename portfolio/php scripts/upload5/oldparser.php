<?php
 set_time_limit(2000);
//uploadare
if ($handle = opendir('upload')) {
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != ".." ) {
   
	$www='upload/'.$file;
		}}}
//dezarhivare
  $zip = zip_open($www);
if ($zip) {
  while ($zip_entry = zip_read($zip)) {
    $fp = fopen("xmlfiles/".zip_entry_name($zip_entry), "w");
    if (zip_entry_open($zip, $zip_entry, "r")) {
      $buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
      fwrite($fp,"$buf");
      zip_entry_close($zip_entry);
      fclose($fp);
    }
  }
  zip_close($zip);
}
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
xmlns:wp="http://wordpress.org/export/1.1/">

<channel>
<wp:wxr_version>1.1</wp:wxr_version>');

if ($handle = opendir('xmlfiles')) {
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != ".." ) {
		
       fwrite($fh,
  '
  <item>
  ');		
//title		
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
			fwrite($fh,'      <title>'.$headline['brief_title'].'</title>');
				
				  
			}
		}
	
	 
	}
	}
//background
	$doc = new DOMDocument();
	
	if ($doc->load('xmlfiles/'.$file)) {
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
				fwrite($fh,'
	<content:encoded><![CDATA[<div class="section"><h3>Background</h3><div class="holder">'.$headline['textblock'].'</div></div>]]></content:encoded>');
				
				  
			}
		}
	
	 
	}
	}
	
	//background
				fwrite($fh,'
	<wp:post_id>'.$count++.'</wp:post_id>');
				
				  
		
//status (published)	
	fwrite($fh,
	'
	<wp:status>publish</wp:status>
	<wp:post_type>medical-trial</wp:post_type>
	');	
//post-type (medical-trial)	
	$old = array(" ", "_", ".","'",",","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","/");
$new   = array("-", "-", "","","","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","-","-");	
//category
$doc = new DOMDocument();
	
	if ($doc->load('xmlfiles/'.$file)) {
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
				$phrase  = $headline['state'];
				
				  
			}
		}
	
	 
	}
	}
	$newphrase = str_replace($old, $new, $phrase);
 
	 fwrite($fh,
  '<category domain="category" nicename="'.$newphrase.'"><![CDATA['.$phrase.']]></category>
  ');
//post-tag		
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
			if(++$hc <= 3) {
				$phrase  = $headline['condition'];
				
				  
			}
		}
	
	 
	}
	}
	$newphrase = str_replace($old, $new, $phrase);
 
	 fwrite($fh,
'      <category domain="post_tag" nicename="'.$newphrase.'"><![CDATA['.$phrase.']]></category>');	
	
//rcenter
$doc = new DOMDocument();
	
	if ($doc->load('xmlfiles/'.$file)) {
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
			fwrite($fh,'      
        <wp:postmeta><wp:meta_key>rcenter</wp:meta_key><wp:meta_value><![CDATA['.$headline['name'].']]></wp:meta_value></wp:postmeta>');
				
				  
			}
		}
	
	 
	}
	}	
//location	
$doc = new DOMDocument();
	
	if ($doc->load('xmlfiles/'.$file)) {
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
			fwrite($fh,'      
        <wp:postmeta><wp:meta_key>location</wp:meta_key><wp:meta_value><![CDATA['.$headline['city'].','.$headline['state'].','.$headline['country'].']]></wp:meta_value></wp:postmeta>');
				
				  
			}
		}
	
	 
	}
	}		
//lphysician	---- parsed all physicians	
$doc = new DOMDocument();
	
	if ($doc->load('xmlfiles/'.$file)) {
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
	   
	  
	fwrite($fh,'
	<wp:postmeta><wp:meta_key>lphysician</wp:meta_key><wp:meta_value><![CDATA[');
		foreach($headlines as $headline) {
			if(++$hc <= 20) {
				
				$result=' '.$headline['last_name'].';';
			
				
				  
			}fwrite($fh,$result);
		}
	
	 fwrite($fh,']]></wp:meta_value></wp:postmeta>');
	}
	}		
//ethicalrb
$doc = new DOMDocument();
	
	if ($doc->load('xmlfiles/'.$file)) {
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
			fwrite($fh,'      
        <wp:postmeta><wp:meta_key>ethicalrb</wp:meta_key><wp:meta_value><![CDATA['.$headline['authority'].']]></wp:meta_value></wp:postmeta>');
				
				  
			}
		}
	
	 
	}
	}		
//gender + age	
$doc = new DOMDocument();
	
	if ($doc->load('xmlfiles/'.$file)) {
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
			fwrite($fh,'      
        <wp:postmeta><wp:meta_key>participate1</wp:meta_key><wp:meta_value><![CDATA['.$headline['gender'].']]></wp:meta_value></wp:postmeta>
        <wp:postmeta><wp:meta_key>participate2</wp:meta_key><wp:meta_value><![CDATA[Age: '.$headline['minimum_age'].' to '.$headline['maximum_age'].']]></wp:meta_value></wp:postmeta>');
				
				  
			}
		}
	
	 
	}
	}		
//Eligibility
$doc = new DOMDocument();
	
	if ($doc->load('xmlfiles/'.$file)) {
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
			fwrite($fh,'      
        <wp:postmeta><wp:meta_key>participate3</wp:meta_key><wp:meta_value><![CDATA['.$headline['textblock'].']]></wp:meta_value></wp:postmeta>');
				
				  
			}
		}
	
	 
	}
	}	
	
		
      fwrite($fh,
  '
  </item>
  ');	}}}


fwrite($fh,
  '
</channel>
</rss>
  ');	



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
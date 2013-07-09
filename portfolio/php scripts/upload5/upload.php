<?php ini_set( "display_errors", 0);$password=$_GET["pass"]?>
<?php if ($password=="lemoncake88"): ?>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Upload ZIP FILE</title>

<link rel="stylesheet" href="uploadify/uploadify.css" type="text/css" />

<script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="js/jquery.uploadify.js"></script>

<script type="text/javascript">

$(document).ready(function() {
	$("#fileUploadstyle").fileUpload({
		'uploader': 'uploadify/uploader.swf',
		'cancelImg': 'uploadify/cancel.png',
		'script': 'uploadify/upload.php',
		'folder': 'xmlfiles',
		'fileDesc': 'XML files',
		'fileExt': '*.xml',
		'multi': true,
		'onAllComplete': function(event,data) {
      alert('The XML files have been uploaded successfully .\n\rPlease wait, your zip archive will be extracted and your new WP XML file will be generated.');window.location = "mparser.php"
    }
	
	});
	
	$("#fileUpload3").fileUpload({
		'uploader': 'uploadify/uploader.swf',
		'cancelImg': 'uploadify/cancel.png',
		'script': 'uploadify/upload.php',
		'folder': 'upload',
		'fileDesc': 'Zip Archives',
		'fileExt': '*.zip',
		'multi': false,
		'auto': true,
		'onAllComplete' : function(event,data) {
      alert('The zip file has been uploaded successfully .\n\rPlease wait, your zip archive will be extracted and your XML file will be generated.');window.location = "parser.php"
    }
	});
	
	
	
});

</script>
</head>

<body>
      
<div style="width:400px;height:200px; margin-left:auto;margin-right:auto; background: none repeat scroll 0 0 #FFFFDF;border: 1px dotted black;">
		<center><h2>Upload a Zip file  </h2></center>
		<center><p>Extract the XML files & generate the new WP XML file</p></center>
		<center><div id="fileUpload3">You have a problem with your javascript</div></center>
</div>
    	
        
        <div style="width:400px;min-height:200px;margin-top:100px; margin-left:auto;margin-right:auto; background: none repeat scroll 0 0 #FFFFDF;border: 1px dotted black;">
          <center><h2>Upload Multiple XML files</h2></center>
		<center><div id="fileUploadstyle">You have a problem with your javascript</div></center>
		<center><div style="margin-top:10px"><a href="javascript:$('#fileUploadstyle').fileUploadStart()">Start Upload</a> |  <a href="javascript:$('#fileUploadstyle').fileUploadClearQueue()">Clear Queue</a></div></center>
        </div>
        
</body>
</html>
<?php 
elseif($password==""): // Note the combination of the words.
    echo "The password can not be empty.<br />Click <a href='javascript: history.go(-1)'><b>here</b></a> to get back and try again!";
else:
    echo "Wrong Password.<br />Click <a href='javascript: history.go(-1)'><b>here</b></a> to get back and try again!";
endif; ?> 

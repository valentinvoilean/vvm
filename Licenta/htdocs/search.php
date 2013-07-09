<?php
// edit these values to match your database information
$server = "localhost:8888";
$user = "root";
$password = "root";
$db = "licenta";

$con = mysql_connect($server,$user,$password); 

if (!$con) {
    die("database connection error");
} else {

mysql_select_db($db, $con);
sleep( 3 );
// no term passed - just exit early with no response
if (empty($_GET['term'])) exit ;
$q = strtolower($_GET["term"]);
// remove slashes if they were magically added
if (get_magic_quotes_gpc()) $q = stripslashes($q);

$items = array(
"animal" => "animal");
$posturi= mysql_query("SELECT * FROM wp_posts WHERE post_status='publish' and post_type='post' ");
while ($postul = mysql_fetch_array($posturi))
	{
		$oras= get_post_meta($postul['ID'], 'oras', true);
		$judete = wp_get_object_terms($postul['ID'], 'judet'); 
		
			$items+=array($postul['post_title'].', '.$oras.', '.'jud. '.$judete[0]->name => $postul['post_title']);
	}
$result = array();
foreach ($items as $key=>$value) {
	if (strpos(strtolower($key), $q) !== false) {
		array_push($result, array("id"=>$value, "label"=>$key, "value" => strip_tags($key)));
	}
	if (count($result) > 11)
		break;
}

// json_encode is available in PHP 5.2 and above, or you can install a PECL module in earlier versions
echo json_encode($result);

}?>
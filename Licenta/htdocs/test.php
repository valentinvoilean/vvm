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

//selectam primele 5 intrari ordonate descrescator dupa data din formularele 10,12 ( commenturile pt hoteluri,pensiuni si restaurante ).
$forms= mysql_query("SELECT * FROM wp_frm_items WHERE form_id in (10,12) ORDER BY created_at Desc LIMIT 0, 5");
	while ($comment = mysql_fetch_array($forms))
		{
			echo $comment['id'].': <br />';
			//dupa ce am gasit Id-urile comment-urilor cautam valorile acestora.
			$result = mysql_query("SELECT * FROM wp_frm_item_metas WHERE item_id=".$comment['id']);
			
			while($row = mysql_fetch_array($result))
			  {
				  //fiecare field din formularele create cu Formidable pro are atribuit cate un ID. In functie de acel ID, ne vom da seama cui apartin acele valori
			    if ($row['field_id']==332)	echo 'Nume:'.$row['meta_value']." <br />";
				if ($row['field_id']==334)	echo 'Comentarii Pozitive:'.$row['meta_value']." <br />";
				if ($row['field_id']==335)	echo 'Comentarii Negative:'.$row['meta_value']." <br />";
				if ($row['field_id']==285)	echo 'Nota:'.$row['meta_value']." <br />";
				if ($row['field_id']==287){
				  $post = mysql_query("SELECT * FROM wp_posts WHERE ID=".$row['meta_value']);
				  while ($detalii_post = mysql_fetch_array($post)){
				  echo 'Nume post:'.$detalii_post['post_title'].'<br />';
				  }
				}
			  }
		}




  
}
mysql_close($con);
?> 
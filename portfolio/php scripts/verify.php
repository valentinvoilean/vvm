<?php
$i = $_POST["i"]; 
$answers=
array(
"Whidbey",
"Washington",
"walls",
"cottage");
$a= $answers[$i];
$b = $_POST["answer"];
$c = ucfirst($b);
$d = $_POST["discountcode"];

if ($a == $b || $c==$a)
   { if ($d=="tumblezinn6842")
   {
	   $token = md5(uniqid(rand(),1));

/* This file is used for storing tokens. One token per line. */
$file = "tmp/urls.txt";
if( !($fd = fopen($file,"a")) )
        die("Could not open $file!");

if( !(flock($fd,LOCK_EX)) )
        die("Could not aquire exclusive lock on $file!");

if( !(fwrite($fd,$token."\n")) )
        die("Could not write to $file!");

if( !(flock($fd,LOCK_UN)) )
        die("Could not release lock on $file!");

if( !(fclose($fd)) )
        die("Could not close file pointer for $file!");

/* Parse out the current working directory for this script. */
$cwd = substr($_SERVER['PHP_SELF'],0,strrpos($_SERVER['PHP_SELF'],"/"));

/* Report the one-time URL to the user: */
print "Use this URL to download the secret file:<br><br>\n";
print "<a href='http://".$_SERVER['HTTP_HOST']. 
      "$cwd/get_file.php?q=$token'>\n";
print "Download File</a>\n";
}
   
   
     else echo "Your discount code is not correct. <a href='javascript:history.go(-1)'>Click here</a> to go back.";}
else echo "Your answer is not correct. <a href='javascript:history.go(-1)'>Click Here </a> to go back.";


?>


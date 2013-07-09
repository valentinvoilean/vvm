<?php

$questions=
array(
"What is the 2nd word of page 62?",
"What is the last word on page 62?",
"What is the 2nd word on page 108?",
"What is the 2nd word on page 122?"
	  );
	  

$i=rand(0,3);

?>
<form action="verify.php" method="post"  >
<table cellspacing="10px">
<tr>
<td><?php echo($questions[$i]); ?></td><td><input id="answer"  name="answer" type="text"><br /></td>
</tr>
<tr>
<td>What is your discount code? </td><td><input id="discountcode" name="discountcode" type="text"></td>
</tr>
<tr>
<td><input id="i" name="i" type="hidden" value="<?php echo $i ?>"></td><td><input  type="Submit" value="OK"></td>
</tr>
</table>
</form>



<?php

/*Function from: http://form.guide/email-form/php-form-to-email.html */
/*function validateInput($str)
{
	$injections = array('(\n+)','(\r+)','(\t+)', '(%0A+)', '(%0D+)', '(%08+)', '(%09+)');
	$inject = join('|',$injections);
	$inject = "/$inject/i";
	
	if(preg_match($inject,$str)){
		return true;
	}else{
		return false;
	}
}*/

$sender = isset($_POST["sender"]);
$email = isset($_POST["email"]);
$msg = isset($_POST["msg"]);

$retval = "";

/*if(validateInput($sender) | validateInput($email) | validateInput($msg)){
	echo $retval;
	exit;
}*/

$myEmail = 'stephaniekyyip@gmail.com';
$subject = 'Emailing From Your Website';

@mail($myEmail, $subject, $msg, "From: $sender <$email>");

header('Location:contact.html', true, 301);
exit();
?>
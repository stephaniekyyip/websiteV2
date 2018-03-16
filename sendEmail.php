<?php
error_reporting(-1);
ini_set('display_error', 'On');
set_error_handler("var_dump");

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

if(isset($_POST['submit'])){
	$sender = $_POST['senderName'];
	$senderEmail = $_POST['email'];
	$msg = $_POST['msg'];

/*if(validateInput($sender) | validateInput($email) | validateInput($msg)){
	echo $retval;
	exit;
}*/

	$myEmail = "stephaniekyyip@zoho.com";
	$subject = "Emailing From Your Website";
	$header = "From:" . $sender . "<" . $senderEmail . ">";

	mail($myEmail, $subject, $msg, $header
	
header("Location: contact.html");

?>
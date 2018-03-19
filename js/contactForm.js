
function validateEmail(){
	var checkEmail = document.contactForm.email.value;
				
	atpos = checkEmail.indexOf("@");
    dotpos = checkEmail.lastIndexOf(".");
         
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
    	return false;
    }
    
    return true;
}
			
function validateForm(){	
	var checkName = document.forms["contactForm"]["senderName"].value;
	var checkMsg = document.forms["contactForm"]["msg"].value;
	var checkEmail = document.forms["contactForm"]["email"].value;
		
	if (checkName == ""){
		alert("Please type your name! I want to know who is sending the message.");
		return false;
	}else if (checkEmail == ""){
		alert("Please type your e-mail! I want to return your message.");
		return false;
	}else if (validateEmail() == false){
		alert("Please enter a valid e-mail address!");
		return false;
	}else if (checkMsg == ""){
		alert("Please type a message!");
		return false;
	}
		
	return true;	

}

function submitForm(){
	var sender = document.forms["contactForm"]["senderName"].value;
	var msg = document.forms["contactForm"]["msg"].value;
	var email = document.forms["contactForm"]["email"].value;
		
	if(validateForm() == true){
		var xhttp = new XMLHttpRequest();
		var response = "";
		
		/*xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status = 200){
				response  = this.responseText;
			}
		
		};*/
		
		xhttp.open("POST", "/sendEmail.php?sender=" + sender + "&email=" + email 
		+ "&msg=" + msg, true);
		xhttp.send();
		
		if (response == 1){
			alert("E-mail sent!");
			return true;
		}else{
			alert("Error! Unable to send e-mail!");
			return false;
		}
	
	}
	return false;

}			

		
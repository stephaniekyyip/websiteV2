
function revealSection(sectionName, btnName){

  var content = document.getElementById(sectionName);
  var revealBtn = document.getElementById(btnName);

  if (content.style.display == "none"){
    content.style.display = "block";
    revealBtn.style.display = "none";
  }else{
    content.style.display = "none";
    revealBtn.style.display = "block";
  }

}

function closeSection(sectionName, btnName){

  var content = document.getElementById(sectionName);
  var revealBtn = document.getElementById(btnName);

  if (content.style.display == "block"){
    content.style.display = "none";
    revealBtn.style.display = "block";
  }

}

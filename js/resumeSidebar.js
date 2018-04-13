//window.onwheel= function (stickySidebar) {
/*Resume: Sticky Sidebar */
function stickySidebar () {
  var sidebar = document.getElementById('resumeSidebar');
  var titleHeight = document.getElementById('resumeTitle').scrollHeight;
  var headerHeight = document.getElementById('myHeader').scrollHeight;

  var ypos = window.pageYOffset; //document.body.scrollTop;


  if(ypos > titleHeight){
    sidebar.style.top = headerHeight + "px";
  }else{
    sidebar.style.top = titleHeight - ypos + "px";
  }
}

window.addEventListener("wheel", stickySidebar);
window.addEventListener("scroll", stickySidebar);
window.addEventListener("hashchange", stickySidebar);
window.addEventListener("resize", stickySidebar);

/*Resume: Highlight current section in sidebar*/
function highlightCurrent(){
  var ypos = window.pageYOffset;

  var section1 = document.getElementById("education");
  var section2 = document.getElementById("techSkills");
  var section3 = document.getElementById("workExperience");
  var section4 = document.getElementById("studentOrg");
  var section5 = document.getElementById("projectsSection");

  // education
  if (ypos >= section1.offsetTop && ypos < section2.offsetTop){
    document.getElementById("nav" + 0).style.opacity = "1";
  }else{
    document.getElementById("nav" + 0).style.opacity = "0.5";
  }

  // tech skills
  if (ypos >= section2.offsetTop && ypos < section3.offsetTop){
    document.getElementById("nav" + 1).style.opacity = "1";
  }else{
    document.getElementById("nav" + 1).style.opacity = "0.5";
  }

  // work experience
  if (ypos >= section3.offsetTop && ypos < section4.offsetTop){
    document.getElementById("nav" + 2).style.opacity = "1";
  }else{
    document.getElementById("nav" + 2).style.opacity = "0.5";
  }

  // student org
  if (ypos >= section4.offsetTop && ypos < section5.offsetTop){
    document.getElementById("nav" + 3).style.opacity = "1";
  }else{
    document.getElementById("nav" + 3).style.opacity = "0.5";
  }

  // projects
  if (ypos >= section5.offsetTop){
    document.getElementById("nav" + 4).style.opacity = "1";
  }else{
    document.getElementById("nav" + 4).style.opacity = "0.5";
  }


}

window.addEventListener("scroll", highlightCurrent);
window.addEventListener("wheel", highlightCurrent);

function highlightLastSection(){
  //projects Section
  document.getElementById("nav4").style.opacity = "1";

  //student org Section
  document.getElementById("nav3").style.opacity = "0.5";

}

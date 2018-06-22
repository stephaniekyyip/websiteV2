// Menu in responsive/ mobile version

var icon = document.getElementById("menu-icon");
var menu = document.getElementById("icon-nav-links");

icon.addEventListener("click", function(){
  // Toggle dropdown menu
  $('#icon-nav-links').slideToggle();

  // Toggle menu icon from hamburger to X
  if(icon.classList.contains('fa-bars')){
    icon.classList.add('fa-times');
    icon.classList.remove('fa-bars');
  }else{
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  }

  // Toggle color of menu icon
  if(icon.classList.contains('icon-nav-active')){
    icon.classList.remove('icon-nav-active');
  }else{
    icon.classList.add('icon-nav-active');
  }
});

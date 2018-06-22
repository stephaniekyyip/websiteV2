// ----------------------------------------------------------------------------
// Dropdown menu in responsive version
// ----------------------------------------------------------------------------

var icon = document.getElementById('menu-icon');
var menu = document.getElementById('icon-nav-links');

icon.addEventListener("click", function(){
  // Toggle dropdown menu
  $('#icon-nav-links').slideToggle();

  // Toggle menu icon from hamburger to X
  icon.classList.toggle('fa-times');
  icon.classList.toggle('fa-bars');

  // Toggle color of menu icon
  icon.classList.toggle('icon-nav-active');

});

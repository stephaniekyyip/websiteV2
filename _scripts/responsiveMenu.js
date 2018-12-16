// ----------------------------------------------------------------------------
// Dropdown menu in mobile version
// ----------------------------------------------------------------------------

const icon = document.getElementById('menu-icon');
const menu = document.querySelector('.icon-nav-links');
const navBar = document.querySelector('header');

icon.addEventListener("click", function(){
  const ypos = document.body.scrollTop || document.documentElement.scrollTop || document.scrollingElement.scrollTop;

  // Toggle dropdown menu
  menu.classList.toggle('display-icon-menu');

  // Make nav bar opaque (if not already)
  if(ypos == 0){
    navBar.classList.toggle('opaque');
  }

  // Toggle menu icon from hamburger to X
  icon.classList.toggle('fa-times');
  icon.classList.toggle('fa-bars');

  // Toggle color of menu icon
  icon.classList.toggle('icon-nav-active');

});

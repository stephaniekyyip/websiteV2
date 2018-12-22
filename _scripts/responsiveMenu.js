// ----------------------------------------------------------------------------
// Dropdown nav bar in mobile version
// ----------------------------------------------------------------------------

const icon = document.getElementById('menu-icon');
const menu = document.querySelector('.icon-nav-links');
const navBar = document.querySelector('header');

// ----------------------------------------------------------------------------
// Open/ close menu when clicked
// ----------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------
// Close menu when either a link is clicked or when user clicks outside of menu
// ----------------------------------------------------------------------------
function closeMenu() {
  const ypos = document.body.scrollTop || document.documentElement.scrollTop || document.scrollingElement.scrollTop;

  // Close menu
  menu.classList.remove('display-icon-menu');
  
  // Change icon back to hamburger
  icon.classList.remove('fa-times');
  icon.classList.add('fa-bars');

  // Change color of menu icon
  icon.classList.remove('icon-nav-active');

  // Make nav bar clear if at the top of page
  if(ypos == 0){
    navBar.classList.remove('opaque');
  }
}

document.addEventListener('click', function(event){
  // Close menu when user clicks outside of menu or on a link in the menu
  if(event.target.closest('header') == null || event.target.closest('li > a') != null){
    closeMenu();
  }
});
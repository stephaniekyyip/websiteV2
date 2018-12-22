// ----------------------------------------------------------------------------
// Make nav bar opaque when scrolled down
// ----------------------------------------------------------------------------
function opaqueNav() {
  const ypos = document.body.scrollTop || document.documentElement.scrollTop || document.scrollingElement.scrollTop;
  const navBar = document.querySelector('header');
  const navLinks = document.querySelector('nav li .active');
  const name = document.querySelector('h1');

  if(ypos > 0) {
    navBar.classList.add('opaque');
    // navLinks.classList.add('hover-shadow');
    name.classList.remove('hide-name');
  }else {
    navBar.classList.remove('opaque');
    // navLinks.classList.remove('hover-shadow');
    name.classList.add('hide-name');
  }
}

window.addEventListener("wheel", opaqueNav);
window.addEventListener("scroll", opaqueNav);
window.addEventListener("hashchange", opaqueNav);


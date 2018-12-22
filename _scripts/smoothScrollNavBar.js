// ----------------------------------------------------------------------------
// Smooth scroll to links in nav bar
// ----------------------------------------------------------------------------
const navLinksText = document.querySelectorAll('.text-nav li a');
const navLinksIcon = document.querySelectorAll('.icon-nav-links li a');

function smoothStep(n) {
  return n * n * (3 - 2 * n);
}

function scrollToSection(event) {
  event.preventDefault();

  const link = this.getAttribute('href').split('/')[1];
  const section = document.querySelector(link);
  const yPos = document.documentElement.scrollTop;
  const distance = section.offsetTop - yPos;
  let count = 0;

  // Smooth scroll
  let scroll = setInterval(function(){
    document.documentElement.scrollTop = yPos + distance * smoothStep(count/40);
    count++;
    if(count > 40){
      clearInterval(scroll);
    }
  }, 20);

}

for(let i = 0; i < navLinksText.length; i++){
  navLinksText[i].addEventListener('click', scrollToSection);
  navLinksIcon[i].addEventListener('click', scrollToSection);
}
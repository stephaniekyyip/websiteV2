// ----------------------------------------------------------------------------
// Highlight the title in the nav bar of the currently visible section
// ----------------------------------------------------------------------------

function highlightCurrent(){
  const yPos = document.documentElement.scrollTop;
  const navArr = ['About', 'Résumé', 'Projects', 'Contact'];
  const sectionArr = ['about', 'resume', 'projects', 'contact'];
  let currSection, nextSection, prevSection, currNav, nextNav, prevNav;

  sectionArr.forEach(function(item, index){
    currSection = document.getElementById(item);
    currNav = document.getElementById('text-nav-' + navArr[index]);

    // if item is not last
    if (index < sectionArr.length - 1) {
      nextSection = document.getElementById(sectionArr[index+1]);
      nextNav = document.getElementById('text-nav-' + navArr[index+1]);

      // if ypos is within this section, highlight it in the nav bar
      if (yPos >= currSection.offsetTop && yPos < nextSection.offsetTop){
        currNav.classList.add('active');
      }else{
        currNav.classList.remove('active');
      }

     // if item is last 
    } else {
      prevSection = document.getElementById(sectionArr[index-1]);
      prevNav = document.getElementById('text-nav-' + navArr[index-1]);

      // if ypos is at the bottom of the window or within the last section, highlight the last section and 
      // un-highlight the penultimate section in the nav bar
      if ((yPos + window.innerHeight >= document.body.scrollHeight) || yPos >= currSection.offsetTop){
        currNav.classList.add('active');
        prevNav.classList.remove('active');
      }else{
        currNav.classList.remove('active');
      }
    }
  });

}

window.addEventListener("scroll", highlightCurrent);
window.addEventListener("wheel", highlightCurrent);


// ----------------------------------------------------------------------------
// Sticky sidebar
// ----------------------------------------------------------------------------
function stickySidebar(){
  var sidebar = document.querySelector('.resume-sidebar');
  var jumbotronHeight = document.querySelector('.jumbotron').scrollHeight;
  var headerHeight = document.querySelector('header').scrollHeight;
  var btnHeight = document.querySelector('.resume-btn').scrollHeight;
  var yPos = document.body.scrollTop;
  var marginTop = 33 + 60;

  if(yPos > jumbotronHeight){
    sidebar.style.top = headerHeight + "px";
  }else {
    sidebar.style.top = jumbotronHeight + headerHeight + btnHeight - yPos + marginTop + "px";
  }

  highlightCurrent();
}

window.addEventListener("wheel", stickySidebar);
window.addEventListener("scroll", stickySidebar);
window.addEventListener("hashchange", stickySidebar);

var sidebarLinks = document.querySelectorAll('aside li a');
for (var i = 0; i < sidebarLinks.length; i++) {
  sidebarLinks[i].addEventListener("click", stickySidebar);
}

// ----------------------------------------------------------------------------
// Smooth scrolling for sidebar
// ----------------------------------------------------------------------------
$(function(){
  function scrollToSection(event){
    event.preventDefault();
    var section = $(this).attr('href');
    var headerHeight = document.querySelector('header').scrollHeight;
    var marginTop = 20;
    $('html, body').animate({ scrollTop: $(section)[0].offsetTop - headerHeight - marginTop
    }, 500, stickySidebar);
  }

  $('aside li a').on('click', scrollToSection);
  $('#resume-back-to-top').on('click', scrollToSection);

});

// ----------------------------------------------------------------------------
// Highlight current link in sidebar
// ----------------------------------------------------------------------------
function highlightCurrent(){
  var yPos = document.body.scrollTop;
  var headerHeight = document.querySelector('header').scrollHeight;
  var marginTop = 20;
  var subtract = headerHeight + marginTop;
  var active = 1, inactive = 0.6;

  var linkArr = ['nav-edu','nav-skills','nav-work','nav-proj','nav-involvement'];
  var sectionArr = ['education','skills','work','projects','student-involvement'];

  linkArr.forEach(function(item, index){
    if(index < linkArr.length - 1){
      if(yPos >= (document.getElementById(sectionArr[index]).offsetTop - subtract) && yPos < (document.getElementById(sectionArr[index+1]).offsetTop - subtract)){
        document.getElementById(item).style.opacity = active;
      }else {
        document.getElementById(item).style.opacity = inactive;
      }
    }else{
      if((yPos + window.innerHeight >= document.body.scrollHeight) || (yPos >= document.getElementById(sectionArr[index]).offsetTop - subtract)){
        document.getElementById(item).style.opacity = active;
        document.getElementById(linkArr[index-1]).style.opacity = inactive;
      }else {
        document.getElementById(item).style.opacity = inactive;
      }
    }
  });
}

window.addEventListener("scroll", highlightCurrent);
window.addEventListener("wheel", highlightCurrent);

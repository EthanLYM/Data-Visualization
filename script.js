
//w3schools JavaScript referenced for hoverable dropdown menu https://www.w3schools.com/howto/howto_css_dropdown.asp
window.onclick = function(event) {
    if (!event.target.matches('.dropbutton')) {
      var dropdowns = document.getElementsByClassName("content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
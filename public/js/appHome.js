


//? <---------- Home Selector Section ---------------->
const toggleMenu = document.querySelector(".toggle-sidebar");
const homePageSidebar = document.querySelector(".sidebar");



//*<---------------- Home Function Section ------------------->
toggleMenu.addEventListener("click", function () {
  homePageSidebar.classList.toggle("open");
});
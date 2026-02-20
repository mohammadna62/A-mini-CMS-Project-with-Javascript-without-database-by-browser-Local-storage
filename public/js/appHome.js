const data = {
  users: [],

  products: [
    {
      id: 1,
      title: "کفش ورزشی",
      price: 2000000,
      slug: "nike-sport-shoe",
    },
  ],
};



//? <---------- Home Selector Section ---------------->
const toggleMenu = document.querySelector(".toggle-sidebar");
const homePageSidebar = document.querySelector(".sidebar");



//*<---------------- Home Function Section ------------------->
toggleMenu.addEventListener("click", function () {
  homePageSidebar.classList.toggle("open");
});
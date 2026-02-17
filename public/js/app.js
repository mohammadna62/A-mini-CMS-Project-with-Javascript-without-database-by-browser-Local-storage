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
//? <------------ User Selector Section ----------------->
const createUserBtn = document.querySelector(".section-link");
const userModal = document.querySelector("#user-modal-screen");
const userFullName = document.querySelector("#user-fullName");
const userUsername = document.querySelector("#user-username");
const userEmail = document.querySelector("#user-email");
const userPassword = document.querySelector("#user-password");
const userCreateSubmitBtn = document.querySelector(".submit");
const closeUserModalBtn = document.querySelector(".close-modal");
const cancelUserBtn = document.querySelector(".cancel");

//? <---------- Product Selector Section ---------------->

//? <---------- Home Selector Section ---------------->
const toggleMenu = document.querySelector(".toggle-sidebar");
const homePageSidebar = document.querySelector(".sidebar");
//! <----------- End Of Selector Section----------------->

//? <------------ User Event Section ----------------->
createUserBtn.addEventListener("click", ShowUserModal);
userCreateSubmitBtn.addEventListener("click", createUser);
closeUserModalBtn.addEventListener("click", hideUserModal);
cancelUserBtn.addEventListener("click", hideUserModal);
//*<---------------- Product Function Section ---------------->
function addProductDataToLocalStorage(product) {
  localStorage.setItem("user", product);
}
function getProductDataToLocalStorage(product) {
  localStorage.getItem("product");
}
//*<---------------- Home Function Section ------------------->
toggleMenu.addEventListener("click", function () {
  homePageSidebar.classList.toggle("open");
});
//! <----------- End Of Function Section----------------->

//*<---------------- User Function Section ------------------->

function createUser() {
  const userFullNameData = userFullName.value;
  const userUsernameData = userUsername.value;
  const userEmailData = userEmail.value;
  const userPasswordData = userPassword.value;
  const newUser = {
    id: Math.floor(Math.random() * 9999),
    name: userFullNameData,
    username: userUsernameData,
    email: userEmailData,
    password: userPasswordData,
  };
  data.users.push(newUser);
  addUserDataToLocalStorage(data.users);
  hideUserModal()
}
function showUserData() {}
function addUserDataToLocalStorage(user) {
  const userParsedByJson = JSON.stringify(user);
  localStorage.setItem("user", userParsedByJson);
}
function getUserDataToLocalStorage(user) {
  localStorage.getItem("user");
}
function ShowUserModal() {
  userModal.classList.remove("hidden");
  userFullName.innerHTML = "";
  userUsername.innerHTML = "";
  userEmail.innerHTML = "";
  userPassword.innerHTML = "";
}
function hideUserModal() {
  userModal.classList.add("hidden");
}
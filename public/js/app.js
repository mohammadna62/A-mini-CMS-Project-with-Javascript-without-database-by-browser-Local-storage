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
const userTableBody = document.querySelector(".table-body");
const usersDataCount = document.querySelector(".users-data");



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
  hideUserModal();
  showUserDataOnDashboard(data.users);
  countOfUser()
}
function showUserDataOnDashboard(users) {
  userTableBody.innerHTML = ""
  users.forEach(function (user) {
    userTableBody.insertAdjacentHTML(
      "beforeend",
      `
       <div class="tableRow">
              <p class="user-fullName">${user.name}</p>
              <p class="user-username">${user.username}</p>
              <p class="user-email">${user.email}</p>
              <p class="user-password">${user.password}</p>
                <div class="product-manage">
                  <button class="edit-btn" onclick="editUser(${user.id})" >
                    <!-- Edit icon -->
                    <i class="fas fa-edit"></i>
                   </button>
                  <button class="remove-btn" onclick="removeUser(${user.id})">
                  <!-- Ban icon -->
                  <i class="fas fa-ban"></i>
                  </button>
              </div>
        </div>
      `,
    );
  });
  countOfUser()
}
function showUserData() {
  getUserDataToLocalStorage();
}
function addUserDataToLocalStorage(user) {
  const userParsedByJson = JSON.stringify(user);
  localStorage.setItem("user", userParsedByJson);
}
function getUserDataToLocalStorage() {
  const userDataOnLocalStorage = JSON.parse(localStorage.getItem("user"));
  if (userDataOnLocalStorage) {
    data.users = userDataOnLocalStorage;
  }
  showUserDataOnDashboard(userDataOnLocalStorage);
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
 function countOfUser(){
  usersDataCount.innerHTML = data.users.length
 }
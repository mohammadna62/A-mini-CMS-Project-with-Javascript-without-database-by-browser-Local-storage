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
const userModalScreenEdit = document.querySelector("#user-modal-screen-edit");
const paginationContainer = document.querySelector(".pagination");
const userSelectOption = document.querySelector(".numberPerPage");

let userPage = 1;
//let userPerPage = 10;
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
userSelectOption.addEventListener("change", changeUserPerPage);

//submitUserEdit.addEventListener("click",)
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
  countOfUser();
}
function showUserDataOnDashboard(users) {
  let startIndex = (userPage - 1) * Number(userSelectOption.value);
  let lastIndex = startIndex + Number(userSelectOption.value);
  const shownUsers = users.slice(startIndex, lastIndex);

  userTableBody.innerHTML = "";
  shownUsers.forEach(function (user) {
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
  countOfUser();
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
  generatePagination();
}
function ShowUserModal() {
  userModal.classList.remove("hidden");
  userFullName.value = "";
  userUsername.value = "";
  userEmail.value = "";
  userPassword.value = "";
}
function hideUserModal() {
  userModal.classList.add("hidden");
}
function countOfUser() {
  usersDataCount.innerHTML = data.users.length;
}

function editUser(userId) {
  showUserModalScreenEdit();
  const user = data.users.find(function (user) {
    return user.id === userId;
  });
  userModalScreenEdit.innerHTML = "";
  userModalScreenEdit.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal">
        <header class="modal-header">
          <h3>ویرایش اطلاعات کاربر</h3>
          <button class="close-modal user" id="close-modal-user">
            <i class="fas fa-times" ></i>
          </button>
        </header>
        <main class="modal-content">
          <input
            type="text"
            class="modal-input"
            value = "${user.name}"
            id="user-fullName-edit"
          />
          <input
            type="text"
            class="modal-input"
            value = "${user.username}"
            id="user-username-edit"
             />
          <input
            type="email"
            class="modal-input email"
            value = "${user.email}"
            id="user-email-edit"
             />
          <input
            type="email"
            class="modal-input"
             value = "${user.password}"
            id="user-password-edit"
            />
        </main>
        <footer class="modal-footer">
          <button class="cancel" id="cancel-user-edit">انصراف</button>
          <button class="submit" id="submit-user-edit">تائید</button>
        </footer>
      </div>
    `,
  );
  const closeModalUserEdit = document.querySelector("#close-modal-user");
  const cancelUserEdit = document.querySelector("#cancel-user-edit");
  const submitUserEdit = document.querySelector("#submit-user-edit");

  const userFullNameEdit = document.querySelector("#user-fullName-edit");
  const userUsernameEdit = document.querySelector("#user-username-edit");
  const userEmailEdit = document.querySelector("#user-email-edit");
  const userPasswordEdit = document.querySelector("#user-password-edit");
  submitUserEdit.addEventListener("click", function () {
    const userEdited = data.users.map(function (user) {
      if (user.id === userId) {
        return {
          id: userId,
          name: userFullNameEdit.value,
          username: userUsernameEdit.value,
          email: userEmailEdit.value,
          password: userPasswordEdit.value,
        };
      }
      return user;
    });
    data.users = userEdited;

    userModalScreenEdit.classList.add("hidden");
    addUserDataToLocalStorage(data.users);
    countOfUser();
    showUserDataOnDashboard(data.users);
  });

  closeModalUserEdit.addEventListener("click", function () {
    userModalScreenEdit.classList.add("hidden");
  });
  cancelUserEdit.addEventListener("click", function () {
    userModalScreenEdit.classList.add("hidden");
  });
}
function removeUser(userId) {
  const userIndexOfData = data.users.findIndex(function (user) {
    return user.id === userId;
  });
  data.users.splice(userIndexOfData, 1);
  addUserDataToLocalStorage(data.users);
  countOfUser();
  showUserDataOnDashboard(data.users);
}

function showUserModalScreenEdit() {
  userModalScreenEdit.classList.remove("hidden");
}
function changePageHandler(userSelectedPage) {
  userPage = userSelectedPage;

  const pagesNumbers = document.querySelectorAll(".page");

  pagesNumbers.forEach(function (pageNumber) {
    if (+pageNumber.innerHTML === userPage) {
      pageNumber.classList.add("active");
    } else {
      pageNumber.classList.remove("active");
    }
  });

  showUserDataOnDashboard(data.users);
}
function generatePagination() {
  const pagesCount = data.users.length / Number(userSelectOption.value);

  for (let i = 0; i < pagesCount; i++) {
    paginationContainer.insertAdjacentHTML(
      "beforeend",
      `
        <span tabindex="1" class="page ${
          i === 0 ? "active" : ""
        }" onclick="changePageHandler(${i} + 1)">${i + 1}</span>
      `,
    );
  }
}
function changeUserPerPage() {
  paginationContainer.innerHTML = "";
  generatePagination();
  showUserDataOnDashboard(data.users)
}

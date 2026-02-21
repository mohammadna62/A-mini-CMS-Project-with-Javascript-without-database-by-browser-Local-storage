//* <---------- Home Selector Section ---------------->
const moonOrSunBtn = document.querySelector("#moonOrSunBtn");
const html = document.querySelector("html");

//? <---------- Home (Product) Selector Section ---------------->
const toggleMenu = document.querySelector(".toggle-sidebar");
const homePageSidebar = document.querySelector(".sidebar");
const tableContainer = document.querySelector("#productContainer");
const showCountOfProducts = document.querySelector("#showProductsCount");
const showCountOfProductsOnHeader = document.querySelector(".products-data");
const modalScreenEdit = document.querySelector("#product-modal-screen-edit");
const toast = document.querySelector(".toast");
const progress = document.querySelector(".process");
//! <---------- Home (User) Selector Section ---------------->
const userContainer = document.querySelector("#table-user-body");

//?<----------------Home Event Section --------------->
toggleMenu.addEventListener("click", function () {
  homePageSidebar.classList.toggle("open");
});
moonOrSunBtn.addEventListener("click", pageTheme);
//*<---------------- Home Function Section ------------------->

function getData() {
  //* Products Data Call
  const products = getProductLocalStorage();
  showCountOfProductOnLocalStorage();
  showProductsData(products);
  //* Users Data Call
  showUsersOnDashboard();
  //* Theme Situation
  themeSituationOnLoad();
}

function getProductLocalStorage() {
  const productsData = JSON.parse(localStorage.getItem("product"));
  return productsData;
}

function showProductsData(products) {
  tableContainer.innerHTML = "";
  products.forEach(function (product) {
    tableContainer.insertAdjacentHTML(
      "beforeend",
      `
         <div class="tableRow">
                  <p class="product-title">${product.title}</p>
                  <p class="product-price">${product.price.toLocaleString()} ریال</p>
                  <p class="product-shortName">${product.slug}</p>
                  <div class="product-manage">
                    <button class="edit-btn" onclick="editProduct(${product.id})">
                      <!-- Edit icon -->
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="remove-btn" onclick="removeProduct(${product.id})">
                      <!-- Delete fas icon -->
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
      `,
    );
  });
}

function showCountOfProductOnLocalStorage() {
  const productsData = getProductLocalStorage();
  showCountOfProducts.innerHTML = productsData.length;
  showCountOfProductsOnHeader.innerHTML = productsData.length;
}
function addProductDataToLocalStorage(products) {
  const productParsedByJson = JSON.stringify(products);
  localStorage.setItem("product", productParsedByJson);
}

function removeProduct(productId) {
  const products = getProductLocalStorage();

  var productIndexOfData = products.findIndex(function (product) {
    return product.id === productId;
  });

  products.splice(productIndexOfData, 1);

  addProductDataToLocalStorage(products);

  showCountOfProductOnLocalStorage();

  showProductsData(products);
}

function editProduct(productId) {
  const products = getProductLocalStorage();
  const product = products.find(function (product) {
    return product.id === productId;
  });
  modalScreenEdit.innerHTML = "";
  modalScreenEdit.classList.remove("hidden");
  modalScreenEdit.insertAdjacentHTML(
    "beforeend",
    `
     <div class="modal">
        <header class="modal-header">
          <h3>ویرایش اطلاعات محصول</h3>
          <button class="close-modal Product" id="close-modal-product">
            <i class="fas fa-times" ></i>
          </button>
        </header>
        <main class="modal-content">
          <input
            type="text"
            class="modal-input"
            value = "${product.title}"
            id="product-title-edit"
          />
          <input
            type="number"
            class="modal-input"
            value = "${product.price.toLocaleString()}"
            id="product-price-edit"
             />
          <input
            type="text"
            class="modal-input email"
            value = "${product.slug}"
            id="product-slug-edit"
             />
          
        </main>
        <footer class="modal-footer">
          <button class="cancel" id="cancel-product-edit">انصراف</button>
          <button class="submit" id="submit-product-edit">تائید</button>
        </footer>
      </div>
    `,
  );
  const productTitleEdit = document.querySelector("#product-title-edit");
  const productPriceEdit = document.querySelector("#product-price-edit");
  const productSlugEdit = document.querySelector("#product-slug-edit");
  const submitProductEdit = document.querySelector("#submit-product-edit");
  submitProductEdit.addEventListener("click", function () {
    modalScreenEdit.classList.add("hidden");
    const productEdited = products.map(function (product) {
      if (product.id === productId) {
        return {
          id: productId,
          title: productTitleEdit.value,
          price: +productPriceEdit.value,
          slug: productSlugEdit.value,
        };
      }
      return product;
    });
    addProductDataToLocalStorage(productEdited);
    showCountOfProductOnLocalStorage();
    showProductsData(productEdited);
    toast.classList.remove("hidden");
    setTimerToToast();
  });
}
function setTimerToToast() {
  let progressSteps = 0;

  const progressInterval = setInterval(function () {
    progressSteps++;
    progress.style.width = `${progressSteps}%`;

    if (progressSteps > 110) {
      progress.style.width = "1%";
      toast.classList.add("hidden");
      clearInterval(progressInterval);
    }
  }, 50);
}

//! <---------- Home (User) Function Section ---------------->

function showUsersOnDashboard() {
  const users = getUserDataFromLocalStorage();
  userContainer.innerHTML = "";

  for (let i = users.length; i > users.length - 5; i--) {
    let user = users[i - 1];
    userContainer.insertAdjacentHTML(
      "beforeend",
      `
         <article>
              <!-- user icon -->
              <span class="icon-card">
                <i class="fa-solid fa-user"></i>
              </span>
              <!-- user data -->
              <div>
                <p class="user-name">${user.name}</p>
                <p class="user-email">${user.email}</p>
              </div>
            </article>
      `,
    );
  }
}

function getUserDataFromLocalStorage() {
  const users = JSON.parse(localStorage.getItem("user"));
  return users;
}

//? <-------------Home Function Section---------->

function pageTheme() {
  if (moonOrSunBtn.className === "fas fa-sun") {
    const light = "light";
    moonOrSunBtn.className = "fas fa-moon";
    html.className = light;
    setLocalStorageTheme(light);
  } else {
    const dark = "dark";
    moonOrSunBtn.className = "fas fa-sun";
    html.className = dark;
    setLocalStorageTheme(dark);
  }
}
function setLocalStorageTheme(theme) {
  localStorage.setItem("theme", theme);
}
function getLocalStorageTheme() {
  const theme = localStorage.getItem("theme");
  return theme;
}
function themeSituationOnLoad() {
  const theme = getLocalStorageTheme();

  if (theme === "dark") {
    moonOrSunBtn.className = "fas fa-sun";
    html.className ="dark"
  } else {
    moonOrSunBtn.className = "fas fa-moon";
    html.className ="light"
  }
}

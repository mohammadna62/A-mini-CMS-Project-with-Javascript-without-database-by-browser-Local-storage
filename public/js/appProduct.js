const data = {
  users: [],

  products: [],
};

//? <---------- Product Selector Section ---------------->
const createProductBtn = document.querySelector("#create-product");
const productModal = document.querySelector("#user-modal-screen");
const productTitle = document.querySelector("#product-title");
const productPrice = document.querySelector("#product-price");
const productShortName = document.querySelector("#product-shortName");
const productCreateSubmitBtn = document.querySelector("#submit");
const closeProductModalBtn = document.querySelector("#close-modal");
const cancelProductBtn = document.querySelector("#cancel");
const productTableBody = document.querySelector(".table-body");
const productsDataCount = document.querySelector("#products-data");
const productModalEdit = document.querySelector("#product-modal-screen-edit");
const paginationProductContainer = document.querySelector(".pagination");
const productSelectOption = document.querySelector(".numberProductPerPage");
const productRemoveModal = document.querySelector("#productRemoveModal");
const closeModalRemoveProduct = document.querySelector("#productRemoveModal");
const cancelRemoveProduct = document.querySelector("#cancel-removeProduct");
const submitRemoveProduct = document.querySelector("#submit-removeProduct");
const toast = document.querySelector(".toast");
const progress = document.querySelector(".process");
const toggleMenu = document.querySelector(".toggle-sidebar");
const homePageSidebar = document.querySelector(".sidebar");



let productPage = 1;

//?<----------------Product Event Section --------------->
createProductBtn.addEventListener("click", ShowProductModal);
productCreateSubmitBtn.addEventListener("click", createProduct);
closeProductModalBtn.addEventListener("click", hideProductModal);
cancelProductBtn.addEventListener("click", hideProductModal);
productSelectOption.addEventListener("change", changeProductPerPage);
closeModalRemoveProduct.addEventListener("click", hideRemoveProductModal);
cancelRemoveProduct.addEventListener("click", hideRemoveProductModal);
//*<---------------- Product Function Section ---------------->

function createProduct() {
  const productTitleData = productTitle.value;
  const productPriceData = productPrice.value;
  const productShortNameData = productShortName.value;
  const newProduct = {
    id: Math.floor(Math.random() * 9999),
    title: productTitleData,
    price: productPriceData,
    slug: productShortNameData,
  };
  data.products.push(newProduct);

  addProductDataToLocalStorage(data.products);
  hideProductModal();
  showProductDataOnDashboard(data.products);
  countOfProduct();
}
function showProductDataOnDashboard(products) {
  let startIndex = (productPage - 1) * Number(productSelectOption.value);
  let lastIndex = startIndex + Number(productSelectOption.value);
  const shownProducts = products.slice(startIndex, lastIndex);

  productTableBody.innerHTML = "";
  shownProducts.forEach(function (product) {
    productTableBody.insertAdjacentHTML(
      "beforeend",
      `
        <div class="tableRow">
              <p class="product-title">${product.title}</p>
              <p class="product-price">${product.price.toLocaleString()} ریال</p>
              <p class="product-shortName">${product.slug}</p>
              <div class="product-manage">
                 <button class="edit-btn" onclick="editProduct(${product.id})" >
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
  countOfProduct();
}
function showProductData() {
  getProductDataToLocalStorage();
}
function addProductDataToLocalStorage(product) {
  const productParsedByJson = JSON.stringify(product);
  localStorage.setItem("product", productParsedByJson);
}
function getProductDataToLocalStorage() {
  const productDataOnLocalStorage = JSON.parse(localStorage.getItem("product"));
  if (productDataOnLocalStorage) {
    data.products = productDataOnLocalStorage;
  }
  showProductDataOnDashboard(productDataOnLocalStorage);
  generatePagination();
}
function ShowProductModal() {
  productModal.classList.remove("hidden");
  productTitle.value = "";
  productPrice.value = "";
  productShortName.value = "";
}
function hideProductModal() {
  productModal.classList.add("hidden");
}
function countOfProduct() {
  productsDataCount.innerHTML = data.products.length;
}

function editProduct(productId) {
  productModalEdit.classList.remove("hidden");
  const product = data.products.find(function (product) {
    return product.id === productId;
  });
  productModalEdit.innerHTML = "";
  productModalEdit.insertAdjacentHTML(
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
  const closeModalProductEdit = document.querySelector("#close-modal-product");
  const cancelProductEdit = document.querySelector("#cancel-product-edit");
  const submitProductEdit = document.querySelector("#submit-product-edit");

  const productTitleEdit = document.querySelector("#product-title-edit");
  const productPriceEdit = document.querySelector("#product-price-edit");
  const productSlugEdit = document.querySelector("#product-slug-edit");

  submitProductEdit.addEventListener("click", function () {
    const productEdited = data.products.map(function (product) {
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
    data.products = productEdited;

    productModalEdit.classList.add("hidden");
    addProductDataToLocalStorage(data.products);
    countOfProduct();
    showProductDataOnDashboard(data.products);
    toast.classList.remove("hidden")
    setTimerToToast()

  });

  closeModalProductEdit.addEventListener("click", function () {
    productModalEdit.classList.add("hidden");
  });
  cancelProductEdit.addEventListener("click", function () {
    productModalEdit.classList.add("hidden");
  });
}
function removeProduct(productId) {
  productRemoveModal.classList.remove("hidden");

  function handler() {
    hideRemoveProductModal();

    var productIndexOfData = data.products.findIndex(function (product) {
      return product.id === productId;
    });

    data.products.splice(productIndexOfData, 1);

    addProductDataToLocalStorage(data.products);

    countOfProduct();

    showProductDataOnDashboard(data.products);

    submitRemoveProduct.removeEventListener("click", handler);
  }

  submitRemoveProduct.addEventListener("click", handler);
}

function changeProductPageHandler(productSelectedPage) {
  productPage = productSelectedPage;

  const pagesNumbers = document.querySelectorAll(".page");

  pagesNumbers.forEach(function (pageNumber) {
    if (+pageNumber.innerHTML === productPage) {
      pageNumber.classList.add("active");
    } else {
      pageNumber.classList.remove("active");
    }
  });

  showProductDataOnDashboard(data.products);
}
function generatePagination() {
  const pagesCount = data.products.length / Number(productSelectOption.value);

  for (let i = 0; i < pagesCount; i++) {
    paginationProductContainer.insertAdjacentHTML(
      "beforeend",
      `
        <span tabindex="1" class="page ${
          i === 0 ? "active" : ""
        }" onclick="changeProductPageHandler(${i} + 1)">${i + 1}</span>
      `,
    );
  }
}
function changeProductPerPage() {
  paginationProductContainer.innerHTML = "";
  generatePagination();
  showProductDataOnDashboard(data.products);
}

function hideRemoveProductModal() {
  productRemoveModal.classList.add("hidden");
}

function setTimerToToast() {
  let progressSteps = 0;


  const progressInterval = setInterval(function () {
    progressSteps++;
    progress.style.width = `${progressSteps}%`;

    if (progressSteps > 110) {
      progress.style.width = "1%";
      toast.classList.add("hidden")
       clearInterval(progressInterval);
    }
  }, 50);
}
toggleMenu.addEventListener("click", function () {
  homePageSidebar.classList.toggle("open");
});
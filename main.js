let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let mod = "create";
let tmp;
//gettotal
function getTotal() {
  if (price.value != "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}
// create product
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = () => {
  const newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //count and update
  if (title.value != "" && price.value != "" && newPro.count < 500) {
    if (mod === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataProduct.push(newPro);
        }
      } else {
        dataProduct.push(newPro);
      }
    } else {
      dataProduct[tmp] = newPro;
      count.style.display = "block";
      submit.innerHTML = "Create";
      mod = "create";
    }
    clearData();
  }
  //save local storage
  window.localStorage.setItem("product", JSON.stringify(dataProduct));

  showData();
};
//clear input
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//read
function showData() {
  getTotal();
  let tabel = "";
  for (let i = 0; i < dataProduct.length; i++) {
    tabel += `<tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="deletes">Delete</button></td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = tabel;
  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();
//delete
function deleteData(index) {
  dataProduct.splice(index, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
//deleteAll
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}
//update
function updateData(index) {
  title.value = dataProduct[index].title;
  price.value = dataProduct[index].price;
  taxes.value = dataProduct[index].taxes;
  ads.value = dataProduct[index].ads;
  discount.value = dataProduct[index].discount;
  category.value = dataProduct[index].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mod = "update";
  tmp = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchMood = "title";
function getsearchMod(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let tabel = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        tabel += `<tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="deletes">Delete</button></td>
  </tr>`;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        tabel += `<tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">Update</button></td>
    <td><button onclick="deleteData(${i})" id="deletes">Delete</button></td>
  </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = tabel;
}

/// <reference types="../@types/jquery" />

const myRow = document.querySelector(".RowData");

//change between modes
function changeMode() {
  const mode = document.querySelector(".mode");
  document.body.classList.toggle("darkMode");
  if (document.body.classList.contains("darkMode")) {
    mode.classList.replace("fa-sun", "fa-moon");
  } else {
    mode.classList.replace("fa-moon", "fa-sun");
  }
}

$(() => {
  getMeal("").then(() => {
    $(".loadingScreen").fadeOut(300);
    $("body").css("overflow", "visible");
  });
});

//open side bar
function openNav() {
  $(".sideBar").animate({ width: 250 }, 1000);
  $(".openBtn").addClass("d-none");
  $(".closeBtn").removeClass("d-none");
  // animation on links
  for (let i = 0; i < 5; i++) {
    $(".menu li")
      .eq(i)
      .animate({ top: 0, left: 0 }, (i + 5) * 100);
  }
}

//close side bar
function closeNav() {
  $(".sideBar").animate({ width: 0 }, 500);
  $(".closeBtn").addClass("d-none");
  $(".openBtn").removeClass("d-none");
  $(".menu li").animate({ top: 300, left: -100 }, 500);
}
closeNav();

function openSearchPage() {
  let data = `<div class="row g-4">
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              oninput="searchByName(this.value)"
              type="search"
              class="form-control bg-transparent sName"
              id="floatingInput"
              placeholder="search"
              width="100"
            />
            <label for="floatingInput">Search By Name</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating">
            <input
              oninput="searchByFirstLetter(this.value)"
              type="search"
              class="form-control bg-transparent sLitter "
              id="floatingPassword"
              maxlength="1"
              placeholder="Search By First Letter"
            />
            <label for="floatingPassword">Search By First Letter</label>
          </div>
        </div>
      </div>`;
  $(".search").html(data);
  myRow.innerHTML = "";
  $(".secContact").addClass("d-none");
}

async function searchByName(name) {
  $(".loadingScreen").removeClass("d-none");
  $(".secContact").addClass("d-none");

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const data = await response.json();
  const finalRes = data.meals;
  finalRes ? displayMeal(finalRes) : displayMeal([]);
  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

async function searchByFirstLetter(letter) {
  $(".loadingScreen").removeClass("d-none");
  $(".secContact").addClass("d-none");

  letter == "" ? (term = "p") : "";
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );

  const data = await response.json();
  const finalRes = data.meals;
  displayMeal(finalRes);

  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

//api
function getMealApi() {
  return `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
}

async function getMeal() {
  $(".loadingScreen").removeClass("d-none");
  const response = await fetch(getMealApi());
  const data = await response.json();
  const finalRes = data.meals;
  displayMeal(finalRes);
  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

function displayMeal(data) {
  let meal = "";
  for (let i = 0; i < data.length; i++) {
    meal += ` 
    <div class="col-md-6 col-lg-3">
        <div class="meal position-relative overflow-hidden rounded-3" onclick=getMealDetaialApi('${data[i].idMeal}')>
            <img src="${data[i].strMealThumb}" alt="meal" class="img-fluid" />
            <div class="layer position-absolute d-flex align-items-center">
                <h4 class="p-2">${data[i].strMeal}</h4>
            </div>
        </div>
    </div>`;
  }
  myRow.innerHTML = meal;
}

async function getCategory() {
  $(".loadingScreen").removeClass("d-none");
  $(".search").html("");
  $(".secContact").addClass("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const data = await response.json();
  const finalRes = data.categories;
  displayCategory(finalRes);
  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

function displayCategory(data) {
  let meal = "";
  for (let i = 0; i < data.length; i++) {
    meal += ` 
    <div class="col-md-6 col-lg-3">
        <div onclick=getCategoryDetaileApi('${
          data[i].strCategory
        }') class="meal position-relative overflow-hidden rounded-3">
            <img src="${
              data[i].strCategoryThumb
            }" alt="meal" class="img-fluid" />
            <div class="layer position-absolute  text-center">
                <h2 class="p-2">${data[i].strCategory}</h2>
                <p>${data[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 15)
                  .join(" ")}</p>
            </div>
        </div>
    </div>`;
  }
  myRow.innerHTML = meal;
}

async function getArea() {
  $(".loadingScreen").removeClass("d-none");
  $(".search").html("");
  $(".secContact").addClass("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const data = await response.json();
  const finalRes = data.meals;
  displayArea(finalRes);
  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

function displayArea(data) {
  let meal = "";
  for (let i = 0; i < data.length; i++) {
    meal += ` 
    <div class="col-md-6 col-lg-3">
        <div onclick="getAreaDetaileApi('${data[i].strArea}')" class="text-center" role="button">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h2 class="p-2">${data[i].strArea}</h2>
        </div>
    </div>`;
  }
  myRow.innerHTML = meal;
}

async function getIngred() {
  $(".loadingScreen").removeClass("d-none");
  $(".search").html("");
  $(".secContact").addClass("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const data = await response.json();
  const finalRes = data.meals;
  displayIngred(finalRes.slice(0, 20));
  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

function displayIngred(data) {
  let meal = "";
  for (let i = 0; i < data.length; i++) {
    meal += ` 
    <div class="col-md-6 col-lg-3">
        <div class="text-center h-100" role="button" onclick=getIngDetaileApi('${
          data[i].strIngredient
        }')>
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h2 class="p-2">${data[i].strIngredient}</h2>
            <p>${data[i].strDescription
              .split(" ")
              .slice(0, 20)
              .join(" ")}</p>                  
        </div>
    </div>`;
  }
  myRow.innerHTML = meal;
}

// ?  ------------------Details------------------

async function getCategoryDetaileApi(category) {
  $(".loadingScreen").removeClass("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await response.json();
  const finalRes = data.meals;
  displayMeal(finalRes.slice(0, 20));
  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

async function getAreaDetaileApi(area) {
  $(".loadingScreen").removeClass("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const data = await response.json();
  const finalRes = data.meals;
  displayMeal(finalRes.slice(0, 20));
  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

async function getIngDetaileApi(ingred) {
  $(".loadingScreen").removeClass("d-none");
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`
  );
  const data = await response.json();
  const finalRes = data.meals;
  displayMeal(finalRes.slice(0, 20));
  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

async function getMealDetaialApi(id) {
  $(".loadingScreen").removeClass("d-none");
  $(".search").html("");
  $(".secContact").addClass("d-none");

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  const finalRes = data.meals[0];
  displayMealDetaial(finalRes);
  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

function displayMealDetaial(data) {
  $(".search").html("");
  $(".secContact").addClass("d-none");

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        data[`strMeasure${i}`]
      } ${data[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = data.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let meal = `<div class="col-md-4">
            <h2 class="mb-3">${data.strMeal}</h2>
            <img src="${data.strMealThumb}" alt="meal" class="w-100 rounded-3" />
          </div>

          <div class="col-md-8">
            <h2>Instructions</h2>
            <p>
              ${data.strInstructions}
            </p>
            <h3><span class="fw-bolder">Area: </span>${data.strArea}</h3>
            <h3><span class="fw-bolder">Category: </span>${data.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex flex-wrap g-3">
              ${ingredients}
            </ul>
            <h3>Tags:</h3>
             <ul class="list-unstyled d-flex flex-wrap g-3">
              ${tagsStr}
            </ul>
            <a target="_blank" href="${data.strSource}" class="btn btn-success me-3">Source</a>
            <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`;

  myRow.innerHTML = meal;
}

function openContactPage() {
  $(".loadingScreen").removeClass("d-none");
  $(".secContact").removeClass("d-none");
  myRow.innerHTML = "";
  $(".search").html("");

  $(".loadingScreen").addClass("d-none");
  $("body").css("overflow", "auto");
}

// *  ------------------Validation------------------
const uName = document.getElementById("uName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const age = document.getElementById("age");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");
const btnRegister = document.getElementById("btnRegister");

const regexName =
  /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

const regexEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const regexAge = /^([1-7][0-9]|80)$/;

const regexPhone = /^(02)?01[0125][0-9]{8}$/;

function validation(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");

    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}

function repass() {
  if (validation(repassword, regexPass) && repassword.value == password.value) {
    return true;
  } else {
    return false;
  }
}
function validationInputs() {
  if (
    validation(uName, regexName) &&
    validation(email, regexEmail) &&
    validation(phone, regexPhone) &&
    validation(age, regexAge) &&
    validation(password, regexPass) &&
    repass()
  ) {
    btnRegister.removeAttribute("disabled");
  } else {
    btnRegister.setAttribute("disabled", "true");
  }
}
// !  ------------------Events------------------
$(".mode").on("click", changeMode);
$(".closeBtn").on("click", closeNav);
$(".openBtn").on("click", openNav);
$(".searchBtn").on("click", openSearchPage).on("click", closeNav);
$(".categories").on("click", getCategory).on("click", closeNav);
$(".area").on("click", getArea).on("click", closeNav);
$(".ingredients").on("click", getIngred).on("click", closeNav);
$(".contact").on("click", openContactPage).on("click", closeNav);
$("#uName").on("input", () => {
  validation(uName, regexName);
});
$("#email").on("input", () => {
  validation(email, regexEmail);
});
$("#age").on("input", () => {
  validation(age, regexAge);
});
$("#phone").on("input", () => {
  validation(phone, regexPhone);
});
$("#password").on("input", () => {
  validation(password, regexPass);
});
$("#repassword").on("input", repass);
$("form").on("submit", function (e) {
  e.preventDefault();
  validationInputs();
});
$("form").on("input", validationInputs);

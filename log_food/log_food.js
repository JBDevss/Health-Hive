const searchButton = document.querySelector(".search-btn");
const form = document.querySelector(".search-container");

const API_ENDPOINT = "https://nutritionix-api.p.rapidapi.com/v1_1/search/";
const APP_ID = "nutritionix-api.p.rapidapi.com";
const APP_KEY = "872c4036admsh1c8ccc18d8a0242p1cd2cajsn1740854e141e";

const section2 = document.querySelector(".section2");
const searchResults = document.querySelector(".search-result-list");
const goalCal = document.getElementById("goalCal");
let calorieGoal = parseInt(JSON.parse(localStorage.userData).calorieGoal);
goalCal.innerText = calorieGoal;
const totalCalCount = document.getElementById("totalCalCount");
const remainingCal = document.getElementById("remainingCal");
let totalCal = 0;
let remaining = parseInt(goalCal.innerText);

let localBreakfast = [];
let localLunch = [];
let localDinner = [];
let localSnacks = [];
let localBreakfastCal = 0;
let localLunchCal = 0;
let localDinnerCal = 0;
let localSnacksCal = 0;

render();

function render() {
  // let categories = document.getElementById('meal-select')
  // let selectedCategory = categories.value

  if (JSON.parse(localStorage.getItem("localBreakfast"))) {
    let parsedBreakfast = JSON.parse(localStorage.getItem("localBreakfast"));
    parsedBreakfast.forEach((food) => {
      let item = document.createElement("li");
      item.innerText = food;
      let foodCard = document.getElementById(`breakfast`);
      foodCard.appendChild(item);
      const breakfastCal = document.querySelector('.breakfast-cal')
      let parsedLocalBreakfastCal = JSON.parse(localStorage.getItem('localBreakfastCal'))
      breakfastCal.innerText = `${parsedLocalBreakfastCal} cal`
    });
  } else {
    localStorage.setItem("localBreakfast", JSON.stringify(localBreakfast));
    localStorage.setItem(
      "localBreakfastCal",
      JSON.stringify(localBreakfastCal)
    );
  }

  if (JSON.parse(localStorage.getItem("localLunch"))) {
    console.log("cashed");
    let parsedLunch = JSON.parse(localStorage.getItem("localLunch"));
    parsedLunch.forEach((food) => {
      let item = document.createElement("li");
      item.innerText = food;
      let foodCard = document.getElementById(`lunch`);
      foodCard.appendChild(item);
      const LunchCal = document.querySelector('.lunch-cal')
      let parsedLocalLunchCal = JSON.parse(localStorage.getItem('localLunchCal'))
      LunchCal.innerText = `${parsedLocalLunchCal} cal`
    });
  } else {
    console.log("not cashed");
    localStorage.setItem("localLunch", JSON.stringify(localLunch));
    localStorage.setItem("localLunchCal", JSON.stringify(localLunchCal));
  }

  if (JSON.parse(localStorage.getItem("localDinner"))) {
    let parsedDinner = JSON.parse(localStorage.getItem("localDinner"));
    parsedDinner.forEach((food) => {
      let item = document.createElement("li");
      item.innerText = food;
      let foodCard = document.getElementById(`dinner`);
      foodCard.appendChild(item);
      const DinnerCal = document.querySelector('.dinner-cal')
      let parsedLocalDinnerCal = JSON.parse(localStorage.getItem('localDinnerCal'))
      DinnerCal.innerText = `${parsedLocalDinnerCal} cal`
    });
  } else {
    localStorage.setItem("localDinner", JSON.stringify(localDinner));
    localStorage.setItem("localDinnerCal", JSON.stringify(localDinnerCal));
  }

  if (JSON.parse(localStorage.getItem("localSnacks"))) {
    let parsedSnacks = JSON.parse(localStorage.getItem("localSnacks"));
    parsedSnacks.forEach((food) => {
      let item = document.createElement("li");
      item.innerText = food;
      let foodCard = document.getElementById(`snacks`);
      foodCard.appendChild(item);
      const SnacksCal = document.querySelector('.snacks-cal')
      let parsedLocalSnacksCal = JSON.parse(localStorage.getItem('localSnacksCal'))
      SnacksCal.innerText = `${parsedLocalSnacksCal} cal`
    });
  } else {
    localStorage.setItem("localSnacks", JSON.stringify(localSnacks));
    localStorage.setItem("localSnacksCal", JSON.stringify(localSnacksCal));
  }
}

form.addEventListener("submit", async (e) => {
  searchResults.innerText = "";
  e.preventDefault();
  const searchTerm = e.target[1].value;
  console.log(searchTerm);
  const result = await fetchFoodData(searchTerm);
  // console.log(selectedCategory.value)
  let categories = document.getElementById("meal-select");
  let selectedCategory = categories.value;
  console.log(selectedCategory);
  let foodCard = document.getElementById(`${selectedCategory}`);
  let calCount = 0;
  let cal = document.getElementsByClassName(`${selectedCategory}-cal`);
  console.log(foodCard);
  console.log(result);
  const searchResultTitle = document.createElement("h2");
  searchResultTitle.setAttribute("class", "search-results-title");
  searchResultTitle.innerText = "Best Matches";
  searchResults.append(searchResultTitle);
  result.hits.forEach((element) => {
    const listItem = document.createElement("li");
    const nameWrapper = document.createElement("div");
    const foodName = document.createElement("h4");
    foodName.innerText = `${element.fields.item_name}` + " ";
    nameWrapper.append(foodName);
    const foodDescription = document.createElement("h5");
    foodDescription.innerText = `${element.fields.brand_name}, ${element.fields.nf_calories} cal`;
    nameWrapper.setAttribute("class", "name-wrapper");
    nameWrapper.append(foodDescription);
    listItem.append(nameWrapper);
    const addBtn = document.createElement("img");
    addBtn.src = "../Asset_Pkg/SVG/Add_Button.svg";
    addBtn.setAttribute("class", "add-btn");
    listItem.append(addBtn);
    searchResults.append(listItem);
    addBtn.addEventListener("click", () => {
      switch (selectedCategory) {
        case "breakfast":
          let parsedBreakfast = JSON.parse(localStorage.getItem("localBreakfast"));
          parsedBreakfast.push(listItem.innerText);
          localStorage.setItem("localBreakfast",JSON.stringify(parsedBreakfast));
          let parsedBreakfastCal = JSON.parse(localStorage.getItem("localBreakfastCal"));
          parsedBreakfastCal += parseInt(`${element.fields.nf_calories}`);
          localStorage.setItem("localBreakfastCal",JSON.stringify(parsedBreakfastCal));
          break;
        case "lunch":
          let parsedLunch = JSON.parse(localStorage.getItem("localLunch"));
          parsedLunch.push(listItem.innerText);
          localStorage.setItem("localLunch", JSON.stringify(parsedLunch));
          let parsedLunchCal = JSON.parse(localStorage.getItem("localLunchCal"));
          parsedLunchCal += parseInt(`${element.fields.nf_calories}`);
          localStorage.setItem("localLunchCal",JSON.stringify(parsedLunchCal));
          break;
        case "dinner":
          let parsedDinner = JSON.parse(localStorage.getItem("localDinner"));
          parsedDinner.push(listItem.innerText);
          localStorage.setItem("localDinner", JSON.stringify(parsedDinner));
          let parsedDinnerCal = JSON.parse(localStorage.getItem("localDinnerCal"));
          parsedDinnerCal += parseInt(`${element.fields.nf_calories}`);
          localStorage.setItem("localDinnerCal",JSON.stringify(parsedDinnerCal));
          break;
        case "snacks":
          let parsedSnacks = JSON.parse(localStorage.getItem("localSnacks"));
          parsedSnacks.push(listItem.innerText);
          localStorage.setItem("localSnacks", JSON.stringify(parsedSnacks));
          let parsedSnacksCal = JSON.parse(localStorage.getItem("localSnacksCal"));
          parsedSnacksCal += parseInt(`${element.fields.nf_calories}`);
          localStorage.setItem("localSnacksCal",JSON.stringify(parsedSnacksCal));
          break;
      }
      let item = document.createElement("li");
      item.innerText = listItem.innerText;
      let foodCard = document.getElementById(`${selectedCategory}`);
      foodCard.appendChild(item);
      // foodCard.append(listItem);
      // listItem.style.padding = "0px"
      totalCal += parseInt(`${element.fields.nf_calories}`);
      totalCalCount.innerText = `${totalCal}`;
      remaining -= parseInt(`${element.fields.nf_calories}`);
      remainingCal.innerText = `${remaining}`;
      console.log(cal[0].innerText);
      calCount += parseInt(`${element.fields.nf_calories}`);
      console.log(parseInt(`${element.fields.nf_calories}`));
      cal[0].innerText = `${calCount} cal`;
    });
  });
});

async function fetchFoodData(searchTerm) {
  const url = `${API_ENDPOINT}${searchTerm}?fields=item_name%2Cbrand_name%2Cnf_calories%2`;
  const headers = {
    "x-rapidapi-key": "872c4036admsh1c8ccc18d8a0242p1cd2cajsn1740854e141e",
    "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

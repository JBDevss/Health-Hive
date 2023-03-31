const searchButton = document.querySelector('.search-btn');
const form = document.querySelector('.search-container')

const API_ENDPOINT = 'https://nutritionix-api.p.rapidapi.com/v1_1/search/';
const APP_ID = 'nutritionix-api.p.rapidapi.com';
const APP_KEY = '872c4036admsh1c8ccc18d8a0242p1cd2cajsn1740854e141e';


const section2 = document.querySelector('.section2')
const searchResults = document.querySelector('.search-result-list')
const goalCal = document.getElementById('goalCal')
const totalCalCount = document.getElementById('totalCalCount')
const remainingCal = document.getElementById('remainingCal')
let totalCal = 0;
let remaining = parseInt(goalCal.innerText);

form.addEventListener('submit', async (e) => {
    searchResults.innerText = '';
    e.preventDefault()
    const searchTerm = e.target[1].value;
    console.log(searchTerm)
    const result = await fetchFoodData(searchTerm);
    // console.log(selectedCategory.value)
    let categories = document.getElementById('meal-select')
    let selectedCategory = categories.value
    console.log(selectedCategory)
    let foodCard = document.getElementById(`${selectedCategory}`)
    let calCount = 0;
    let cal = document.getElementsByClassName(`${selectedCategory}-cal`)
    console.log(foodCard)
    console.log(result);
    const searchResultTitle = document.createElement('h2')
    searchResultTitle.setAttribute("class", "search-results-title")
    searchResultTitle.innerText = 'Best Matches'
    searchResults.append(searchResultTitle)
    result.hits.forEach(element => {
        const listItem = document.createElement('li');
        const nameWrapper = document.createElement('div');
        const foodName = document.createElement('h4');
        foodName.innerText = `${element.fields.item_name}` + ' ';
        nameWrapper.append(foodName);
        const foodDescription = document.createElement('h5')
        foodDescription.innerText = `${element.fields.brand_name}, ${element.fields.nf_calories} cal`
        nameWrapper.setAttribute('class', 'name-wrapper')
        nameWrapper.append(foodDescription);
        listItem.append(nameWrapper);
        const addBtn = document.createElement('img');
        addBtn.src ="../Asset_Pkg/SVG/Add_Button.svg"
        addBtn.setAttribute("class", "add-btn")
        listItem.append(addBtn);
        searchResults.append(listItem);
            addBtn.addEventListener('click', () => {
            //const foodCard = document.getElementsByClassName(`${e.target[0].value}`)
            foodCard.append(listItem);
            listItem.style.padding = "0px"
            totalCal += parseInt(`${element.fields.nf_calories}`)
            totalCalCount.innerText = `${totalCal} cal`
            remaining -= parseInt(`${element.fields.nf_calories}`)
            remainingCal.innerText = `${remaining} cal`
            console.log(cal[0].innerText)
            calCount += parseInt(`${element.fields.nf_calories}`);
            console.log (parseInt(`${element.fields.nf_calories}`))
            cal[0].innerText = `${calCount} cal`

            
        });
    });
})

async function fetchFoodData(searchTerm) {
    const url = `${API_ENDPOINT}${searchTerm}?fields=item_name%2Cbrand_name%2Cnf_calories%2`;
    const headers = {
      "x-rapidapi-key": "872c4036admsh1c8ccc18d8a0242p1cd2cajsn1740854e141e",
      "x-rapidapi-host": "nutritionix-api.p.rapidapi.com"
    };
  
    try {
      const response = await fetch(url, { headers });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
}



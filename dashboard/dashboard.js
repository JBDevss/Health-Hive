const submitBtn = document.getElementById('submit-btn');
const muscleSelect = document.getElementById('target-muscle-select');
const equipmentSelect = document.getElementById('equipment-select');
const muscleGroupText = document.getElementById('muscle-group-text');
const equipText = document.getElementById('equip-text');

const exercisesDBOption = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ba47d36648msh5662494c40029c5p14a61fjsn99e9e90466eb',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

submitBtn.addEventListener('click', async function(e) {
    e.preventDefault();
    const exerciseResults = document.getElementById('exercise-results');

    exerciseResults.textContent = "";

    const selectedEquip = equipmentSelect.value;
    const selectedMuscle = muscleSelect.value;
    muscleGroupText.textContent = selectedMuscle;
    const exercisedbURL = `https://exercisedb.p.rapidapi.com/exercises/target/${selectedMuscle}`;
    const exercisedbData = await fetchData(exercisedbURL, exercisesDBOption);

    const filteredData = exercisedbData.filter(obj => {
        if (selectedEquip !== "") {
            equipText.textContent = ` with ${selectedEquip}`;
            return obj.equipment.toLowerCase() === selectedEquip.toLowerCase();
        }
        return true;
    }).slice(0, 12).forEach(exercise => {
        const col = document.createElement('div');
        col.classList.add('col-lg-3', 'col-md-4', 'mb-4'); // Change col-md-3 to col-lg-2 and col-md-4

        const card = document.createElement('div');
        card.classList.add('card', 'position-relative');

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.setAttribute('src', exercise.gifUrl);
        img.setAttribute('alt', exercise.name);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = exercise.name;

        const iconButton = document.createElement('img');
        iconButton.classList.add('icon-button');
        iconButton.setAttribute('src', '../Asset_Pkg/SVG/Add_Button.svg');
        iconButton.style.width = '30px';
        iconButton.style.padding = '1px';

        cardBody.appendChild(h5);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(iconButton);
        col.appendChild(card);
        exerciseResults.appendChild(col);
    });
});


const submitBtn = document.getElementById('submit-btn');
const muscleSelect = document.getElementById('target-muscle-select');
const muscleGroupText = document.getElementById('muscle-group-text');

// ExercisesDB API
const exercisesDBOption = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ba47d36648msh5662494c40029c5p14a61fjsn99e9e90466eb',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

// Helper fetching data
const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

submitBtn.addEventListener('click', async function(e) {
    e.preventDefault();
    const exerciseResults = document.getElementById('exercise-results');

    exerciseResults.textContent = "";

    const selectedMuscle = muscleSelect.value;
    muscleGroupText.textContent = selectedMuscle;
    const exercisedbURL = `https://exercisedb.p.rapidapi.com/exercises/target/${selectedMuscle}`;
    const exercisedbData = await fetchData(exercisedbURL, exercisesDBOption);
    exercisedbData.slice(0, 6).forEach(exercise => {
        const article = document.createElement('article');
        const div = document.createElement('div');
        const h1 = document.createElement('h1');
        const img = document.createElement('img');

        h1.textContent = exercise.name;

        img.setAttribute('src', exercise.gifUrl);
        
        div.appendChild(h1);
        div.appendChild(img);
        article.appendChild(div);
        exerciseResults.appendChild(article);
    });
});

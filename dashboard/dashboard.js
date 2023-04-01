const submitBtn = document.getElementById("submit-btn");
const muscleSelect = document.getElementById("target-muscle-select");
const equipmentSelect = document.getElementById("equipment-select");
const muscleGroupText = document.getElementById("muscle-group-text");
const equipText = document.getElementById("equip-text");

const exercisesDBOption = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "872c4036admsh1c8ccc18d8a0242p1cd2cajsn1740854e141e",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const fetchData = async (url, options) => {
  const cacheKey = `cache_${url}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    const response = await fetch(url, options);
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  }
};

submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const exerciseResults = document.getElementById("exercise-results");

  exerciseResults.textContent = "";

  const selectedEquip = equipmentSelect.value;
  const selectedMuscle = muscleSelect.value;
  muscleGroupText.textContent = selectedMuscle;
  const exercisedbURL = `https://exercisedb.p.rapidapi.com/exercises/target/${selectedMuscle}`;
  const exercisedbData = await fetchData(exercisedbURL, exercisesDBOption);

  const filteredData = exercisedbData
    .filter((obj) => {
      if (selectedEquip !== "") {
        equipText.textContent = ` with ${selectedEquip}`;
        return obj.equipment.toLowerCase() === selectedEquip.toLowerCase();
      }
      return true;
    })
    .slice(0, 12)
    .forEach((exercise) => {
      const col = document.createElement("div");
      col.classList.add("col-lg-3", "col-md-4", "mb-4");

      const card = document.createElement("div");
      card.classList.add("card", "position-relative");

      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.setAttribute("src", exercise.gifUrl);
      img.setAttribute("alt", exercise.name);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.textContent = exercise.name;

      const iconButton = document.createElement("img");
      iconButton.classList.add("icon-button");
      iconButton.setAttribute("src", "../Asset_Pkg/SVG/Add_Button.svg");
      iconButton.style.width = "30px";
      iconButton.style.padding = "1px";

      iconButton.addEventListener("click", function () {
        function getSelectedDay() {
          const selectedDayIndex = document.getElementById("day-select").value;
          return days[selectedDayIndex];
        }
        const selectedDay = getSelectedDay();
        
        console.log(selectedDay);
        const modal = new bootstrap.Modal(
          document.getElementById("exerciseModal")
        );
        modal.show();
        const addExerciseBtn = document.getElementById("addExercise");

        addExerciseBtn.onclick = function () {
          const sets = document.getElementById("setsInput").value;
          const reps = document.getElementById("repsInput").value;
          const selectedDay = getSelectedDay();
          console.log("Selected day:", selectedDay); // Add this line
          const exerciseElem = document.createElement("p");
          exerciseElem.textContent = `${exercise.name} - ${sets} sets x ${reps} reps`;

          const removeButton = document.createElement("button");
          removeButton.classList.add("remove-btn");
          removeButton.textContent = "X";
          removeButton.style.marginLeft = "10px";

          exerciseElem.appendChild(removeButton);

          removeButton.addEventListener("click", function () {
            document.getElementById(selectedDay).removeChild(exerciseElem);
            displayTodaysWorkout();
          });

          document.getElementById(selectedDay).appendChild(exerciseElem);

          exerciseResults.removeChild(col);

          modal.hide();
          displayTodaysWorkout();
        };
      });

      col.appendChild(card);
      exerciseResults.appendChild(col);
      cardBody.appendChild(h5);
      card.appendChild(img);
      card.appendChild(cardBody);
      card.appendChild(iconButton);
      col.appendChild(card);
      exerciseResults.appendChild(col);
    });
});

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const saveWorkoutData = () => {
  const workoutData = days.reduce((accumulator, day) => {
    const dayContainer = document.getElementById(day);
    accumulator[day] = Array.from(dayContainer.childNodes)
      .slice(1)
      .map((exercise) => exercise.textContent);
    return accumulator;
  }, {});

  localStorage.setItem('workoutData', JSON.stringify(workoutData));
};

const loadWorkoutData = () => {
  const workoutData = JSON.parse(localStorage.getItem('workoutData'));

  if (workoutData) {
    days.forEach((day) => {
      const dayContainer = document.getElementById(day);
      workoutData[day].forEach((exerciseText) => {
        const exerciseElem = document.createElement('p');
        exerciseElem.textContent = exerciseText;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'X';
        removeButton.style.marginLeft = '10px';

        exerciseElem.appendChild(removeButton);

        removeButton.addEventListener('click', function () {
          dayContainer.removeChild(exerciseElem);
          displayTodaysWorkout();
        });

        dayContainer.appendChild(exerciseElem);
      });
    });
  }
};

const displayTodaysWorkout = () => {
  const todaysWorkoutContainer = document.querySelector(".todays-workout");
  todaysWorkoutContainer.innerHTML = "";
  const currentDayIndex = new Date().getDay(); // Use the correct index
  const currentDay = days[currentDayIndex];
  const currentDayContainer = document.getElementById(currentDay);

  // Create a function to display the current day as text

  Array.from(currentDayContainer.childNodes)
    .slice(1) // Start from the second element
    .forEach((exercise, index) => {
      if (exercise.nodeType === Node.ELEMENT_NODE) {
        const exerciseClone = exercise.cloneNode(true);

        const removeButton = exerciseClone.querySelector("button");
        if (removeButton) {
          exerciseClone.removeChild(removeButton);
        }

        if (index !== 0) {
          // Skip adding checkbox for the first exercise
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.style.marginRight = "10px";

          exerciseClone.insertBefore(checkbox, exerciseClone.firstChild);
        }

        todaysWorkoutContainer.appendChild(exerciseClone);
      }
    });
    saveWorkoutData();
};



const apiKey = '2b6772c566b81b4705e9cb91adfd8e6125df3d9c6b8740184b328e71f4e55e964';
const url = 'https://api.medium.com/v1/search';

async function getFitnessArticles() {
  try {
    const response = await fetch(`${url}?q=fitness&fields=title&limit=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    });
    const data = await response.json();
    const articles = data.data.filter(article => {
      const title = article.title.toLowerCase();
      const tags = article.virtuals.tags.map(tag => tag.name.toLowerCase());
      return (
        title.includes('fitness') ||
        title.includes('health') ||
        title.includes('workout') ||
        title.includes('exercise') ||
        tags.includes('fitness') ||
        tags.includes('health') ||
        tags.includes('workout') ||
        tags.includes('exercise') ||
        tags.includes('diet plans')
      );
    });
    const sortedArticles = articles
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    const articleDetails = sortedArticles.map(article => {
      return {
        title: article.title,
        description: article.description,
        thumbnail: article.virtuals.previewImage.imageId ? `https://miro.medium.com/fit/c/100/100/${article.virtuals.previewImage.imageId}` : ''
      };
    });
    console.log(articleDetails);
  } catch (error) {
    console.log(error);
  }
}

getFitnessArticles();





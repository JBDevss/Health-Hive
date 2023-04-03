const form = document.getElementById('free-trial');

const userData = {}

form.addEventListener('submit', e => {
    e.preventDefault();
    const firstName = e.target[0].value; // First name
    const lastName = e.target[1].value; // Last name
    const calorieGoal = e.target[2].value; // Calorie goal

    // Regular expression to match only letters for the first name and last name input fields
    const lettersOnlyRegex = /^[A-Za-z]+$/;

    // Regular expression to match only numbers for the calorie goal input field
    const numbersOnlyRegex = /^[0-9]+$/;
    
    if (!firstName || !lastName || !calorieGoal) {
        // Display an error message to the user if any field is empty
        alert("Please fill in all fields!");
        return;
    }

    if (!firstName.match(lettersOnlyRegex)) {
        // Display an error message to the user if the first name contains non-letter characters
        alert("Please enter a valid first name!");
        return;
    }

    if (!lastName.match(lettersOnlyRegex)) {
        // Display an error message to the user if the last name contains non-letter characters
        alert("Please enter a valid last name!");
        return;
    }

    if (!calorieGoal.match(numbersOnlyRegex)) {
        // Display an error message to the user if the calorie goal contains non-number characters
        alert("Please enter a valid calorie goal!");
        return;
    }

    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.calorieGoal = calorieGoal;
    window.localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect the user to a new page
   window.location.href ="https://jbdevss.github.io/Health-Hive/dashboard/dashboard.html";
});

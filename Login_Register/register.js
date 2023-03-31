// const firstName = document.querySelector('.first').value;
// const lastName = document.querySelector('.last').value;
// const goalCal = document.querySelector('.goal-cal').value;
// const submitBtn = document.querySelector('.submit0btn').value;
const form = document.getElementById('free-trial');

const userData = {}

form.addEventListener('submit', e => {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const calorieGoal = e.target[2].value;
    // console.log(firstName, lastName, calorieGoal);
    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.calorieGoal = calorieGoal;
    window.localStorage.setItem('userData', JSON.stringify(userData));
});


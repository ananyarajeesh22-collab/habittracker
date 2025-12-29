const habitForm = document.getElementById('habit-form');
const habitInput = document.getElementById('habit-input');
const habitList = document.getElementById('habit-list');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        const habitItem = document.createElement('li');
        habitItem.classList.add('habit-item');
        if (habit.completed) {
            habitItem.classList.add('completed');
        }

        const habitText = document.createElement('span');
        habitText.textContent = habit.name;
        habitText.addEventListener('click', () => {
            toggleComplete(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteHabit(index);
        });

        habitItem.appendChild(habitText);
        habitItem.appendChild(deleteButton);
        habitList.appendChild(habitItem);
    });
}

function addHabit(event) {
    event.preventDefault();
    const habitName = habitInput.value.trim();
    if (habitName) {
        habits.push({ name: habitName, completed: false });
        habitInput.value = '';
        saveAndRender();
    }
}

function toggleComplete(index) {
    habits[index].completed = !habits[index].completed;
    saveAndRender();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

habitForm.addEventListener('submit', addHabit);

renderHabits();
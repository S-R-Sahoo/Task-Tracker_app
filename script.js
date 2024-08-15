document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const taskDate = document.getElementById('taskDate').value;

    if (taskText === '' || taskDate === '') {
        alert('Please enter a task and select a date');
        return;
    }

    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.className = 'task';
    li.dataset.date = taskDate;

    const taskSpan = document.createElement('span');
    taskSpan.textContent = `${taskDate}: ${taskText}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'editBtn';
    editBtn.addEventListener('click', function () {
        editTask(taskSpan, li);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.addEventListener('click', function () {
        deleteTask(li);
    });

    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    // Clear the input fields after adding the task
    taskInput.value = '';
    document.getElementById('taskDate').value = '';

    // Update the calendar with the new task
    updateCalendar(taskDate);
}

function editTask(taskSpan, taskElement) {
    const newTaskText = prompt('Edit your task:', taskSpan.textContent.split(': ')[1]);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskSpan.textContent = `${taskElement.dataset.date}: ${newTaskText}`;
    }
}

function deleteTask(taskElement) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskElement.remove();
    }
}

function updateCalendar(taskDate) {
    const calendar = document.getElementById('calendar');
    const taskElements = document.querySelectorAll(`li[data-date="${taskDate}"]`);

    // Clear the existing calendar
    calendar.innerHTML = '';

    // Create a calendar entry for the date if tasks exist for that date
    if (taskElements.length > 0) {
        const calendarDate = document.createElement('div');
        calendarDate.className = 'calendar-date';
        calendarDate.textContent = taskDate;

        const taskList = document.createElement('ul');
        taskList.className = 'calendar-task-list';

        taskElements.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.querySelector('span').textContent.split(': ')[1];
            taskList.appendChild(taskItem);
        });

        calendarDate.appendChild(taskList);
        calendar.appendChild(calendarDate);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const taskListItems = document.querySelectorAll('#taskList li');
    taskListItems.forEach(task => {
        updateCalendar(task.dataset.date);
    });
});


const readlineSync = require('readline-sync');

function Task(taskNumber, description, dueDate, priority) {
  this.taskNumber = taskNumber;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.status = "incomplete";
}

function todoApp() {
  let tasks = [];

  const menu = `
    ***************************
    Welcome to JS TODO-APP
    ***************************
    Select an action:
    1) Add a new task
    2) List all tasks
    3) List completed tasks
    4) Mark a task as done
    5) Delete a task
    6) Sort tasks by due date
    7) Sort tasks by priority
    8) Clear all tasks
    9) Exit
  `;

  console.log(menu);

  while (true) {
    const input = readlineSync.question("Enter your choice: ");
    handleUserInput(input);
  }

  function handleUserInput(input) {
    switch (input) {
      case '1':
        addTask();
        break;
      case '2':
        if (tasks.length === 0) {
          console.log("No tasks to show");
        } else {
          listAllTasks();
        }
        console.log(menu);
        break;
      case '3':
        if (tasks.length === 0) {
          console.log("No tasks to show");
        } else {
          listCompletedTasks();
        }
        console.log(menu);
        break;
      case '4':
        if (tasks.length === 0) {
          console.log("No tasks available to mark as done");
        } else {
          markTaskAsDone();
        }
        console.log(menu);
        break;
      case '5':
        if (tasks.length === 0) {
          console.log("No tasks available to delete");
        } else {
          deleteTask();
        }
        console.log(menu);
        break;
      case '6':
        if (tasks.length === 0) {
          console.log("No tasks available to sort");
        } else {
          sortTasksByDueDate();
        }
        console.log(menu);
        break;
      case '7':
        if (tasks.length === 0) {
          console.log("No tasks available to sort");
        } else {
          sortTasksByPriority();
        }
        console.log(menu);
        break;
      case '8':
        if (tasks.length === 0) {
          console.log("No tasks available to clear");
        } else {
          clearAllTasks();
        }
        console.log(menu);
        break;
      case '9':
        process.exit(0);
      default:
        console.log("Invalid input, please try again");
        console.log(menu);
        break;
    }
  }

  function addTask() {
    console.log("Add a new task");
    const taskNumber = readlineSync.question("Task number: ");
    if (!isNaN(taskNumber) && taskNumber > 0) {
      const existingTask = tasks.find(task => task.taskNumber === Number(taskNumber));
      if (existingTask) {
        const answer = readlineSync.question("A task with the same task number already exists. Do you want to add it again? (y/n): ");
        if (answer.toLowerCase() !== 'y') {
          console.log("Task not added");
          console.log(menu);
          return;
        }
      }
      const description = readlineSync.question("Task description: ");
      const dueDate = readlineSync.question("Due date (DD/MM/YYYY): ");
      if (isValidDate(dueDate)) {
        const priority = readlineSync.question("Priority level: ");
        if (!isNaN(priority)) {
          const task = new Task(Number(taskNumber), description, dueDate, Number(priority));
          tasks.push(task);
          console.log("Task added successfully");
        } else {
          console.log("Invalid priority level. Priority should be a number.");
        }
      } else {
        console.log("Invalid due date format. Please enter the date in the format DD/MM/YYYY.");
      }
    } else {
      console.log("Invalid task number. Task number should be a positive number.");
    }
    console.log(menu);
  }

  function listAllTasks() {
    console.log("List all tasks");
    tasks.forEach((task, index) => {
      console.log(`Task ${task.taskNumber}: ${task.description} - ${task.dueDate} - ${task.priority} - ${task.status}`);
    });
  }

  function listCompletedTasks() {
    console.log("List completed tasks");
    tasks.forEach((task, index) => {
      if (task.status === "complete") {
        console.log(`Task ${task.taskNumber}: ${task.description} - ${task.dueDate} - ${task.priority} - ${task.status}`);
      }
    });
  }

  function markTaskAsDone() {
    console.log("Mark a task as done");
    const taskNumber = readlineSync.question("Task number: ");
    const task = tasks.find(task => task.taskNumber === Number(taskNumber));
    if (task) {
      task.status = "complete";
      console.log("Task marked as done successfully");
    } else {
      console.log("Invalid task number");
    }
  }

  function deleteTask() {
    console.log("Delete a task");
    const taskNumber = readlineSync.question("Task number: ");
    const index = tasks.findIndex(task => task.taskNumber === Number(taskNumber));
    if (index !== -1) {
      tasks.splice(index, 1);
      console.log("Task deleted successfully");
    } else {
      console.log("Invalid task number");
    }
  }

  function sortTasksByDueDate() {
    console.log("Sort tasks by due date");
    tasks.sort(function(a, b) {
      const dateA = getDateObject(a.dueDate);
      const dateB = getDateObject(b.dueDate);
      return dateA.getTime() - dateB.getTime();
    });
    console.log("Tasks sorted successfully");
    listAllTasks();
    console.log(menu);
  }

  function sortTasksByPriority() {
    console.log("Sort tasks by priority");
    tasks.sort(function(a, b) {
      return a.priority - b.priority;
    });
    console.log("Tasks sorted successfully");
    listAllTasks();
    console.log(menu);
  }

  function clearAllTasks() {
    console.log("Clear all tasks");
    tasks = [];
    console.log("Tasks cleared successfully");
    console.log(menu);
  }

  function isValidDate(dateString) {
    const pattern = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
    return pattern.test(dateString);
  }

  function getDateObject(dateString) {
    const dateParts = dateString.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    return new Date(year, month - 1, day);
  }
}

todoApp();

let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let search = document.getElementById("search");
let totalTasks = document.getElementById("totalTasks");

// Load tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div class="actions">
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  totalTasks.innerText = tasks.length + " Tasks";
}

// Add task
addBtn.onclick = () => {
  if (taskInput.value === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({
    text: taskInput.value,
    completed: false
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  loadTasks();
};

// Delete
function deleteTask(i) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// Edit
function editTask(i) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let newTask = prompt("Edit task:", tasks[i].text);
  if (newTask) {
    tasks[i].text = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

// Complete
function toggleComplete(i) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[i].completed = !tasks[i].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// Search
search.addEventListener("keyup", () => {
  let filter = search.value.toLowerCase();
  let items = document.querySelectorAll("li");

  items.forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(filter)
      ? "flex"
      : "none";
  });
});

// Dark mode
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

loadTasks();

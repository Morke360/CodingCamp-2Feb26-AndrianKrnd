// ambil elemen dari HTML
const todoForm = document.getElementById("todoForm");
const todoText = document.getElementById("todoText");
const todoDate = document.getElementById("todoDate");
const todoList = document.getElementById("todoList");
const filterDate = document.getElementById("filterDate");
const clearFilter = document.getElementById("clearFilter");

// data to-do (sementara, tanpa database)
let todos = [];

/*FORM SUBMIT (ADD TODO)*/
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // VALIDASI INPUT
  if (todoText.value.trim() === "" || todoDate.value === "") {
    alert("Please fill in both To-Do and Date.");
    return;
  }

  // buat object todo
  const todo = {
    id: Date.now(),
    text: todoText.value,
    date: todoDate.value
  };

  todos.push(todo);
  renderTodos(todos);

  // reset input
  todoText.value = "";
  todoDate.value = "";
});

/* RENDER TODO LIST */
function renderTodos(list) {
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = "<li>No to-do found.</li>";
    return;
  }

  list.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${formatTanggal(todo.date)} - ${todo.text}</span>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;

    todoList.appendChild(li);
  });
}

/* DELETE TODO */
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(todos);
}

/* FILTER TODO BY DATE */
filterDate.addEventListener("change", function () {
  const selectedDate = filterDate.value;

  if (selectedDate === "") {
    renderTodos(todos);
    return;
  }

  const filteredTodos = todos.filter(todo => todo.date === selectedDate);
  renderTodos(filteredTodos);
});

/* CLEAR FILTER */
clearFilter.addEventListener("click", function () {
  filterDate.value = "";
  renderTodos(todos);
});

function formatTanggal(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

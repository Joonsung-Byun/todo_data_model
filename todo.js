let todos = [
  {
    todo_name: "homework", // string data type
    todo_complete: false, // boolean data type
    todo_id: 1, // number data type
    todo_category: "school", // string data type
    todo_due_date: "2024-09-01", // date data type
  }, // object data type
  {
    todo_name: "grocery shopping", // string data type
    todo_complete: false, // boolean data type
    todo_id: 2, // number data type
    todo_category: "chores", // string data type
    todo_due_date: "2024-09-03", // date data type
  }, // object data type
]; // array data type

// DOM elements
const todo_list = document.querySelector("#todo_list");

// complete todo and mark it as done
function completeTodo(event, el) {
  event.stopPropagation();
  let clickedTodoId = el.dataset.todoid;
  toggleTodo(clickedTodoId);
  renderTodos(todos);
}

function toggleTodo(clickedTodoId) {
  let clickedTodo = todos.find((todo) => todo.todo_id == clickedTodoId);
  clickedTodo.todo_complete = !clickedTodo.todo_complete;
}

function deleteTodo(event, el) {
  event.stopPropagation();
  let clickedTodoId = el.dataset.todoid;
  todos = todos.filter((todo) => todo.todo_id != clickedTodoId);
  renderTodos(todos);
}

function addTodo() {
  let todo_input = document.querySelector("#todo_name").value;
  let selectedCategory = document.querySelector("#categorySelect").value;
  let dueDate = document.querySelector("#due_date").value;
  todos.push(newTodoObj(todo_input, selectedCategory, dueDate));
  renderTodos(todos);
}

function newTodoObj(todoName, todoCategory, todoDueDate) {
  return {
    todo_name: todoName,
    todo_complete: false,
    todo_id: todos.length + 1,
    todo_category: todoCategory,
    todo_due_date: todoDueDate,
  };
}

function renderTodos(todos) {
  //reset the list
  todo_list.innerHTML = "";

  //loop through the todos
  todos.forEach((todo, index) => {
    let done = todo.todo_complete ? "done" : "";
    let newTodo = `
      <div data-todoid=${todo.todo_id}>
        <li class="${done}" data-todoid=${todo.todo_id} onclick="completeTodo(event, this)">
          ${todo.todo_name}
        </li>
        <span data-todoid=${todo.todo_id} onclick="deleteTodo(event, this)">🗑️</span>
        <span data-todoid=${todo.todo_id} onclick="openModal(event, this)">Edit</span>
      </div>
      `;
    todo_list.insertAdjacentHTML("beforeend", newTodo);
  });
}
renderTodos(todos);

function openModal(event, el) {
  event.stopPropagation();
  const modal = document.getElementById("modal");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  const closeModalBtn = document.getElementById("closeModalBtn");
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  let clickedTodoId = el.dataset.todoid;
  editingTodo(clickedTodoId);
}

function editingTodo(clickedTodoId) {
  document.querySelector("#edit_todo_name").value = todos.find(
    (todo) => todo.todo_id == clickedTodoId
  ).todo_name;
  document.querySelector("#edit_categorySelect").value = todos.find(
    (todo) => todo.todo_id == clickedTodoId
  ).todo_category;
  document.querySelector("#edit_due_date").value = todos.find(
    (todo) => todo.todo_id == clickedTodoId
  ).todo_due_date;

  let updateBtn = document.querySelector("#updateBtn");

  updateBtn.addEventListener("click", function () {
    let todoName = document.querySelector("#edit_todo_name").value;
    let category = document.querySelector("#edit_categorySelect").value;
    let dueDate = document.querySelector("#edit_due_date").value;

    let clickedTodo = todos.find((todo) => todo.todo_id == clickedTodoId);
    clickedTodo.todo_name = todoName;
    clickedTodo.todo_category = category;
    clickedTodo.todo_due_date = dueDate;

    console.log(todos);

    renderTodos(todos);
    closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
}

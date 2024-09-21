let todos = [
  {
    todo_name: "homework",
    todo_complete: false,
    todo_id: 1,
    todo_category: "school",
    todo_due_date: "2024-09-01",
  },
  {
    todo_name: "grocery shopping",
    todo_complete: false,
    todo_id: 2,
    todo_category: "chores",
    todo_due_date: "2024-09-03",
  },
  {
    todo_name: "work on project",
    todo_complete: false,
    todo_id: 3,
    todo_category: "work",
    todo_due_date: "2024-09-05",
  },
  {
    todo_name: "read book",
    todo_complete: false,
    todo_id: 4,
    todo_category: "other",
    todo_due_date: "2024-09-07",
  },
];

let currentCategory = "";

// DOM elements
const todo_list = document.querySelector("#todo_list");
const clearBtn = document.querySelector("#clearDoneTodos");

// Event Listeners
clearBtn.addEventListener("click", clearDoneTodos);

// Functions
function completeTodo(event, el) {
  event.stopPropagation();
  let clickedTodoId = el.dataset.todoid;
  toggleTodo(clickedTodoId);
  renderTodos(todos);
  countDoneTodos(todos);
  countNotDoneTodos(todos);
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
  sumTodos(todos);
  countDoneTodos(todos);
  countNotDoneTodos(todos);
}

function addTodo() {
  let todo_input = document.querySelector("#todo_name").value;
  let selectedCategory = document.querySelector("#categorySelect").value;
  let dueDate = document.querySelector("#due_date").value;
  
  todos.push(newTodoObj(todo_input, selectedCategory, dueDate));
  renderTodos(todos);
  sumTodos(todos);
  countDoneTodos(todos);
  countNotDoneTodos(todos);
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

function viewByCategory(event, el) {
  event.stopPropagation();
  currentCategory = el.value;
  renderTodos(todos);
  sumTodos(todos);
  countDoneTodos(todos);
  countNotDoneTodos(todos);
}

function renderTodos(todos) {
  todo_list.innerHTML = "";
  let filteredTodos;

  if (currentCategory === "all" || currentCategory === "") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.todo_category === currentCategory);
  }

  filteredTodos.forEach((todo) => {
    let done = todo.todo_complete ? "done" : "";
    let newTodo = `
      <div data-todoid=${todo.todo_id}>
        <li class="${done}" data-todoid=${todo.todo_id} onclick="completeTodo(event, this)">
          ${todo.todo_name}
        </li>
        <input type="text" class="editInputs_${todo.todo_id} editInputs border"/>
        <input type="date" class="editInputs_${todo.todo_id} editInputs border"/>
        <select class="editInputs_${todo.todo_id} editInputs border">
          <option value="">edit category</option>
          <option value="school">School</option>
          <option value="chores">Chores</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>
        <div>
          <button data-todoid=${todo.todo_id} onclick="deleteTodo(event, this)">🗑️</button>
          <button data-todoid=${todo.todo_id} onclick="showEditInputs(event, this)" id="editBtn_${todo.todo_id}">Edit</button>
          <button data-todoid=${todo.todo_id} class="editInputs_${todo.todo_id} editInputs" onclick="completeEdit(event, this)">Save</button>
        </div>
      </div>
    `;
    todo_list.insertAdjacentHTML("beforeend", newTodo);
  });
}

function sumTodos(arr) {
  if (currentCategory !== "" && currentCategory !== "all") {
    arr = arr.filter((todo) => todo.todo_category === currentCategory);
  }

  if (currentCategory === "all" || currentCategory === "") {
    arr = todos;
  }
  const sum = document.querySelector("#sum");
  sum.innerHTML = arr.length;
}

function countDoneTodos(arr) {
  if (currentCategory !== "" && currentCategory !== "all") {
    arr = arr.filter((todo) => todo.todo_category === currentCategory);
  }
  if (currentCategory === "all" || currentCategory === "") {
    arr = todos;
  }
  const done = document.querySelector("#done");
  done.innerHTML = arr.filter((todo) => todo.todo_complete).length;
}

function countNotDoneTodos(arr) {
  if (currentCategory !== "" && currentCategory !== "all") {
    arr = arr.filter((todo) => todo.todo_category === currentCategory);
  }
  if (currentCategory === "all" || currentCategory === "") {
    arr = todos;
  }
  const notDone = document.querySelector("#not_done");
  notDone.innerHTML = arr.filter((todo) => !todo.todo_complete).length;
}

function clearDoneTodos() {
  todos = todos.filter((todo) => !todo.todo_complete);
  renderTodos(todos);
  countDoneTodos(todos);
  countNotDoneTodos(todos);
  sumTodos(todos);
}

function showEditInputs(event, el) {
  event.stopPropagation();
  let editInputs = document.querySelectorAll(`.editInputs_${el.dataset.todoid}`);
  let editBtn = document.querySelector(`#editBtn_${el.dataset.todoid}`);
  editInputs.forEach((input) => {
    input.classList.add("showEditInputs")
  });
  editBtn.classList.add("hidden");
  bindValues(el);
}

function bindValues(el) {
  let clickedTodoId = el.dataset.todoid;
  let clickedTodo = todos.find((todo) => todo.todo_id == clickedTodoId);
  let editInputs = document.querySelectorAll(`.editInputs_${clickedTodoId}`);
  editInputs[0].value = clickedTodo.todo_name;
  editInputs[1].value = clickedTodo.todo_due_date;
  editInputs[2].value = clickedTodo.todo_category;
}

function completeEdit(event, el) {
  event.stopPropagation();
  let clickedTodoId = el.dataset.todoid;
  let editInputs = document.querySelectorAll(`.editInputs_${clickedTodoId}`);
  let todoName = editInputs[0].value;
  let dueDate = editInputs[1].value;
  let category = editInputs[2].value;
  let clickedTodo = todos.find((todo) => todo.todo_id == clickedTodoId);
  clickedTodo.todo_name = todoName;
  clickedTodo.todo_due_date = dueDate;
  clickedTodo.todo_category = category;
  renderTodos(todos);
  sumTodos(todos);
  countDoneTodos(todos);
  countNotDoneTodos(todos);
}

renderTodos(todos);
sumTodos(todos);
countDoneTodos(todos);
countNotDoneTodos(todos);
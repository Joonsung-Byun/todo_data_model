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
  console.log(todos);
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
  todo_list.innerHTML = "";

  todos.forEach((todo, index) => {
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
          <option value="personal">Personal</option>
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
renderTodos(todos);

function showEditInputs(event, el) {
  event.stopPropagation();
  let editInputs = document.querySelectorAll(`.editInputs_${el.dataset.todoid}`);
  let editBtn = document.querySelector(`#editBtn_${el.dataset.todoid}`);
  editInputs.forEach((input) => {
    input.classList.add("showEditInputs")
  });
  editBtn.classList.add("hidden");
  bindValues(event, el);
}

function bindValues(event, el) {
  event.stopPropagation();
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
}


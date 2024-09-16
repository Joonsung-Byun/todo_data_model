let todos = [
  {
    todo_name: "laundry", // string data type
    todo_status: false, // boolean data type
    todo_id: 1, // number data type
    todo_category: "chores", // string data type
    todo_due_date: "2024-09-01", // date data type
  }, // object data type
  {
    todo_name: "grocery shopping", // string data type
    todo_status: false, // boolean data type
    todo_id: 2, // number data type
    todo_category: "chores", // string data type
    todo_due_date: "2024-09-01", // date data type
  }, // object data type
]; // array data type

const add_btn = document.querySelector("#add_btn");
const todo_input = document.querySelector("#todo_name");
const dateControl = document.querySelector('input[type="date"]');
const todo_list = document.querySelector("#todo_list");
const selectedCategory = document.querySelector("#category");
const sum = document.querySelector("#sum");

const not_done = document.querySelector("#not_done");
const done = document.querySelector("#done");
const clear = document.querySelector("#clear");

add_btn.addEventListener("click", addToDo);
clear.addEventListener("click", clearAll);

// add todo
function addToDo(e) {
  if (
    todo_input.value === "" ||
    dateControl.value === "" ||
    selectedCategory.value === ""
  ) {
    alert("Please fill in all fields");
    return;
  }
  e.preventDefault();
  const todo_name = todo_input.value;
  const todo_category = selectedCategory.value;
  const due_date = dateControl.value;
  const todo = {
    todo_name: todo_name,
    todo_status: false,
    todo_id: todos.length + 1,
    todo_category: todo_category,
    todo_due_date: due_date,
  };
  todos.push(todo);
  renderTodos(todos);
}

//view all todos
function renderTodos(todos) {

  todo_list.innerHTML = ""; // clear the list

  todos.map((single_todo, index) => {
    console.log("index" + index);
    const todoDiv = document.createElement("div");

    const li_id = document.createElement("li");
    li_id.innerHTML = "<span> ID: </span>" + single_todo.todo_id;

    const li_name = document.createElement("li");
    li_name.innerHTML = "<span> To Do: </span>" + single_todo.todo_name;

    const edit_li_name = document.createElement("input");
    edit_li_name.setAttribute("type", "text");
    edit_li_name.setAttribute("class", "edit_input");
    edit_li_name.setAttribute("class", `edit_input_${index}`);
    edit_li_name.setAttribute("id", `new_todo_name_${index}`);
    edit_li_name.setAttribute("placeholder", "Edit To Do's name");
    edit_li_name.setAttribute('value', single_todo.todo_name)
    edit_li_name.style.border = "1px solid black";
    edit_li_name.style.padding = "5px 10px";
    edit_li_name.style.display = "none";

    const li_category = document.createElement("li");
    li_category.innerHTML =
      "<span> Category: </span>" + single_todo.todo_category;

    const edit_li_category = document.createElement("input");
    edit_li_category.setAttribute("type", "text");
    edit_li_category.setAttribute("class", `edit_input_${index}`);
    edit_li_category.setAttribute("id", `new_todo_category_${index}`)
    edit_li_category.setAttribute("placeholder", "Edit To Do's category");
    edit_li_category.style.border = "1px solid black";
    edit_li_category.style.padding = "5px 10px";
    edit_li_category.setAttribute('value', single_todo.todo_category)
    edit_li_category.style.display = "none";

    const li_due_date = document.createElement("li");
    li_due_date.innerHTML =
      "<span> Due Date: </span>" + single_todo.todo_due_date;

    const edit_due_date = document.createElement("input");
    edit_due_date.setAttribute("type", "date");
    edit_due_date.setAttribute("class", `edit_input_${index}`);
    edit_due_date.setAttribute("placeholder", "Edit To Do's due date");
    edit_due_date.setAttribute("id", `new_todo_due_date_${index}`);
    edit_due_date.style.border = "1px solid black";
    edit_due_date.style.padding = "5px 10px";
    edit_due_date.setAttribute('value', single_todo.todo_due_date)
    edit_due_date.style.display = "none";

    const li_status = document.createElement("li");
    li_status.innerHTML = "<span> Status: </span>" + single_todo.todo_status;

    const delete_btn = document.createElement("button");
    delete_btn.setAttribute("class", "delete_btn");
    delete_btn.innerHTML = "Delete";
    delete_btn.addEventListener("click", () => delTodo(index));

    const complete_btn = document.createElement("button");
    complete_btn.setAttribute("class", "complete_btn");
    complete_btn.innerHTML = "Complete";
    complete_btn.addEventListener("click", () => completeTodo(index));

    const edit_btn = document.createElement("button");
    edit_btn.setAttribute("class", "edit_btn");
    edit_btn.setAttribute("id", `edit_btn_${index}`);
    edit_btn.innerHTML = "Edit";
    edit_btn.addEventListener("click", (e) => edit(e, index));

    const complete_edit_btn = document.createElement("span");
    complete_edit_btn.setAttribute("class", "complete_edit_btn");
    complete_edit_btn.setAttribute("id", `complete_edit_btn_${index}`);
    complete_edit_btn.innerHTML = "✔";
    complete_edit_btn.style.display = "none";
    complete_edit_btn.addEventListener("click", () => completeEdit(index));

    todoDiv.appendChild(li_id);
    todoDiv.appendChild(li_name);
    todoDiv.appendChild(edit_li_name);
    todoDiv.appendChild(li_category);
    todoDiv.appendChild(edit_li_category);
    todoDiv.appendChild(li_due_date);
    todoDiv.appendChild(edit_due_date);
    todoDiv.appendChild(li_status);

    todoDiv.appendChild(delete_btn);
    todoDiv.appendChild(complete_btn);
    todoDiv.appendChild(edit_btn);
    todoDiv.appendChild(complete_edit_btn);

    todo_list.appendChild(todoDiv);

    resetInputs();
  });
  sum.innerHTML = todos.length;
  not_done.innerHTML = todos.filter(
    (todo) => todo.todo_status === false
  ).length;
  done.innerHTML = todos.filter((todo) => todo.todo_status === true).length;
}

renderTodos(todos);

function resetInputs() {
  todo_input.value = "";
  dateControl.value = "";
  selectedCategory.value = "";
}

function delTodo(index) {
  todos.splice(index, 1);
  renderTodos(todos);
}

function completeTodo(index) {
  todos[index].todo_status = true;
  renderTodos(todos);
}

function edit(e, index) {
  e.preventDefault();
  const edit_button = document.querySelector(`#edit_btn_${index}`);
  const check_button = document.querySelector(`#complete_edit_btn_${index}`);

  edit_button.style.display = "none";
  check_button.style.display = "inline-block";

  const edit_inputs = document.querySelectorAll(`.edit_input_${index}`);
  edit_inputs.forEach((input) => {
    input.style.display = "inline-block";
    console.log(input);
  });
}

function completeEdit(index) {
    let newInput = document.querySelector(`#new_todo_name_${index}`)
    let newCategory = document.querySelector(`#new_todo_category_${index}`)
    let newDueDate = document.querySelector(`#new_todo_due_date_${index}`)

    todos[index].todo_name = newInput.value
    todos[index].todo_category = newCategory.value
    todos[index].todo_due_date = newDueDate.value

    renderTodos(todos)
}

function clearAll() {
  todos = todos.filter((todo) => todo.todo_status === false);
  renderTodos(todos);
}

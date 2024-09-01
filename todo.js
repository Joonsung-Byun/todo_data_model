const todos = [
    {
        todo_name: 'laundry', // string data type
        todo_status: false, // boolean data type
        todo_id: 1, // number data type
        todo_category: 'chores', // string data type
        todo_due_date: '2024-09-01', // date data type
    }, // object data type
    {
        todo_name: 'grocery shopping', // string data type
        todo_status: false, // boolean data type
        todo_id: 2, // number data type
        todo_category: 'chores', // string data type
        todo_due_date: '2024-09-01', // date data type
    }, // object data type

] // array data type

const add_btn = document.querySelector('#add_btn');
const todo_input = document.querySelector('#todo_name');
const dateControl = document.querySelector('input[type="date"]');
const todo_list = document.querySelector('#todo_list');
const selectedCategory = document.querySelector('#category');

add_btn.addEventListener('click', addToDo);


function addToDo(e) {
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
    }
    todos.push(todo);
    renderTodos(todos);
}

function renderTodos(todos) {
    todo_list.innerHTML = '';
    
    todos.forEach((single_todo, index) => {
        const todoDiv = document.createElement('div');

        const li_id = document.createElement('li');
        li_id.innerHTML = "<span> ID: </span>" + single_todo.todo_id;

        const li_name = document.createElement('li');
        li_name.innerHTML = "<span> To Do: </span>" + single_todo.todo_name;

        const li_category = document.createElement('li');
        li_category.innerHTML = "<span> Category: </span>" + single_todo.todo_category;

        const li_due_date = document.createElement('li');
        li_due_date.innerHTML = "<span> Due Date: </span>" + single_todo.todo_due_date;

        const li_status = document.createElement('li');
        li_status.innerHTML = "<span> Status: </span>" + single_todo.todo_status;

        const delete_btn = document.createElement('button');
        delete_btn.setAttribute("class", "delete_btn");
        delete_btn.innerHTML = 'Delete'
        delete_btn.addEventListener('click', deleteTodo(index));



        todoDiv.appendChild(li_id);
        todoDiv.appendChild(li_name);
        todoDiv.appendChild(li_category);
        todoDiv.appendChild(li_due_date);
        todoDiv.appendChild(li_status);

        todoDiv.appendChild(delete_btn);

        todo_list.appendChild(todoDiv);

        resetInputs();
    })
}

function resetInputs() {
    todo_input.value = '';
    dateControl.value = '';
    selectedCategory.value = '';
}

renderTodos(todos);

function deleteTodo (index) {
    return function () {
        todos.splice(index, 1);
        renderTodos(todos);
    }
}



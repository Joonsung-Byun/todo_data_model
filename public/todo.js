// DOM elements
const todo_list = document.querySelector("#todo_list");
const clearBtn = document.querySelector("#clearDoneTodos");

// Event Listeners
clearBtn.addEventListener("click", clearDoneTodos);

let currentCategory = "all"

// Functions
function completeTodo(event, el) {
  event.stopPropagation();
  let clickedTodoId = el.dataset.todoid;

  axios({
    method: 'put',
    url: '/todos/complete',
    data: {
      todo_id: clickedTodoId
    }
  }).then((response) => {
    renderTodos(response.data);
    countDoneTodos(response.data);
    countNotDoneTodos(response.data);
  })

}



function deleteTodo(event, el) {
  event.stopPropagation();
  let clickedTodoId = el.dataset.todoid;
  
  axios({
    method: 'delete',
    url: '/todos',
    data: {
      todo_id: clickedTodoId
    }
  }).then((response) => {
    renderTodos(response.data);
    sumTodos(response.data);
    countDoneTodos(response.data);
    countNotDoneTodos(response.data);

  })
}

function addTodo() {
  if(document.querySelector("#todo_name").value == "" || document.querySelector("#due_date").value == "" || document.querySelector("#categorySelect").value == "") {
    alert("Please fill out all fields");
    return;
  } else {
    let todo_input = document.querySelector("#todo_name").value;
    let selectedCategory = document.querySelector("#categorySelect").value;
    let dueDate = document.querySelector("#due_date").value;
    axios({
      method: 'post',
      url: '/todos',
      data: {
        todo_name: todo_input,
        todo_complete: false,
        todo_category: selectedCategory,
        todo_due_date: dueDate,
      }
    }).then((response) => {
      console.log(response.data);
      renderTodos(response.data);
      sumTodos(response.data);
      countDoneTodos(response.data);
      countNotDoneTodos(response.data);
    })
  }
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

function viewByCategory(e, t) {
  const selectedCategory = t.value
  console.log(selectedCategory);
  axios({
    method: 'get',
    url: '/todos/category',
    params: {
      category: selectedCategory
    }
  }).then((response) => {
    currentCategory = selectedCategory;
    renderTodos(response.data);
    sumTodos(response.data);
    countDoneTodos(response.data);
    countNotDoneTodos(response.data);
  })
}

// function renderTodos(todos) {
//   console.log('currentCategory:', currentCategory)
//   todo_list.innerHTML = "";
  
//   if(currentCategory == 'all') {
//     todos = todos;
//   } else {
//     axios({
//       method: 'get',
//       url: '/todos/renderCategory',
//       params: {
//         category: currentCategory
//       }
//     }).then((response) => {
//       todos = response.data;
//       console.log(todos)
//     })
//   }

//   todos.forEach((todo) => {
//     let done = todo.todo_complete ? "done" : "";
//     let newTodo = `
//       <div data-todoid=${todo.todo_id}>
//         <li class="${done}" data-todoid=${todo.todo_id} onclick="completeTodo(event, this)">
//           ${todo.todo_name}
//         </li>
//         <input type="text" class="editInputs_${todo.todo_id} editInputs border" value="${todo.todo_name}"/>
//         <input type="date" class="editInputs_${todo.todo_id} editInputs border" value="${todo.todo_due_date}"/>
//         <select class="editInputs_${todo.todo_id} editInputs border">
//           <option value="">edit category</option>
//           <option value="school">School</option>
//           <option value="chores">Chores</option>
//           <option value="work">Work</option>
//           <option value="other">Other</option>
//         </select>
//         <div>
//           <button data-todoid=${todo.todo_id} onclick="deleteTodo(event, this)">🗑️</button>
//           <button data-todoid=${todo.todo_id} onclick="showEditInputs(event, this)" id="editBtn_${todo.todo_id}">Edit</button>
//           <button data-todoid=${todo.todo_id} class="editInputs_${todo.todo_id} editInputs" onclick="completeEdit(event, this)">Save</button>
//         </div>
//       </div>
//     `;
//     todo_list.insertAdjacentHTML("beforeend", newTodo);
//   });
// }

function renderTodos(todos) {
  todo_list.innerHTML = "";

  if (currentCategory == 'all') {
    // 모든 할 일을 표시
    todos.forEach((todo) => {
      renderTodoItem(todo);
    });
  } else {
    axios({
      method: 'get',
      url: '/todos/renderCategory',
      params: {
        category: currentCategory
      }
    }).then((response) => {
      todos = response.data;
      
      todos.forEach((todo) => {
        renderTodoItem(todo);
      });
    }).catch((error) => {
      console.error('Error fetching todos:', error);
    });
  }
}

// 렌더링 할 일을 함수로 분리
function renderTodoItem(todo) {
  let done = todo.todo_complete ? "done" : "";
  let newTodo = `
    <div data-todoid=${todo.todo_id}>
      <li class="${done}" data-todoid=${todo.todo_id} onclick="completeTodo(event, this)">
        ${todo.todo_name}
      </li>
      <input type="text" class="editInputs_${todo.todo_id} editInputs border" value="${todo.todo_name}"/>
      <input type="date" class="editInputs_${todo.todo_id} editInputs border" value="${todo.todo_due_date}"/>
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
}


function sumTodos(arr) {

  const sum = document.querySelector("#sum");
  sum.innerHTML = arr.length;
}

function countDoneTodos(arr) {

  const done = document.querySelector("#done");
  done.innerHTML = arr.filter((todo) => todo.todo_complete).length;
}

function countNotDoneTodos(arr) {

  const notDone = document.querySelector("#not_done");
  notDone.innerHTML = arr.filter((todo) => !todo.todo_complete).length;
}

function clearDoneTodos() {
  axios({
    method: 'delete',
    url: '/todos/done',
  }).then((response) => {
    renderTodos(response.data);
    sumTodos(response.data);
    countDoneTodos(response.data);
    countNotDoneTodos(response.data);
  })

}

function showEditInputs(event, el) {
  event.stopPropagation();
  let editInputs = document.querySelectorAll(`.editInputs_${el.dataset.todoid}`);
  let editBtn = document.querySelector(`#editBtn_${el.dataset.todoid}`);
  editInputs.forEach((input) => {
    input.classList.add("showEditInputs")
  });
  editBtn.classList.add("hidden");
}

function completeEdit(event, el) {
  event.stopPropagation();
  let clickedTodoId = el.dataset.todoid;
  let editInputs = document.querySelectorAll(`.editInputs_${clickedTodoId}`);
  axios({
    method: 'put',
    url: '/todos',
    data: {
      todo_id: clickedTodoId,
      todo_name: editInputs[0].value,
      todo_due_date: editInputs[1].value,
      todo_category: editInputs[2].value,
    }
  }).then((response)=> {
    renderTodos(response.data);
    // sumTodos(response.data);
    // countDoneTodos(response.data);
    // countNotDoneTodos(response.data);

    editInputs.forEach((input) => {
     input.classList.remove("showEditInputs")
    });
  })
}

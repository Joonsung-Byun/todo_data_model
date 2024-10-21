const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
let todos = [
//   { todo_id: 1, todo_name: "homework", todo_complete: false, todo_due_date: "2024-09-01" },
//   { todo_id: 2, todo_name: "walk the dog", todo_complete: false, todo_due_date: "2024-09-02" },
//   { todo_id: 3, todo_name: "presentation", todo_complete: false, todo_due_date: "2024-09-03" },
//   { todo_id: 4, todo_name: "grocery shopping", todo_complete: false, todo_due_date: "2024-09-04" },
//   //Exercise 카테고리 갖는 todo
//     { todo_id: 5, todo_name: "run", todo_complete: false, todo_due_date: "2024-09-05" },
// // other category
//     { todo_id: 6, todo_name: "video game", todo_complete: false, todo_due_date: "2024-09-06" },
];

const categories = [
  // { id: 1, todo_id: 1, name: "school" },
  // { id: 2, todo_id: 2, name: "chores" },
  // { id: 3, todo_id: 3, name: "work" },
  // { id: 4, todo_id: 4, name: "chores" },
  // { id: 5, todo_id: 5, name: "exercise" },
  // { id: 6, todo_id: 6, name: "other" },
];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/todos", (req, res) => {
  const newTodo = {
    todo_id: todos.length + 1,
    todo_name: req.body.todo_name,
    todo_complete: false,
    todo_due_date: req.body.todo_due_date,
  };
  todos.push(newTodo);    

  const newCategory = {
    id: categories.length + 1,
    todo_id: newTodo.todo_id,
    name: req.body.todo_category,
  };
  categories.push(newCategory);


    console.log(todos);
    console.log(categories);
    res.json(todos);
});

app.delete("/todos", (req, res) => {
    const todoId = req.body.todo_id;
    todos = todos.filter((todo) => todo.todo_id != todoId);
    console.log(todos);
    // categories = categories.filter((category) => category.todo_id != todoId);

    res.json(todos);
});

app.get("/todos/renderCategory", (req, res) => {
    const category = req.query.category;
    const selectedCategory = categories.filter((cat) => cat.name == category);
    const foundIds = selectedCategory.map((cat) => cat.todo_id);
    const selectedTodos = todos.filter((todo) => foundIds.includes(todo.todo_id));
    res.json(selectedTodos);
});

app.put("/todos", (req, res) => {
    const todoId = req.body.todo_id;
    const todo = todos.find((todo) => todo.todo_id == todoId);
    todo.todo_name = req.body.todo_name;
    todo.todo_due_date = req.body.todo_due_date;

    let category = categories.find((category) => category.todo_id == todoId);
    category.name = req.body.todo_category;

    res.json(todos);
});

app.put("/todos/complete", (req, res) => {
    const todoId = req.body.todo_id;
    const todo = todos.find((todo) => todo.todo_id == todoId);
    todo.todo_complete = !todo.todo_complete;

    res.json(todos);
});

app.get("/todos/category", (req, res) => {
    const category = req.query.category;
    console.log(category);

    if(category == "all") {
        res.json(todos);
        return;
    } else {
        const selectedCategory = categories.filter((cat) => cat.name == category);
        if(selectedCategory.length == 0) {
            res.json([]);
            return;
        } else {
            const foundIds = selectedCategory.map((cat) => cat.todo_id);
            const selectedTodos = todos.filter((todo) => foundIds.includes(todo.todo_id));
            res.json(selectedTodos);
        }
        
    }   
});

app.delete("/todos/done", (req, res) => {
  console.log('hi')
    todos = todos.filter((todo) => todo.todo_complete == false);
    res.json(todos);
})
    


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

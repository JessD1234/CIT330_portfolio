
function saveTodo(todo) {
    const todoList = getTodoList();
    todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteTodo(id) {
    const todoList = getTodoList();
    const updatedTodos = todoList.filter( todo => todo.id != id)
    localStorage.setItem("todoList", JSON.stringify(updatedTodos));
}

function getTodoList() {
    const listString = localStorage.getItem("todoList");
    let todoList = [];
    if (listString) {
        todoList = JSON.parse(listString);
    }

    return todoList;
}

export default {
    saveTodo,
    deleteTodo,
    getTodoList
}
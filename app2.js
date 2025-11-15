const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();


todoForm.addEventListener('submit', function(e){
    e.preventDefault()
    addTodo()
})

function addTodo(){
    const todoText = todoInput.value;
    if(todoText.length > 0){
        const todoObject = {
            text:todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList()
        saveTodos()
        todoInput.value="";
    }
}

function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex
    const todoLI = document.createElement('li');
    const todoText = todo.text
    todoLI.className = "todo";
    todoLI.innerHTML = `
    <li class="todo">
        <input type="checkbox" name="${todoId}" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24">
                <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
        ${todoText}
        </label>
        <button class="delete-btn1">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24">
                <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
            </svg>
        </button>
    </li>
    `

    const deleteButton = todoLI.querySelector(".delete-btn1");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex)
    })
    const checkbox =  todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=> {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos()
    })
    checkbox.checked = todo.completed;
    return todoLI
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_,i)=> i != todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos)
    localStorage.setItem('todos',todosJson);
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
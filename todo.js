document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.querySelector('form');
    const todoInput = document.getElementById('todo-input');
    const todoListUL = document.getElementById('todo-list');

    let allTodos = [];

    todoForm.addEventListener("submit", function(e) {
        e.preventDefault();
        addTodo();
    });

    function addTodo(){
        const todoText = todoInput.value.trim();
        if(todoText.length > 0){
            allTodos.push(todoText);
            updateTodoList();
            todoInput.value = "";
        }
    }

    function updateTodoList(){
        todoListUL.innerHTML = "";
        allTodos.forEach((todo, todoIndex) => {
            todoItem = createTodoItem(todo, todoIndex);
            todoListUL.append(todoItem);
        })
    }

    function createTodoItem(todo, todoIndex){
        const todoId = "todo-"+todoIndex;
        const todoLI = document.createElement("li");
        todoLI.className = "todo";
        todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
            <label for="${todoId}" class="custom-checkbox">
              <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
              </svg>
            </label>
            <label for="${todoId}" class="todo-txt">
                ${todo}
            </label>
        `

        return todoLI;
    }
});
export const displayTodos = (project) => {
    const content = document.getElementById("content");
    for (let todo of project.todos) {
        const todoContainer = document.createElement("div");
        const todoTitle = document.createElement("h3");
        const todoDescription = document.createElement("p");
        const todoDueDate = document.createElement("p");
        const todoPriority = document.createElement("h5");
        const todoComplete = document.createElement("h5");

        todoContainer.className = "todo-container";
        todoTitle.textContent = todo.title;
        todoDescription.textContent = todo.description;
        todoDueDate.textContent = todo.dueDate;
        todoPriority.textContent = todo.priority;
        
        if (todo.complete) {
            todoComplete.textContent = "Done";
        }

        todoContainer.appendChild(todoTitle);
        todoContainer.appendChild(todoDescription);
        todoContainer.appendChild(todoDueDate);
        todoContainer.appendChild(todoPriority);
        todoContainer.appendChild(todoComplete);
        content.appendChild(todoContainer); 
    }
}

export const createTodoDisclosureWidgets = (project) => {
    const content = document.getElementById("content");
    
    for (let todo of project.todos) {
        const disclousureWidget = document.createElement("details");
        const widgetSummary = document.createElement("summary");
        const todoDescription = document.createElement("p");
        const todoDueDate = document.createElement("p");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        const completeButton = document.createElement("button");

        widgetSummary.innerHTML = todo.title;
        todoDescription.textContent = todo.description;
        todoDueDate.textContent = todo.dueDate;
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "red";
        editButton.textContent = "Edit";
        completeButton.textContent = "Complete";

        disclousureWidget.appendChild(widgetSummary);
        disclousureWidget.appendChild(todoDescription);
        disclousureWidget.appendChild(todoDueDate);
        disclousureWidget.appendChild(deleteButton);
        disclousureWidget.appendChild(editButton);
        disclousureWidget.appendChild(completeButton);
        content.appendChild(disclousureWidget);

        deleteButton.addEventListener("click", () => {
            disclousureWidget.remove();
            project.removeTodo(todo);
        });

        completeButton.addEventListener("click", () => {
            todo.complete = !todo.complete;
            completeButton.classList.toggle("complete");
        });

        
    }
};
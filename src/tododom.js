import { TodoItem } from "./todoclasses";

const createTodoDisclosureWidgetsFromProject = (project) => {
    for (let todo of project.todos) {
        createTodoDisclosureWidget(todo, project);
    }
};

const createTodoDisclosureWidget = (todo, project) => {
    const content = document.getElementById("content");
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

    editButton.addEventListener("click", () => {
        return null; // TODO -  Implement this
    })

    completeButton.addEventListener("click", () => {
        todo.complete = !todo.complete;
        completeButton.classList.toggle("complete");
    });
}
export const fillProjectsList = (projects) => {
    document.getElementById("projects").innerHTML = "";
    for (const project of projects) {
        addProjectToProjectsList(project);
    }
}

const addProjectToProjectsList = (project) => {
    const projectList = document.getElementById("projects");

    const projectContainer = document.createElement("div");
    const projectName = document.createElement("p");

    projectContainer.className = "project-container";
    projectName.textContent = project.name;

    projectContainer.appendChild(projectName);
    projectList.appendChild(projectContainer);

    projectContainer.addEventListener("click", () =>{
        displayProject(project);
    });
};

const showAddTaskForm = () => {
    document.getElementById("add-task-modal").style.display = "flex";
    document.body.style.pointerEvents = "none";
}

const hideAddTaskForm = () => {
    document.getElementById("add-task-modal").style.display = "none";
    document.body.style.pointerEvents = "auto";
}

const showAddNewProjectForm = () => {
    document.getElementById("new-project-modal").style.display = "flex";
    document.body.style.pointerEvents = "none";
}

export const hideAddNewProjectForm = () => {
    document.getElementById("new-project-modal").style.display = "none";
    document.body.style.pointerEvents = "auto";
}

let controller = new AbortController();

export const displayProject = (project) => { // This function is terrible
    const content = document.getElementById("content");
    content.innerHTML = "";

    const projectHeader = document.createElement("h1");
    projectHeader.textContent = project.name;

    const addTaskFormButton = document.createElement("button");
    addTaskFormButton.id = "add-task-button";
    addTaskFormButton.className = "button-style";
    addTaskFormButton.innerHTML = "Add Task";

    addTaskFormButton.addEventListener("click", showAddTaskForm);

    const addTaskForm = document.getElementById("add-task-form");

    const deleteAndAddTaskHandler = () => { // TODO - Weird revelation, just create a one use event handler whenever the add task button is pressed
        controller.abort();
        controller = new AbortController();
        addTaskForm.addEventListener("submit",
            (e) => {
                e.preventDefault();
                let title = document.getElementById("task-title").value;
                let description = document.getElementById("task-description").value;
                let dueDate = document.getElementById("task-duedate").value;
                let priority = document.getElementById("task-priority").value;
        
                if (title == "" || description == "") { // TODO - Add validation for date
                    alert("You must fill in all fields.");
                }
                else {
                    let newTask = new TodoItem(title, description, dueDate, priority);
                    project.addTodo(newTask);
                    createTodoDisclosureWidget(newTask);
                    hideAddTaskForm();
                }
            },
            { signal: controller.signal }
        )
    }

    deleteAndAddTaskHandler();

    const closeNewTaskModalButton = document.getElementById("close-add-task-modal-button");
    closeNewTaskModalButton.addEventListener("click", hideAddTaskForm);

    const addNewProjectFormButton = document.getElementById("add-new-project-button");
    addNewProjectFormButton.addEventListener("click", showAddNewProjectForm);

    const closeNewProjectButton = document.getElementById("close-new-project-modal-button");
    closeNewProjectButton.addEventListener("click", hideAddNewProjectForm);

    content.appendChild(projectHeader);
    content.appendChild(addTaskFormButton);

    createTodoDisclosureWidgetsFromProject(project);
};
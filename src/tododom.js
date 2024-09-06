import { TodoItem } from "./todoclasses";
import { closeSidebar } from "./sidebar";
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

    disclousureWidget.className = "todo-widget";
    widgetSummary.innerHTML = todo.title;
    widgetSummary.className = "todo-title";
    todoDescription.textContent = todo.description;
    todoDescription.className = "todo-description";
    todoDueDate.textContent = todo.dueDate;
    todoDueDate.className = "todo-duedate";
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
        showTaskForm();
        const header = document.getElementById("modal-header");
        header.innerHTML = "";

        const headerContent = document.createElement("h2");
        headerContent.innerHTML = "Edit Task";
        header.appendChild(headerContent);

        deleteAndCreateEditTaskHandler(project, todo, disclousureWidget);
    });

    completeButton.addEventListener("click", () => {
        todo.complete = !todo.complete;
        completeButton.classList.toggle("complete");
    });
}

const editDisclosureWidget = (disclosureWidget, title, description, dueDate) => {
    let widgetTitle = disclosureWidget.querySelector(".todo-title");
    let widgetDescription = disclosureWidget.querySelector(".todo-description");
    let widgetDueDate = disclosureWidget.querySelector(".todo-duedate");

    widgetTitle.innerHTML = title;
    widgetDescription.textContent = description;
    widgetDueDate.textContent = dueDate;
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
        closeSidebar();
    });
};

const showTaskForm = () => { // TODO - Rename all of these
    document.getElementById("task-modal").style.display = "flex";
    document.body.style.pointerEvents = "none";
}

const hideTaskForm = () => {
    document.getElementById("task-modal").style.display = "none";
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

const taskForm = document.getElementById("task-form");

let addTaskController = new AbortController();
let editTaskController = new AbortController();

const deleteAndCreateAddTaskHandler = (project) => { // TODO - Weird revelation, just create a one use event handler whenever the add task button is clicked
    addTaskController.abort();
    editTaskController.abort();
    addTaskController = new AbortController();
    taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let title = document.getElementById("task-title").value;
            let description = document.getElementById("task-description").value;
            let dueDate = document.getElementById("task-duedate").value;
            let priority = document.getElementById("task-priority").value;
    
            if (title == "" || description == "") { // TODO - Add validation for date
                alert("You must fill in all fields.");
            }
            else if (project.alreadyHasTodoTitle(title)) {
                alert("You already have a todo with this title.");
            }
            else {
                let newTask = new TodoItem(title, description, dueDate, priority);
                project.addTodo(newTask);
                createTodoDisclosureWidget(newTask);
                hideTaskForm();
            }
        },
        { signal: addTaskController.signal }
    )
}

const deleteAndCreateEditTaskHandler = (project, todo, disclosureWidget) => {
    addTaskController.abort();
    editTaskController.abort();
    editTaskController = new AbortController();

    let taskTitle = document.getElementById("task-title");
    let taskDescription = document.getElementById("task-description");
    let taskDueDate = document.getElementById("task-duedate");
    let taskPriority = document.getElementById("task-priority");

    taskTitle.value = todo.title;
    taskDescription.value = todo.description;
    taskDueDate.value = todo.dueDate;
    taskPriority.value = todo.priority;

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = taskTitle.value;
        let description = taskDescription.value;
        let dueDate = taskDueDate.value;
        let priority = taskPriority.value;

        if (title == "" || description == "") {
            alert("You must fill in all fields");
        }
        else {
            let indexOfTodoToEdit = project.todos.findIndex(todoToQuery => todoToQuery.title == todo.title);
            project.todos[indexOfTodoToEdit].title = title;
            project.todos[indexOfTodoToEdit].description = description;
            project.todos[indexOfTodoToEdit].dueDate = dueDate;
            project.todos[indexOfTodoToEdit].priority = priority;

            editDisclosureWidget(disclosureWidget, title, description, dueDate);
            hideTaskForm();
        }
    },
    { signal: editTaskController.signal }
);
}
export const displayProject = (project) => { // This function is terrible
    const content = document.getElementById("content");
    content.innerHTML = "";

    const projectHeader = document.createElement("h1");
    projectHeader.textContent = project.name;

    const addTaskFormButton = document.createElement("button");
    addTaskFormButton.id = "add-task-button";
    addTaskFormButton.className = "button-style";
    addTaskFormButton.innerHTML = "Add Task";

    const showAddTaskForm = () => {
        showTaskForm();
        const header = document.getElementById("modal-header");
        header.innerHTML = "";
        
        const headerContent = document.createElement("h2");
        headerContent.innerHTML = "Add Task";
        header.appendChild(headerContent);
    
        deleteAndCreateAddTaskHandler(project);
    }

    addTaskFormButton.addEventListener("click", showAddTaskForm); // Maybe clean this up on every new displayProject unless it does that already

    const closeTaskModalButton = document.getElementById("close-task-modal-button");
    closeTaskModalButton.addEventListener("click", hideTaskForm);

    const addNewProjectFormButton = document.getElementById("add-new-project-button");
    addNewProjectFormButton.addEventListener("click", showAddNewProjectForm);

    const closeNewProjectButton = document.getElementById("close-new-project-modal-button");
    closeNewProjectButton.addEventListener("click", hideAddNewProjectForm);

    content.appendChild(projectHeader);
    content.appendChild(addTaskFormButton);

    createTodoDisclosureWidgetsFromProject(project);
};
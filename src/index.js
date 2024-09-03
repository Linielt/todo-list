/* eslint-disable no-unused-vars */
import { TodoItem, Project, Priorities } from "./todoclasses";
import { createTodoDisclosureWidgetsFromProject, createTodoDisclosureWidget } from "./tododom";
import "./styles.css";
import { closeSidebar, openSidebar } from "./sidebar";
import { fillProjectsList } from "./tododom";
import { showAddTaskForm, hideAddTaskForm, showAddNewProjectForm, hideAddNewProjectForm } from "./tododom";

const content = document.getElementById("content");

const sidebarOpenButton = document.getElementById("open-sidebar");
const sidebarCloseButton = document.getElementById("close-sidebar");

sidebarOpenButton.addEventListener("click", openSidebar);
sidebarCloseButton.addEventListener("click", closeSidebar);

const projects = [];
projects.push(new Project("Tasks"));

let selectedProject = projects[0];

selectedProject.addTodo(new TodoItem("Example", "Example Todo Item", "01-01-2000", Priorities.Low)); // TODO - Change this when I add LocalStorage

const projectHeader = document.createElement("h1");
projectHeader.textContent = selectedProject.name;

const addTaskFormButton = document.createElement("button");
addTaskFormButton.id = "add-task-button";
addTaskFormButton.className = "button-style";
addTaskFormButton.innerHTML = "Add Task";

addTaskFormButton.addEventListener("click", showAddTaskForm);

const closeNewTaskModalButton = document.getElementById("close-add-task-modal-button");
closeNewTaskModalButton.addEventListener("click", hideAddTaskForm);

content.appendChild(projectHeader);
content.appendChild(addTaskFormButton);

createTodoDisclosureWidgetsFromProject(selectedProject);
fillProjectsList(projects);

const addNewProjectFormButton = document.getElementById("add-new-project-button");
addNewProjectFormButton.addEventListener("click", showAddNewProjectForm);

const closeNewProjectButton = document.getElementById("close-new-project-modal-button");
closeNewProjectButton.addEventListener("click", hideAddNewProjectForm);

const addTaskForm = document.getElementById("add-task-form"); // Redo this when a new project is selected
addTaskForm.addEventListener("submit", (e) => {
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
        selectedProject.addTodo(newTask);
        createTodoDisclosureWidget(newTask);
        hideAddTaskForm();
    }
});

const displayProject = (project) => {
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
    addTaskForm.addEventListener("submit", (e) => {
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
    });

    const closeNewTaskModalButton = document.getElementById("close-add-task-modal-button");
    closeNewTaskModalButton.addEventListener("click", hideAddTaskForm);

    const addNewProjectFormButton = document.getElementById("add-new-project-button");
    addNewProjectFormButton.addEventListener("click", showAddNewProjectForm);

    const closeNewProjectButton = document.getElementById("close-new-project-modal-button");
    closeNewProjectButton.addEventListener("click", hideAddNewProjectForm);

    content.appendChild(projectHeader);
    content.appendChild(addTaskFormButton);

    createTodoDisclosureWidgetsFromProject(project);
    fillProjectsList(projects); // TODO - Make this take from LocalStorage
};
import { TodoItem, Project, Priorities } from "./todoclasses";
import { displayTodos, createTodoDisclosureWidgets } from "./tododom";
import "./styles.css";

const content = document.getElementById("content");

const projects = [];
projects.push(new Project("Tasks"));

let selectedProject = projects[0];

selectedProject.addTodo(new TodoItem("Example", "Example Todo Item", "01-01-2000", Priorities.Low)); // TODO - Change this when I add LocalStorage

const projectHeader = document.createElement("h1");
projectHeader.textContent = selectedProject.name;

content.appendChild(projectHeader);

displayTodos(selectedProject);
createTodoDisclosureWidgets(selectedProject);

const addNewProjectButton = document.getElementById("add-new-project-button");
addNewProjectButton.addEventListener("click", () => {
    console.log("Not implemented yet");
})
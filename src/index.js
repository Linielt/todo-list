 
import { TodoItem, Project, Priorities } from "./todoclasses";
import { displayProject } from "./tododom";
import "./styles.css";
import { closeSidebar, openSidebar } from "./sidebar";
import { fillProjectsList, hideAddNewProjectForm } from "./tododom";
import { getProjectsFromLocalStorage, saveProjectsToLocalStorage } from "./local-storage";

const sidebarOpenButton = document.getElementById("open-sidebar");
const sidebarCloseButton = document.getElementById("close-sidebar");

sidebarOpenButton.addEventListener("click", openSidebar);
sidebarCloseButton.addEventListener("click", closeSidebar);

const projects = []; // TODO = Use LocalStorage instead of this
const localStorageProjects = getProjectsFromLocalStorage();
projects.push(new Project("Tasks"));
localStorageProjects.push(new Project("Test"))

let selectedProject = projects[0];

selectedProject.addTodo(new TodoItem("Example", "Example Todo Item", "01-01-2000", Priorities.Low)); // TODO - Change this when I add LocalStorage
localStorageProjects[0].addTodo(new TodoItem("Test", "This is a test", "19-04-1971", Priorities.Medium));

saveProjectsToLocalStorage(localStorageProjects);

console.log(localStorageProjects);
console.log(localStorageProjects[0]);

displayProject(selectedProject);
fillProjectsList(projects); // TODO - Make this take from LocalStorage

const newProjectForm = document.getElementById("new-project-form");
newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("project-title").value;

    if (name == "") {
        alert("You must enter a title");
    }
    else {
        let newProject = new Project(name);
        displayProject(newProject);
        hideAddNewProjectForm();
    }
});
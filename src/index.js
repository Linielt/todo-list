/* eslint-disable no-unused-vars */
 
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

const projects = getProjectsFromLocalStorage();

if (projects.length === 0) {
    projects[0] = new Project("Example Project");
}

let selectedProject = projects[0];

displayProject(selectedProject);
fillProjectsList(projects);

const newProjectForm = document.getElementById("new-project-form");
newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("project-title").value;

    if (name == "") {
        alert("You must enter a title");
    }
    else if (projectNameAlreadyExists(name)) {
        alert("You cannot create a project with the same name");
    }
    else {
        let newProject = new Project(name);
        displayProject(newProject);
        projects.push(newProject);
        fillProjectsList(projects);
        hideAddNewProjectForm();
    }
});

const projectNameAlreadyExists = (name) => {
    for (let project of projects) {
        if (project.name === name) {
            return true;
        }
    }

    return false;
}

window.onbeforeunload = (e) => {
    e.preventDefault();
    saveProjectsToLocalStorage(projects);
    e.returnValue = null;
    return e.returnValue;
}
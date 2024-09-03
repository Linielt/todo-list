export const createTodoDisclosureWidgetsFromProject = (project) => {
    for (let todo of project.todos) {
        createTodoDisclosureWidget(todo, project);
    }
};

export const createTodoDisclosureWidget = (todo, project) => {
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

    completeButton.addEventListener("click", () => {
        todo.complete = !todo.complete;
        completeButton.classList.toggle("complete");
    });
}

export const fillProjectsList = (projects) => {
    for (const project of projects) {
        addProjectToProjectsList(project);
    }
}

export const addProjectToProjectsList = (project) => {
    const projectList = document.getElementById("projects");

    const projectContainer = document.createElement("div");
    const projectName = document.createElement("p");

    projectContainer.className = "project-container";
    projectName.textContent = project.name;

    projectContainer.appendChild(projectName);
    projectList.appendChild(projectContainer);
};

export const changeProject = (project) => {
    return project;
};

export const showAddTaskForm = () => {
    document.getElementById("add-task-modal").style.display = "flex";
    document.body.style.pointerEvents = "none";
}

export const hideAddTaskForm = () => {
    document.getElementById("add-task-modal").style.display = "none";
    document.body.style.pointerEvents = "auto";
}

export const showAddNewProjectForm = () => {
    document.getElementById("new-project-modal").style.display = "flex";
    document.body.style.pointerEvents = "none";
}

export const hideAddNewProjectForm = () => {
    document.getElementById("new-project-modal").style.display = "none";
    document.body.style.pointerEvents = "auto";
}
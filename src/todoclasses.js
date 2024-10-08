export class TodoItem {
    #title;
    #description;
    #dueDate;
    #priority;
    #complete;

    constructor(title, description, dueDate, priority, complete) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#complete = complete;
    }

    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title; 
    }

    get description() {
        return this.#description;
    }

    set description(description) {
        this.#description = description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    get priority() {
        return this.#priority;
    }

    set priority(priority) {
        this.#priority = priority;
    }

    get complete() {
        return this.#complete;
    }

    set complete(complete) {
        this.#complete = complete;
    }

    addToProject(project) {
        project.todos.push(this);
    }

    toJSON() {
        return {
            "title":`${this.#title}`,
            "description":`${this.#description}`,
            "dueDate":`${this.#dueDate}`,
            "priority":`${this.#priority}`,
            "complete":`${this.#complete}`
        }
    }

    static fromJSON(json) {
        return new TodoItem(json.title, json.description, json.dueDate, json.priority, JSON.parse(json.complete));
    }
}

export class Project {
    #name;
    #todos;

    constructor(name) {
        this.#name = name;
        this.#todos = [];
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get todos() {
        return this.#todos;
    }

    addTodo(todo) {
        this.#todos.push(todo);
    }

    removeTodo(todo) {
        const toDeleteIndex = this.#todos.indexOf(todo);
        if (toDeleteIndex > -1) {
            this.#todos.splice(toDeleteIndex, 1);
        }
    }

    alreadyHasTodoTitle(title) {
        for (let todo of this.#todos) {
            if (todo.title == title) {
                return true;
            }
        }

        return false;
    }

    toJSON() {
        let todosJSON = [];

        for (let todo of this.#todos) {
            todosJSON.push(todo.toJSON());
        }

        return {"name":`${this.#name}`, "todos":`${JSON.stringify(todosJSON)}`};
    }

    static fromJSON(json) {
        let revivedTodos = [];

        for (let jsonTodo of JSON.parse(json.todos)) {
            revivedTodos.push(TodoItem.fromJSON(jsonTodo));
        }

        let revivedObject = new Project(json.name);
        
        for (let revivedTodo of revivedTodos) {
            revivedObject.todos.push(revivedTodo);
        }

        return revivedObject;
    }
}

export const Priorities = { // Would use enum with typescript
    Low: "Low",
    Medium: "Medium",
    High: "High"
};
export class TodoItem {
    #title;
    #description;
    #dueDate;
    #priority;
    #complete;

    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#complete = false;
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
}

export const Priorities = { // Would use enum with typescript
    Low: "Low",
    Medium: "Medium",
    High: "High"
};
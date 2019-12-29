import { parse } from "date-fns";
import { todoFactory } from "./todos";
import { projectFactory } from "./projects";
export default (projects, display) => {
  document.querySelector("#main").addEventListener("click", e => {
    if (e.target.textContent == "delete_forever") {
      removeTodoController(e);
    }
    if (e.target.textContent == "add") {
      let parentList = e.target.parentNode.parentNode;
      parentList.appendChild(display.renderInput());
    }
    if (e.target.id == "submitTodo") {
      submitTodoController(e);
    }
    // lazy selection
    if (Array.from(e.target.classList).includes("complete-icon")) {
      const todoId = e.target.parentNode.dataset.id;
      let projectId =
        e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
      let project = projects.getProjects().filter(project => {
        return project.getId() == projectId;
      })[0];

      project.getTodos().forEach(todo => {
        if (todoId == todo.getTodo().id) {
          todo.toggleComplete();
          console.log(todo.getTodo());
        }
      });
      let body = e.target.parentNode.parentNode.parentNode;
      body.innerHTML = "";
      display.renderTodos(project, body);
    }
  });

  // modal selection
  document.body.addEventListener("click", e => {
    if (e.target.id == "addProject") {
      let value = document.querySelector("#projectTitle").value;
      projects.addProject(projectFactory({ title: value }));
      document.querySelector("#main").innerHTML = "";
      display.render(projects);
    }
  });

  const removeTodoController = e => {
    let projectId =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset
        .id;
    let body = e.target.parentNode.parentNode.parentNode.parentNode;
    let project = projects.getProjects().filter(project => {
      return project.getId() == projectId;
    })[0];
    let id = e.target.parentNode.parentNode.dataset.id;
    projects.getProjects().forEach(project => {
      project.removeTodo(id);
    });
    body.innerHTML = "";
    display.renderTodos(project, body);
  };

  const submitTodoController = e => {
    e.preventDefault();
    let title = document.querySelector("#title").value;
    if (title == "") title = "Title";
    // let description = document.querySelector("#description").value;
    // if (description == "") description = "Description";
    let dueDate = parse(
      document.querySelector("#dueDate").value,
      "yyyy-MM-dd",
      new Date()
    );
    if (dueDate == "Invalid Date") dueDate = new Date();

    // ridiculous selection!! jquery might clean this up?
    let projectId =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode.parentNode.dataset.id;
    let project = projects.getProjects().filter(project => {
      return project.getId() == projectId;
    })[0];
    project.addTodo(todoFactory({ title, dueDate }));
    // ridiculous!!!!!!!
    let body =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode;
    body.innerHTML = "";
    display.renderTodos(project, body);
  };
};

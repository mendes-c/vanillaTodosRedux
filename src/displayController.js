import { parse } from "date-fns";
import { todoFactory } from "./todos";
export default (projects, display) => {
  document.querySelector("#main").addEventListener("click", e => {
    if (e.target.textContent == "delete_forever") {
      removeTodoController(e);
    }
    if (e.target.textContent == "add") {
      e.target.parentNode.parentNode.appendChild(display.renderInput());
    }
    if (e.target.id == "submitTodo") {
      e.preventDefault();
      let title = document.querySelector("#title").value;
      let description = document.querySelector("#description").value;
      let dueDate = parse(
        document.querySelector("#dueDate").value,
        "yyyy-mm-dd",
        new Date()
      );
      // ridiculous selection!!
      let projectId =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .parentNode.parentNode.parentNode.dataset.id;
      let project = projects.filter(project => {
        return project.getId() == projectId;
      })[0];
      project.addTodo(todoFactory({ title, description, dueDate }));
      // how to clean this selection up?
      let body =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .parentNode.parentNode;
      body.innerHTML = "";
      display.renderTodos(project, body);
    }
  });

  const removeTodoController = e => {
    let projectId =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset
        .id;
    let body = e.target.parentNode.parentNode.parentNode.parentNode;
    let project = projects.filter(project => {
      return project.getId() == projectId;
    })[0];
    let id = e.target.parentNode.parentNode.dataset.id;
    projects.forEach(project => {
      project.removeTodo(id);
    });
    body.innerHTML = "";
    display.renderTodos(project, body);
  };
};

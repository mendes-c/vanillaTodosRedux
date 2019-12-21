// todo item
import { todoFactory } from "./todos";
import { projectFactory } from "./projects";
import display from "./display";

let projects = [
  projectFactory({ title: "project 1", todos: [todoFactory({ title: "1" })] }),
  projectFactory({
    title: "project 2",
    todos: [
      todoFactory({ title: "1" }),
      todoFactory({ title: "2" }),
      todoFactory({ title: "3" }),
      todoFactory({ title: "4" })
    ]
  })
];

const displayController = () => {
  document.querySelector("#main").addEventListener("click", e => {
    if (e.target.textContent == "delete_forever") {
      let projectId =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset
          .id;
      let body = e.target.parentNode.parentNode.parentNode.parentNode;
      let project = projects.filter(project => {
        return project.getId() == projectId;
      })[0];
      projects.forEach(project => {});
      let id = e.target.parentNode.parentNode.dataset.id;
      projects.forEach(project => {
        project.removeTodo(id);
      });
      body.innerHTML = "";
      display.renderTodos(project, body);
    }
  });
};

display.render(projects);
displayController();

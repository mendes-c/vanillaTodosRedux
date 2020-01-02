// todo item
import { app } from "./app";
import { todoFactory } from "./todos";
import { projectFactory } from "./projects";
import displayController from "./displayController";
import display from "./display";

// when do you get it?

// get it when you initialize.

// when do you set it?

// when you add and when you remove

const getProjects = () => {
  const projects = app({});
  let data = localStorage.getItem("projects");
  let result = { projects: [] };
  if (data) {
    JSON.parse(data).forEach(project => {
      result.projects.push(project);
    });
    result.projects.forEach(project => {
      let createdProject = projectFactory({
        title: project.title
      });
      project.todos.forEach(todo => {
        createdProject.addTodo(todoFactory(todo));
      });
      projects.addProject(createdProject);
    });
    return { projects: projects.getProjects() };
  }
  return result;
};

const projects = app(getProjects());

display.render(projects);
displayController(projects, display);

// todo item
import { projectList } from "./projectList";
import { todoFactory } from "./todoFactory";
import { projectFactory } from "./projectFactory";
import displayController from "./displayController";
import display from "./display";
import { parseISO } from "date-fns";

// when do you get it?

// get it when you initialize.

// when do you set it?

// when you add and when you remove

const getProjects = () => {
  const projects = projectList({});
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
        todo.dueDate = parseISO(todo.dueDate);
        createdProject.addTodo(todoFactory(todo));
      });
      projects.addProject(createdProject);
    });
    return { projects: projects.getProjects() };
  }
  console.log(result);
  return result;
};

const projects = projectList(getProjects());

display.render(projects);
displayController(projects, display);

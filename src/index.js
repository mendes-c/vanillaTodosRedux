// todo item
import { app } from "./app";
import { todoFactory } from "./todos";
import { projectFactory } from "./projects";
import displayController from "./displayController";
import display from "./display";

const projects = app({});
projects.addProject(
  projectFactory({
    title: "thing one",
    todos: [
      todoFactory({ title: "1" }),
      todoFactory({ title: "2" }),
      todoFactory({ title: "1" })
    ]
  })
);
projects.addProject(
  projectFactory({
    title: "project 2",
    todos: [
      todoFactory({ title: "one" }),
      todoFactory({ title: "two" }),
      todoFactory({ title: "three" }),
      todoFactory({ title: "four" })
    ]
  })
);

display.render(projects);
displayController(projects, display);

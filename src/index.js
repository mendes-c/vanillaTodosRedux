// todo item
import { todoFactory } from "./todos";
import { projectFactory } from "./projects";
import displayController from "./displayController";
import display from "./display";

let projects = [
  projectFactory({
    title: "project 1",
    todos: [
      todoFactory({ title: "1" }),
      todoFactory({ title: "2" }),
      todoFactory({ title: "3" })
    ]
  }),
  projectFactory({
    title: "project 2",
    todos: [
      todoFactory({ title: "one" }),
      todoFactory({ title: "two" }),
      todoFactory({ title: "three" }),
      todoFactory({ title: "four" })
    ]
  })
];

display.render(projects);
displayController(projects, display);

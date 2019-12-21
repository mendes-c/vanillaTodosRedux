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
display.render(projects);

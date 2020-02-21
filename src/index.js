// todo item
import { projectList } from './projectList';
import { displayController, getProjects } from './displayController';
import display from './display';

const projects = projectList(getProjects(projectList({})));

display.render(projects);
displayController(projects, display);

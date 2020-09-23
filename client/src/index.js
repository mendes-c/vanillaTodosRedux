// todo item
import { projectList } from './projectList';
import { displayController, getProjects } from './displayController';
import { render } from './display';

const projects = projectList(getProjects(projectList({})));

render(projects);
displayController(projects);

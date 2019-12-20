// todo item
import { todoFactory } from './todos';
import { projectFactory } from './projects';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
M.AutoInit();

let projects = [];

// project - a list of todos

// let project = [todoItem, todoItem, todoItem];

// need todoItem factory
//      project factory

// keep logic separated.
const display = (() => {
  const render = () => {
    let main = document.querySelector('#main');
    let collapsableUL = document.createElement('ul');
    collapsableUL.className = 'collapsible';
    projects.forEach((project) => {
      let li = document.createElement('li');
      let header = document.createElement('div');
      let body = document.createElement('div');
      header.className = 'collapsible-header';
      body.className = 'collapsible-body';
      header.textContent = project.getTitle();
      body.textContent = 'testing';
      li.appendChild(header);
      li.appendChild(body);
      collapsableUL.appendChild(li);
    });
  };
  return { render };
})();

import { parse } from 'date-fns';
import { todoFactory } from './todoFactory';
import { projectFactory } from './projectFactory';
import { parseISO } from 'date-fns';

export const displayController = (projects, display) => {
  document.querySelector('#main').addEventListener('click', (e) => {
    if (e.target.textContent == 'delete_forever') {
      removeTodoController(e);
    }
    if (e.target.id == 'add-todo') {
      let parentList = e.target.parentNode.parentNode;
      parentList.appendChild(display.renderInput());
    }
    if (e.target.id == 'submitTodo') {
      submitTodoController(e);
    }
    // lazy selection
    if (Array.from(e.target.classList).includes('complete-icon')) {
      const todoId = e.target.parentNode.dataset.id;
      let projectId =
        e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
      let project = projects.getProjects().filter((project) => {
        return project.getId() == projectId;
      })[0];

      project.getTodos().forEach((todo) => {
        if (todoId == todo.getTodo().id) {
          todo.toggleComplete();
          console.log(todo.getTodo());
        }
      });
      let body = e.target.parentNode.parentNode.parentNode;
      updateLocalStorage(projects);

      body.innerHTML = '';
      display.renderTodos(project, body);
    }
  });

  // modal selection
  document.body.addEventListener('click', (e) => {
    if (e.target.id == 'addProject') {
      let value = document.querySelector('#projectTitle').value;
      projects.addProject(projectFactory({ title: value }));
      document.querySelector('#main').innerHTML = '';
      updateLocalStorage(projects);
      display.render(projects);
    }
  });

  const removeTodoController = (e) => {
    let projectId =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset
        .id;
    let body = e.target.parentNode.parentNode.parentNode.parentNode;
    let project = projects.getProjects().filter((project) => {
      return project.getId() == projectId;
    })[0];
    let id = e.target.parentNode.parentNode.dataset.id;
    projects.getProjects().forEach((project) => {
      project.removeTodo(id);
    });
    updateLocalStorage(projects);
    body.innerHTML = '';
    display.renderTodos(project, body);
  };

  const submitTodoController = (e) => {
    e.preventDefault();
    let title = document.querySelector('#title').value;
    if (title == '') title = 'Title';
    let dueDate = parse(
      document.querySelector('#dueDate').value,
      'yyyy-MM-dd',
      new Date()
    );
    if (dueDate == 'Invalid Date') dueDate = new Date();

    let projectId = ((el) => {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.dataset.id) return el;
      }
    })(e.target.parentNode).dataset.id;

    let project = projects.getProjects().filter((project) => {
      return project.getId() == projectId;
    })[0];
    project.addTodo(todoFactory({ title, dueDate }));

    // turn this traversal into a helper function with (el, thing?)
    let body = ((el) => {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.classList.contains('collapsible-body')) return el;
      }
    })(e.target.parentNode);
    updateLocalStorage(projects);
    body.innerHTML = '';
    display.renderTodos(project, body);
  };

  const updateLocalStorage = (projects) => {
    localStorage.setItem('projects', projects.projectsToJSON());
  };
};

export const getProjects = (projects) => {
  let data = localStorage.getItem('projects');
  let result = { projects: [] };
  if (data) {
    JSON.parse(data).forEach((project) => {
      result.projects.push(project);
    });
    result.projects.forEach((project) => {
      let createdProject = projectFactory({
        title: project.title
      });
      project.todos.forEach((todo) => {
        todo.dueDate = parseISO(todo.dueDate);
        createdProject.addTodo(todoFactory(todo));
      });
      projects.addProject(createdProject);
    });
    return { projects: projects.getProjects() };
  }
  return result;
};

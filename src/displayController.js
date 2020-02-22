import { parse } from 'date-fns';
import { todoFactory } from './todoFactory';
import { projectFactory } from './projectFactory';
import { parseISO } from 'date-fns';

export const displayController = (projects, display) => {
  const getProjectId = providedElement => {
    return (el => {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.dataset.id) return el;
      }
    })(providedElement).dataset.id;
  };

  const updateProjects = () => {
    document.querySelector('#main').innerHTML = '';
    updateLocalStorage(projects);
    display.render(projects);
  };
  const updateTodos = (project, el) => {
    let body = (el => {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.classList.contains('collapsible-body')) return el;
      }
    })(el);

    updateLocalStorage(projects);
    body.innerHTML = '';
    display.renderTodos(project, body);
  };
  document.querySelector('#main').addEventListener('click', e => {
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
    // toggle complete
    if (Array.from(e.target.classList).includes('complete-icon')) {
      const todoId = e.target.parentNode.dataset.id;
      let projectId =
        e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
      let project = projects.getProjects().filter(project => {
        return project.getId() == projectId;
      })[0];

      project.getTodos().forEach(todo => {
        if (todoId == todo.getTodo().id) {
          todo.toggleComplete();
        }
      });

      updateTodos(project, e.target.parentNode);
    }
  });

  document.body.addEventListener('click', e => {
    // add project
    if (e.target.id == 'addProject') {
      let value = document.querySelector('#projectTitle').value;
      projects.addProject(projectFactory({ title: value }));
      updateProjects();
    }
    // remove project
    if (e.target.classList.contains('secondary-header-content')) {
      let id = e.target.parentNode.parentNode.dataset.id;
      projects.removeProject(id);
      updateProjects();
    }
  });

  const removeTodoController = e => {
    let projectId =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset
        .id;
    let project = projects.getProjects().filter(project => {
      return project.getId() == projectId;
    })[0];
    let id = e.target.parentNode.parentNode.dataset.id;
    projects.getProjects().forEach(project => {
      project.removeTodo(id);
    });
    updateTodos(project, e.target.parentNode);
  };

  const submitTodoController = e => {
    e.preventDefault();
    let title = document.querySelector('#title').value;
    if (title == '') title = 'Title';
    let dueDate = parse(
      document.querySelector('#dueDate').value,
      'yyyy-MM-dd',
      new Date()
    );
    if (dueDate == 'Invalid Date') dueDate = new Date();

    let projectId = getProjectId(e.target.parentNode);

    let project = projects.getProjects().filter(project => {
      return project.getId() == projectId;
    })[0];
    project.addTodo(todoFactory({ title, dueDate }));

    // turn this traversal into a helper function with (el, thing?)
    updateTodos(project, e.target.parentNode);
  };

  const updateLocalStorage = projects => {
    localStorage.setItem('projects', projects.projectsToJSON());
  };
};

export const getProjects = projects => {
  let data = localStorage.getItem('projects');
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
  return result;
};

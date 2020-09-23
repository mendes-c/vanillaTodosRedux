import { parse } from 'date-fns';
import { todoFactory } from './todoFactory';
import { projectFactory } from './projectFactory';
import { parseISO } from 'date-fns';
import { render, renderTodos, renderInput } from './display';

export const displayController = projects => {
  const getProjectId = providedElement => {
    return (el => {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.dataset.projectid) return el;
      }
    })(providedElement).dataset.projectid;
  };

  const getTodoId = providedElement => {
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
    render(projects);
  };
  const updateTodos = (project, el) => {
    let collapsibleBody = (el => {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.classList.contains('collapsible-body')) return el;
      }
    })(el);
    updateLocalStorage(projects);
    collapsibleBody.innerHTML = '';
    renderTodos(project, collapsibleBody);
  };
  document.querySelector('#main').addEventListener('click', e => {
    if (e.target.textContent == 'delete_forever') {
      removeTodoController(e);
    }
    // should switch from id targeting to class targeting, these id's are not unique.
    if (e.target.id == 'add-todo') {
      let parentList = e.target.parentNode.parentNode;
      parentList.appendChild(renderInput());
    }
    if (e.target.id == 'submitTodo') {
      submitTodoController(e);
    }
    // toggle complete
    if (Array.from(e.target.classList).includes('complete-icon')) {
      const todoId = getTodoId(e.target);
      const projectid = getProjectId(e.target);
      const project = projects.getProjects().filter(project => {
        return project.getId() == projectid;
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
      let id = e.target.parentNode.parentNode.dataset.projectid;
      projects.removeProject(id);
      updateProjects();
    }
  });

  const removeTodoController = e => {
    let projectid = getProjectId(e.target);
    let project = projects.getProjects().filter(project => {
      return project.getId() == projectid;
    })[0];
    let id = getTodoId(e.target);
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

    let projectid = getProjectId(e.target.parentNode);

    // use different array method here
    let project = projects.getProjects().filter(project => {
      return project.getId() == projectid;
    })[0];

    project.addTodo(todoFactory({ title, dueDate }));

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

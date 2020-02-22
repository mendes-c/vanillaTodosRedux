import { createAndAppend } from './util';
import { format } from 'date-fns';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const render = projects => {
  let main = document.querySelector('#main');
  let collapsableUL = createAndAppend({
    el: 'ul',
    id: 'collapsible-margin',
    className: 'collapsible'
  });
  projects.getProjects().forEach(project => {
    renderProject(project, collapsableUL);
  });
  // dont have to render nav each time - move this out
  main.appendChild(renderNav());
  main.appendChild(collapsableUL);
  // the following does not clear the modal element after it is used. just keeps getting rendered and rendered
  main.insertAdjacentElement('afterend', renderModal());
  M.AutoInit(); // figure out how to run this on page load complete
};

const renderProject = (project, collapsableUL) => {
  let li = createAndAppend({
    el: 'li',
    attr: { text: 'data-projectid', content: project.getId() },
    children: [
      createAndAppend({
        el: 'div',
        className: 'collapsible-header',
        children: [
          createAndAppend({
            el: 'h5',
            content: project.getTitle()
          }),
          createAndAppend({
            el: 'i',
            content: 'delete',
            className:
              'secondary-header-content tiny material-icons red-text text-lighten-4'
          })
        ]
      })
    ]
  });
  let collapsibleBody = createAndAppend({
    el: 'div',
    className: 'collapsible-body'
  });
  renderTodos(project, collapsibleBody);

  li.appendChild(collapsibleBody);
  collapsableUL.appendChild(li);
};

const renderTodos = (project, collapsibleBody) => {
  let ul = createAndAppend({ el: 'ul', className: 'collection' });
  let todos = project.getTodos();
  todos.forEach(todo => {
    // easier to do in react
    let completeClass = 'material-icons circle white grey-text complete-icon';

    if (todo.getTodo().complete) {
      completeClass = 'material-icons circle teal complete-icon';
    }

    createAndAppend({
      el: 'li',
      attr: { text: 'data-id', content: todo.getTodo().id },
      className: 'collection-item avatar',
      children: [
        createAndAppend({
          el: 'i',
          className: completeClass,
          content: 'check_circle_outline'
        }),
        createAndAppend({
          el: 'div',
          content: todo.getTodo().title
        }),
        createAndAppend({
          el: 'a',
          attr: { text: 'href', content: '#!' },
          className: 'secondary-content',
          children: createAndAppend({
            el: 'i',
            className: 'small material-icons red-text text-lighten-2',
            content: 'delete_forever'
          })
        }),
        createAndAppend({
          el: 'div',
          content: format(todo.getTodo().dueDate, 'MM/dd/yyyy')
        })
      ],
      parent: ul
    });
  });
  createAndAppend({
    el: 'li',
    className: 'collection-item right-align',
    children: createAndAppend({
      el: 'a',
      className: 'btn-floating waves-effect teal lighten-5 add-todo',

      children: createAndAppend({
        el: 'i',
        className: 'material-icons teal-text right-align',
        content: 'add',
        id: 'add-todo'
      })
    }),
    parent: ul
  });
  collapsibleBody.appendChild(ul);
};

const renderNav = () => {
  return createAndAppend({
    el: 'nav',
    className: 'teal lighten-3',
    children: createAndAppend({
      el: 'div',
      className: 'nav-wrapper',
      children: [
        createAndAppend({
          el: 'ul',
          className: 'right',
          children: [
            createAndAppend({
              el: 'li',
              children: createAndAppend({
                el: 'a',
                className: 'waves-effect teal-text text-darken-4 modal-trigger',
                attr: { text: 'href', content: '#modal1' },
                content: 'New Project'
              })
            })
          ]
        })
      ]
    })
  });
};
const renderInput = () => {
  return createAndAppend({
    el: 'div',
    className: 'row left-align',
    children: [
      createAndAppend({
        el: 'form',
        className: 'col s12',
        children: [
          createAndAppend({
            el: 'div',
            className: 'row',
            children: [
              createAndAppend({
                el: 'div',
                className: 'input-field col s12',
                children: [
                  createAndAppend({
                    el: 'input',
                    id: 'title',
                    type: 'text',
                    className: 'validate'
                  }),
                  createAndAppend({
                    el: 'label',
                    attr: { text: 'for', content: 'title' },
                    content: 'Title'
                  })
                ]
              }),
              createAndAppend({
                el: 'div',
                className: 'input-field col s12',
                children: [
                  createAndAppend({
                    el: 'input',
                    id: 'dueDate',
                    type: 'date',
                    className: 'validate'
                  }),
                  createAndAppend({
                    el: 'label',
                    attr: { text: 'for', content: 'dueDate' },
                    content: 'Due Date'
                  })
                ]
              }),
              createAndAppend({
                el: 'div',
                className: 'input-field col s12',
                children: [
                  createAndAppend({
                    el: 'input',
                    id: 'submitTodo',
                    type: 'submit',
                    className: 'btn waves-effect waves-light'
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
};
const renderModal = () => {
  M.AutoInit();
  return createAndAppend({
    el: 'div',
    id: 'modal1',
    className: 'modal',
    children: [
      createAndAppend({
        el: 'div',
        className: 'modal-content',
        children: [
          createAndAppend({
            el: 'h5',
            content: 'Enter New Project Name'
          }),
          createAndAppend({
            el: 'div',
            className: 'input-field',
            children: [
              createAndAppend({
                el: 'input',
                attr: { text: 'type', content: 'text' },
                id: 'projectTitle',
                class: 'validate'
              }),
              createAndAppend({
                el: 'label',
                attr: { text: 'for', content: 'projectTitle' },
                content: 'Project Title'
              }),
              createAndAppend({
                el: 'a',
                id: 'addProject',
                attr: { text: 'href', content: '#!' },
                className: 'modal-close waves-effect waves-green btn-flat',
                content: 'Create'
              })
            ]
          })
        ]
      })
    ]
  });
};
export { render, renderTodos, renderInput };

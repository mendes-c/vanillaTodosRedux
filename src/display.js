import { createAndAppend } from "./util";
import { format } from "date-fns";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
M.AutoInit();

export default (() => {
  const render = projects => {
    let main = document.querySelector("#main");
    let collapsableUL = createAndAppend({
      el: "ul",
      id: "collapsible-margin",
      className: "collapsible"
    });
    projects.forEach(project => {
      renderProject(project, collapsableUL);
    });
    main.appendChild(renderNav());
    main.appendChild(collapsableUL);
    M.AutoInit(); // figure out how to run this on page load complete
  };

  const renderProject = (project, collapsableUL) => {
    let li = createAndAppend({
      el: "li",
      attr: { text: "data-id", content: project.getId() },
      children: [
        createAndAppend({
          el: "div",
          className: "collapsible-header",
          children: createAndAppend({
            el: "h5",
            content: project.getTitle()
          })
        })
      ]
    });
    let body = createAndAppend({
      el: "div",
      className: "collapsible-body"
    });
    renderTodos(project, body);

    li.appendChild(body);
    collapsableUL.appendChild(li);
  };

  const renderTodos = (project, body) => {
    let ul = createAndAppend({ el: "ul", className: "collection" });
    let todos = project.getTodos();
    todos.forEach(todo => {
      let li = createAndAppend({
        el: "li",
        attr: { text: "data-id", content: todo.getTodo().id },
        className: "collection-item",
        children: [
          createAndAppend({
            el: "div",
            content: todo.getTodo().title
          }),

          createAndAppend({
            el: "span",
            content: todo.getTodo().description
          }),
          createAndAppend({
            el: "a",
            attr: { text: "href", content: "#!" },
            className: "secondary-content",
            children: createAndAppend({
              el: "i",
              className: "small material-icons red-text text-lighten-1",
              content: "delete_forever"
            })
          }),
          createAndAppend({
            el: "div",
            content: format(todo.getTodo().dueDate, "MM/dd/yyyy")
          })
        ],
        parent: ul
      });
    });
    createAndAppend({
      el: "li",
      className: "collection-item right-align",
      children: createAndAppend({
        el: "a",
        className: "waves-effect waves-green btn-flat add-todo",
        children: createAndAppend({
          el: "i",
          className: "material-icons right-align",
          content: "add"
        })
      }),
      parent: ul
    });
    body.appendChild(ul);
  };

  const renderNav = () => {
    return createAndAppend({
      el: "nav",
      className: "blue lighten-2",
      children: createAndAppend({
        el: "div",
        className: "nav-wrapper",
        children: [
          createAndAppend({
            el: "ul",
            className: "right",
            children: [
              createAndAppend({
                el: "li",
                children: createAndAppend({
                  el: "a",
                  attr: { text: "href", content: "#!" },
                  content: "New Project"
                })
              })
            ]
          })
        ]
      })
    });
    // console.log(renderNav());
  };

  return { render, renderTodos };
})();

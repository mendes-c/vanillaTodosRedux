// todo item
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

let todoItem = {
  title: '',
  description: '',
  dueDate: '',
  priority: '',
  notes: '',
  complete: false
};

// project - a list of todos

let project = [todoItem, todoItem, todoItem];

// need todoItem factory
//      project factory

// keep logic seperated. setting todos status/details or project status/details should be

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
  console.log(M.Sidenav.init(elems));
});

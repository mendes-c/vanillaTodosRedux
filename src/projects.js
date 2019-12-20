const projectFactory = ({
  title = 'New Project',
  priority = false,
  todos = []
}) => {
  const state = {
    title,
    priority,
    todos
  };
  const getTodos = () => {
    return Object.assign([], state.todos);
  };
  const addTodo = (todo) => {
    state.todos.push(todo);
  };
  const removeTodo = (id) => {
    state.todos = state.todos.filter((todo) => {
      return todo.id !== id;
    });
  };
  const editTodo = (id) => {
    return state.todos.find((todo) => {
      return todo.id == id;
    });
  };

  const togglePriority = () => {
    state.priority = !state.priority;
  };

  const getTitle = () => {
    return state.title;
  };
  return { getTodos, addTodo, removeTodo, editTodo, togglePriority, getTitle };
};

export { projectFactory };

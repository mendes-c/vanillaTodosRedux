// title, description, dueDate and priority
import uuid from 'uuid/v4';
const todoFactory = ({
  title = 'New Todo',
  description = 'Description',
  dueDate = new Date(),
  complete = false,
  id = uuid()
}) => {
  let state = {
    title,
    description,
    dueDate,
    complete
  };
  const toggleComplete = () => {
    state.complete = !state.complete;
  };
  const getTodo = () => {
    return Object.assign({}, state);
  };
  const editTodo = (edits) => {
    state = { ...edits };
  };
  return { getTodo, toggleComplete, editTodo };
};

export { todoFactory };

// title, description, dueDate and priority
import uuid from "uuid/v4";
const todoFactory = ({
  title = "New Todo",
  // description = "Description",
  dueDate = new Date(),
  complete = false
}) => {
  let state = {
    title,
    // description,
    dueDate,
    complete,
    id: uuid()
  };
  const toggleComplete = () => {
    state.complete = !state.complete;
  };
  const getTodo = () => {
    return Object.assign({}, state);
  };
  const editTodo = edits => {
    state = { ...state, ...edits };
  };
  return { getTodo, toggleComplete, editTodo };
};

export { todoFactory };

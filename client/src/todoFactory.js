import uuid from 'uuid/v4';
export const todoFactory = ({
  title = 'New Todo',
  dueDate = new Date(),
  complete = false
}) => {
  let state = {
    title,
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
  const editTodo = (edits) => {
    state = { ...state, ...edits };
  };
  return { getTodo, toggleComplete, editTodo };
};

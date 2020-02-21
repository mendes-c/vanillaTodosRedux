export const projectList = ({ projects = [] }) => {
  const state = {
    projects
  };
  const projectsToJSON = () => {
    let arr = projects.map((project) => {
      let result = { title: project.getTitle(), id: project.getId() };
      result.todos = project.getTodos().map((todo) => {
        return todo.getTodo();
      });
      return result;
    });
    return JSON.stringify(arr);
  };
  const getProjects = () => {
    return Object.assign([], state.projects);
  };
  const addProject = (project) => {
    state.projects.push(project);
  };
  const removeProject = (id) => {
    state.projects = state.projects.filter((project) => {
      return project.getId() !== id;
    });
  };
  const getProject = (id) => {
    return state.projects.find((project) => {
      return project.id == id;
    });
  };
  return {
    getProjects,
    addProject,
    removeProject,
    getProject,
    projectsToJSON
  };
};

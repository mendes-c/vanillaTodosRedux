const app = ({ projects = [] }) => {
  const state = {
    projects
  };
  const getProjects = () => {
    return Object.assign([], state.projects);
  };
  const addProject = project => {
    state.projects.push(project);
  };
  const removeProject = id => {
    state.projects = state.projects.filter(project => {
      return project.getId() !== id;
    });
  };
  const getProject = id => {
    return state.projects.find(project => {
      return project.id == id;
    });
  };
  return {
    getProjects,
    addProject,
    removeProject,
    getProject
  };
};

export { app };

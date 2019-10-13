import Tab from './Tab';
import TodoList from './TodoList';

export default class App {
  constructor(projects, todos) {
    this.tab = new Tab();
    this.projects = projects || [];
    this.todos = new TodoList(todos);
    this.priorities = [
      'Emergency',
      'Urgent',
      'High',
      'Medium',
      'Low',
      'Optional',
    ];
    this.filter = null;
    this.curProjIcon = 'flaticon-home';
  }

  addProject(project) {
    this.projects.push(project);
    localStorage.setItem('todoapp.projects', JSON.stringify(this.projects));
    return project;
  }

  deleteProject(project) {
    this.projects = this.projects.filter(proj => proj !== project);
    localStorage.setItem('todoapp.projects', JSON.stringify(this.projects));
    return project;
  }

  getProjects() {
    return this.projects;
  }

  getPriorities() {
    return this.priorities;
  }

  getCurProjIcon() {
    return this.curProjIcon;
  }

  setCurProjIcon(icon) {
    this.curProjIcon = icon;
    return icon;
  }

  addTodo(todo) {
    this.todos.add(todo);
    localStorage.setItem('todoapp.todos', JSON.stringify(this.todos.todos));
    return todo;
  }

  toggleTodo(todo) {
    todo.checked = !todo.checked;
    localStorage.setItem('todoapp.todos', JSON.stringify(this.todos.todos));
    return todo;
  }

  getTodos(filter) {
    this.filter = filter;
    return this.todos.get(filter);
  }

  getFilter() {
    return this.filter;
  }

  addTab(tab) {
    this.tab.add(tab);
    return tab;
  }

  getActiveTab() {
    return this.tab.getActive();
  }

  setActiveTab(tab) {
    this.tab.setActive(tab);
    return tab;
  }

  search(string) {
    const cands = this.todos.search(string);
    return cands;
  }
}

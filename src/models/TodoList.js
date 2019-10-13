// import datefns from 'date-fns';
import Todo from './Todo';

export default class TodoList {
  constructor(todos) {
    this.todos = (todos && todos.map(todo => new Todo(todo))) || [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  get(filter) {
    let { todos } = this;
    if (filter === undefined || filter === null) return this.todos;
    Object.keys(filter).forEach(key => {
      switch (key) {
        case 'project':
          todos = todos.filter(todo => todo.project === filter.project);
          break;
        case 'priority':
          todos = todos.filter(todo => todo.priority === filter.priority);
          break;
        case 'interval':
          todos = todos.filter(
            todo => todo.getInterval() === filter.interval.toLowerCase()
          );
          break;
        case 'checked':
          todos = todos.filter(todo => todo.checked === filter.checked);
          break;
        case 'search':
          todos = [filter.search].concat(
            todos.filter(
              todo =>
                todo !== filter.search &&
                todo.getInterval() === filter.search.getInterval()
            )
          );
          break;
        default:
          break;
      }
    });
    return todos;
  }

  search(string) {
    const todos = this.todos.filter(todo =>
      todo.title.toLowerCase().includes(string.toLowerCase())
    );
    return todos;
  }
}

import Todo from './Todo';
import Aside from './Aside';
import { el, mount } from '../utils';

const Content = store => {
  const todos = store.getTodos({ interval: 'today' });
  const header = el('h2', null, el('span', null, 'today'));
  const list = el(
    'ul',
    { class: 'content' },
    todos.map(todo => Todo(store, todo))
  );
  store.on('getTodos', todos => {
    const filter = store.getFilter();
    mount(
      Object.keys(filter).map(key =>
        el(
          'span',
          null,
          (key === 'checked' && 'Done') ||
            (key === 'search' && todos[0].getInterval()) ||
            filter[key]
        )
      ),
      header
    );
    mount(todos.map(todo => Todo(store, todo)), list);
  });
  store.on('addTodo', todo => {
    const interval = todo.getInterval();
    const todos = store.getTodos({ interval });
    mount(el('span', null, interval), header);
    mount(todos.map(todo => Todo(store, todo)), list);
  });
  store.on('toggleTodo', () => {
    const filter = store.getFilter();
    const todos = store.getTodos(filter);
    mount(todos.map(todo => Todo(store, todo)), list);
  });
  return el('section', { id: 'viewer' }, [header, list]);
};

const Main = store =>
  el('main', { id: 'main' }, [Aside(store), Content(store)]);

export default Main;

import { format } from 'date-fns';
import { el } from '../utils';

const classOf = priority => {
  switch (priority.toLowerCase()) {
    case 'emergency':
      return 'red';
    case 'urgent':
      return 'orange';
    case 'high':
      return 'purple';
    case 'medium':
      return 'yellow';
    case 'low':
      return 'green';
    case 'optional':
      return 'grey';
    default:
      return '';
  }
};

const Todo = (store, todo) => {
  const details = el('div', { class: 'details' }, [
    el('p', null, [
      el('span', null, [el('b', null, 'Project :'), todo.project]),
      el('span', null, [el('b', null, 'Priority :'), todo.priority]),
      el('span', null, [
        el('b', null, 'Due date :'),
        format(todo.dueDate, 'yyyy-MM-dd'),
      ]),
    ]),
    el('p', { class: 'description' }, [el('i', null, '>'), todo.description]),
  ]);
  return el('li', { class: 'todo' }, [
    el(
      'span',
      {
        class: `checklist ${classOf(todo.priority)}`,
        onclick() {
          store.toggleTodo(todo);
        },
      },
      todo.checked ? el('i', { class: 'fi flaticon-tick' }) : el('')
    ),
    el('span', { class: 'title' }, todo.title),
    el('span', { class: 'date' }, todo.getInterval().toUpperCase()),
    el(
      'i',
      {
        class: 'more',
        onclick() {
          details.classList.toggle('show');
        },
      },
      '+'
    ),
    details,
  ]);
};

export default Todo;

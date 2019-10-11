import { format } from 'date-fns';
import Todo from '../models/Todo';
import { el, mount, extract } from '../utils';

const TodoForm = store => {
  const projects = store.getProjects();
  const priorities = store.getPriorities();
  const projectsInput = el(
    'select',
    { name: 'project' },
    projects.map(p => el('option', null, p.title))
  );
  store.on('addProject', () => {
    const projects = store.getProjects();
    mount(projects.map(p => el('option', null, p.title)), projectsInput);
  });
  store.on('deleteProject', () => {
    const projects = store.getProjects();
    mount(projects.map(p => el('option', null, p.title)), projectsInput);
  });
  return el(
    'form',
    {
      id: 'form',
      onsubmit(e) {
        e.preventDefault();
        const data = extract(
          ['title', 'description', 'project', 'priority', 'dueDate'],
          e.target
        );
        store.addTodo(new Todo(data));
        e.target.classList.remove('show');
        e.target.reset();
      },
    },
    [
      el('div', { class: 'field' }, [
        el('label', null, 'Title'),
        el('input', { type: 'text', name: 'title' }),
      ]),
      el('div', { class: 'field' }, [
        el('label', null, 'Description'),
        el('textarea', { name: 'description' }),
      ]),
      el('div', { class: 'field' }, [
        el('label', null, 'Project'),
        projectsInput,
      ]),
      el('div', { class: 'field' }, [
        el('label', null, 'Priority'),
        el(
          'select',
          { name: 'priority' },
          priorities.map(p => el('option', null, p))
        ),
      ]),
      el('div', { class: 'field' }, [
        el('label', null, 'Due date'),
        el('input', {
          type: 'date',
          name: 'dueDate',
          value: format(new Date(), 'yyyy-MM-dd'),
        }),
      ]),
      el('button', { type: 'submit' }, 'Submit'),
    ]
  );
};

export default TodoForm;

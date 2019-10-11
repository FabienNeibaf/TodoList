import { el, mount } from '../utils';
import TodoForm from './TodoForm';

const proposals = el('div', { id: 'proposals' });
document.body.addEventListener('click', e => {
  if (!document.getElementById('search').contains(e.target))
    proposals.classList.remove('show');
});

const Header = store => {
  const form = TodoForm(store);
  return el('header', { id: 'header' }, [
    el('h1', null, 'Tada'),
    el('ul', { id: 'search' }, [
      el('input', {
        type: 'text',
        placeholder: 'Search',
        oninput(e) {
          const { value } = e.target;
          const cands = store.search(value);
          proposals.classList.add('show');
          mount(
            cands.map(todo =>
              el(
                'li',
                {
                  onclick() {
                    e.target.value = '';
                    proposals.classList.remove('show');
                    store.getTodos({ search: todo });
                  },
                },
                todo.title
              )
            ),
            proposals
          );
        },
      }),
      proposals,
    ]),
    el('div', { id: 'addTodo' }, [
      el(
        'button',
        {
          onclick(e) {
            if (e.target === this) form.classList.toggle('show');
          },
        },
        'Add Todo'
      ),
      form,
    ]),
  ]);
};

export default Header;

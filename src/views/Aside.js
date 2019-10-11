import Project from './Project';
import Priority from './Priority';
import { el, mount } from '../utils';

const Tab = store => {
  const project = Project(store);
  const priority = Priority(store);
  const tab = el('ul', { class: 'tab' }, [
    el(
      'li',
      {
        class: 'active',
        onclick() {
          store.setActiveTab({ title: 'Projects', content: project });
        },
      },
      'Projects'
    ),
    el(
      'li',
      {
        onclick() {
          store.setActiveTab({ title: 'Priorities', content: priority });
        },
      },
      'Priorities'
    ),
  ]);
  store.on('setActiveTab', active => {
    Array.prototype.slice.call(tab.children).forEach(child => {
      if (child.innerHTML === active.title) child.classList.add('active');
      else child.classList.remove('active');
    });
  });
  return tab;
};

const Aside = store => {
  const host = el('div', { class: 'content' }, Project(store));
  store.on('setActiveTab', tab => {
    mount(tab.content, host);
  });
  return el('aside', { id: 'aside' }, [
    el('nav', null, [
      el('ul', { class: 'date' }, [
        el(
          'li',
          null,
          el(
            'button',
            {
              onclick() {
                store.getTodos({ checked: true });
              },
            },
            'Done'
          )
        ),
        el(
          'li',
          null,
          el(
            'button',
            {
              onclick() {
                store.getTodos({ interval: 'today' });
              },
            },
            'Today'
          )
        ),
        el(
          'li',
          null,
          el(
            'button',
            {
              onclick() {
                store.getTodos({ interval: 'This week' });
              },
            },
            'This week'
          )
        ),
        el(
          'li',
          null,
          el(
            'button',
            {
              onclick() {
                store.getTodos({ interval: 'upcoming' });
              },
            },
            'Upcoming'
          )
        ),
      ]),
      Tab(store),
    ]),
    host,
  ]);
};

export default Aside;

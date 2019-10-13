import { el } from '../utils';

const item = (store, proj) =>
  el(
    'li',
    {
      data: proj.title,
      onclick() {
        store.getTodos({ project: proj.title });
      },
    },
    [
      el('i', { class: `fi ${proj.icon}` }),
      el('span', null, proj.title),
      el(
        'i',
        {
          class: 'del',
          onclick(e) {
            e.stopPropagation();
            store.deleteProject(proj);
          },
        },
        'x'
      ),
    ]
  );

const icons = [
  'flaticon-home',
  'flaticon-worker',
  'flaticon-shopping',
  'flaticon-runner',
  'flaticon-plane',
  'flaticon-meeting',
  'flaticon-college',
  'flaticon-cake',
  'flaticon-party',
  'flaticon-doctor',
  'flaticon-dentist',
  'flaticon-walk',
];

const $icon = (store, type, choice) =>
  el(
    'li',
    {
      onclick() {
        store.setCurProjIcon(type);
        const list = choice.parentNode.querySelector('ul');
        list.classList.add('hide');
        choice.className = `choice fi ${type}`;
      },
    },
    el('i', {
      class: `fi ${type}`,
    })
  );

const Project = store => {
  const projects = store.getProjects();
  const input = el('input', { type: 'text' });
  const choice = el('i', {
    class: 'choice fi flaticon-home',
    onclick(e) {
      const parent = e.target.parentNode;
      const list = parent.querySelector('ul');
      list.classList.toggle('hide');
    },
  });
  const $icons = el('div', { id: 'proj-icons' }, [
    choice,
    el('ul', { class: 'hide' }, icons.map(icon => $icon(store, icon, choice))),
  ]);
  const list = el('ul', { class: 'list' }, [
    el('li', { class: 'add' }, [
      $icons,
      input,
      el(
        'button',
        {
          onclick() {
            const { value } = input;
            store.addProject({
              icon: store.getCurProjIcon(),
              title: value
                .toLowerCase()
                .replace(/^./, value.charAt(0).toUpperCase()),
            });
            input.value = '';
          },
        },
        '+'
      ),
    ]),
    ...projects.map(proj => item(store, proj)),
  ]);
  store.on('addProject', proj => list.appendChild(item(store, proj)));
  store.on('deleteProject', proj => {
    const target = Array.prototype.slice
      .call(list.children)
      .filter(child => child.getAttribute('data') === proj.title)[0];
    list.removeChild(target);
  });
  return el('div', { id: 'project' }, list);
};

export default Project;

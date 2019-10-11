import { el } from '../utils';

const Priority = store => {
  const list = [
    { color: 'red', level: 'Emergency' },
    { color: 'orange', level: 'Urgent' },
    { color: 'purple', level: 'High' },
    { color: 'yellow', level: 'Medium' },
    { color: 'green', level: 'Low' },
    { color: 'gray', level: 'Optional' },
  ];
  return el(
    'ul',
    { id: 'priority' },
    list.map(p =>
      el(
        'li',
        {
          class: p.color,
          onclick() {
            store.getTodos({ priority: p.level });
          },
        },
        [el('i'), el('span', null, p.level)]
      )
    )
  );
};

export default Priority;

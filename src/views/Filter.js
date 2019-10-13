import { el } from '../utils';

const Filter = () => {
  return el('ul', { id: 'filter' }, [
    el('li', null, 'Project'),
    el('li', null, 'Priority'),
    el('li', null, 'Date'),
  ]);
};

export default Filter;

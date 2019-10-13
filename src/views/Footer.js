import { el } from '../utils';

const Footer = () =>
  el('footer', { id: 'footer' }, [
    'Powered by',
    el(
      'a',
      { href: 'https://github.com/FabienNeibaf/', target: '_blank' },
      'Fabien'
    ),
  ]);

export default Footer;

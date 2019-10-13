import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { el } from '../utils';

const App = store =>
  el('section', { id: 'app' }, [Header(store), Main(store), Footer()]);

export default App;

import './index.scss';
import App from './views/App';
import AppModel from './models/App';
import { mount, Observable } from './utils';

const todos = JSON.parse(localStorage.getItem('todoapp.todos'));
const projects = JSON.parse(localStorage.getItem('todoapp.projects'));

const store = new Observable(new AppModel(projects, todos));

mount(App(store), document.getElementById('root'));

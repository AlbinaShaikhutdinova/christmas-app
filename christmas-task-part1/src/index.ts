import { Controller } from './controller/controller';
import { fetchData } from './utils/dataLoader';
import { Toy } from './model/Toy/Toy';

import './index.scss';

fetchData('https://raw.githubusercontent.com/AlbinaShaikhutdinova/projects-data/main/christmas-toys.json', initApp);

function initApp(data: Toy[]) {
    const app = new Controller(data);
}

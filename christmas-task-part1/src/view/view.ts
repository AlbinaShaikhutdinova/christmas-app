import { Toy } from '../model/Toy/Toy';
import { ToysView } from './ToysView/toysView';

export class View {
    toysView: ToysView;
    constructor(data: Toy[]) {
        this.toysView = new ToysView();
        this.toysView.drawPage();
        this.toysView.drawItems(data);
    }
    updateItems<T>(data: T) {
        this.toysView.drawItems((data as unknown) as Toy[]);
    }
}

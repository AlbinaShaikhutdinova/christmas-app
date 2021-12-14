import { Toy } from '../model/Toy/Toy';
import { ToysView } from './ToysView/toysView';
import { FiltersView } from './ToysView/filtersView';
import { Filter } from '../model/Toy/filter';

export class View {
    toysView: ToysView;
    filtersView: FiltersView
    constructor(data: Toy[], filters: Filter[]) {
        this.toysView = new ToysView();
        this.filtersView = new FiltersView();
       
        this.toysView.drawPage();
        this.filtersView.drawFilters(filters);
        this.toysView.drawItems(data);

    }
    updateItems<T>(data: T) {
        this.toysView.drawItems((data as unknown) as Toy[]);
    }
}

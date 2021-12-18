import { Toy } from '../model/Toy/Toy';
import { ToysView } from './ToysView/toysView';
import { FiltersView } from './ToysView/filtersView';
import { BoolValuesFilter, EnumValuesFilter, FilterBlock, RangeFilter } from '../model/Toy/filter';

export class View {
    toysView: ToysView;
    filtersView: FiltersView
    constructor() {
        this.toysView = new ToysView();
        this.filtersView = new FiltersView();
       
        this.toysView.drawPage();
        
    }
    drawToys(data: Toy[], filters: FilterBlock[], currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>){
        this.filtersView.drawFilters(filters, currentFilters);
        this.toysView.drawItems(data);
        
    }
    updateItems<T>(data: T, currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>) {
        this.toysView.drawItems((data as unknown) as Toy[]);
        this.filtersView.updateFilterItemState(currentFilters);
    }
}

import { Toy } from '../model/Toy/Toy';
import { ToysView } from './ToysView/toysView';
import { FiltersView } from './ToysView/filtersView';
import { SortView } from './ToysView/sortView';
import { sortOrder } from '../utils/types';
import { BoolValuesFilter, EnumValuesFilter, FilterBlock, RangeFilter } from '../model/Toy/filter';

export class View {
    toysView: ToysView;
    filtersView: FiltersView;
    sortView: SortView;
    constructor() {
        this.toysView = new ToysView();
        this.filtersView = new FiltersView();
        this.sortView = new SortView();
        this.toysView.drawPage();
        
    }
    drawToys(data: Toy[], filters: FilterBlock[],
        currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>,
        currentSortOrder: sortOrder, chosenList: Toy[]){
        console.log('draw');
        this.filtersView.drawFilters(filters, currentFilters);
        this.toysView.drawItems(data, chosenList);
        this.sortView.drawSort();
        this.sortView.updateSortItemState(currentSortOrder);
    }
    updateItems<T>(data: T, currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>,
         chosenList: Toy[]) {
        console.log('update');
        this.toysView.drawItems((data as unknown) as Toy[], chosenList);
        this.filtersView.updateFilterItemState(currentFilters);
    }
}

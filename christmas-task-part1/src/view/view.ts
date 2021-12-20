import { Toy } from '../model/Toy/Toy';
import { ToysView } from './ToysView/toysView';
import { FiltersView } from './ToysView/filtersView';
import { SortView } from './ToysView/sortView';
import { sortOrder } from '../utils/types';
import { SearchView } from './ToysView/searchView';
import { BoolValuesFilter, EnumValuesFilter, FilterBlock, RangeFilter } from '../model/Toy/filter';

export class View {
    toysView: ToysView;
    filtersView: FiltersView;
    sortView: SortView;
    searchView: SearchView;
    constructor() {
        this.toysView = new ToysView();
        this.filtersView = new FiltersView();
        this.sortView = new SortView();
        this.searchView = new SearchView();
        this.toysView.drawPage();
    }
    drawToys(data: Toy[], filters: FilterBlock[],
        currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>,
        currentSortOrder: sortOrder, chosenList: string[]){
        this.filtersView.drawFilters(filters, currentFilters);
        this.toysView.drawItems(data, chosenList);
        this.sortView.drawSort();
        this.searchView.initSearchElement();
        this.sortView.updateSortItemState(currentSortOrder);
    }
    updateItems<T>(data: T, currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>,
        chosenList: string[]) {
        this.toysView.drawItems((data as unknown) as Toy[], chosenList);
        this.filtersView.updateFilterItemState(currentFilters);
    }
    updateChosenItemsView<T>(item?: T, list?: string[]){
        const chosen = item as unknown as string;
        if(chosen)
        {
            this.toysView.updateChosenItem(document.getElementById(chosen) as HTMLElement)
            this.toysView.updateCounter((list?.length as number).toString());
        }
        else this.toysView.showModal();
    }
    
}

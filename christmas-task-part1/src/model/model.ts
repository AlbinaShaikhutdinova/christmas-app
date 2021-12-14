import { Toy } from './Toy/Toy';
import { filterTypes } from '../utils/types';
import Event from '../controller/Events';

export class Model {
    toyList: Toy[];
    updateToyListEvent: Event;
    filteredToyList: Toy[];
    constructor(data: Toy[]) {
        this.toyList = data;
        this.filteredToyList = data;
        this.updateToyListEvent = new Event();
    }
    filter<T>(type: T) {
        const newType = (type as unknown) as { filterType: string; el: string };
        const fT = newType.filterType as keyof typeof filterTypes;
        const currentFilter = filterTypes[fT];
        console.log(currentFilter[newType.el as keyof typeof currentFilter]);
        const filterValue = currentFilter[newType.el as keyof typeof currentFilter];

        this.filteredToyList = this.filteredToyList.filter((item) => {
            return item[newType.filterType as keyof typeof item] === filterValue;
        });

        console.log(this.filteredToyList);

        this.updateToyListEvent.trigger<Toy[]>(this.filteredToyList);
    }
}

export type IFilter = {
    filterType: string;
    el: string;
};

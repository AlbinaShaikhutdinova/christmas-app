import { Toy } from './Toy/Toy';
import { filterTypes, toySize, toyShape, toyColor } from '../utils/types';
import Event from '../controller/Events';
import { Filter, FilterBuilder} from './Toy/filter';

export class Model {
    toyList: Toy[];
    updateToyListEvent: Event;
    filteredToyList: Toy[];
    filterOfValues: Filter;
    filterOfRanges: Filter;
    constructor(data: Toy[]) {
      const builder = new FilterBuilder;
      this.toyList = data;
      this.filteredToyList = data;
      this.filterOfValues = builder.initValuesFilter();
      console.log(this.filterOfValues);
      this.filterOfRanges = builder.initRangesFilter();

      this.updateToyListEvent = new Event();
    }
    initToys(){
      
      
    }
    
    filter<T>(type: T) {
        const newType = (type as unknown) as { temp: string; option: string };
        const fT = newType.temp as keyof typeof filterTypes;
        

        const currentFilter = filterTypes[fT];
        const filterValue = currentFilter[newType.option as keyof typeof currentFilter];
        if(this.isApplied(this.filterOfValues, fT)){
            this.filteredToyList = this.filteredToyList.filter((item) => {
              return item[newType.temp as keyof typeof item] != "";
          });
          console.log(this.filteredToyList)
        }

        
        this.filteredToyList = this.filteredToyList.filter((item) => {
            return item[newType.temp as keyof typeof item] === filterValue;
        });

        this.updateToyListEvent.trigger<Toy[]>(this.filteredToyList);
    }
    isApplied(filters: Filter, fT: keyof typeof filterTypes): boolean{
      let isApplied: boolean = false;
      filters.filterType.forEach(type => {
        if(fT === type.type)
        {
          if(type.isActive)
          {
            isApplied = true;
          }
          type.isActive = true;
        }
      })
      return isApplied;
    }
}

export type IFilter = {
    filterType: string;
    el: string;
};

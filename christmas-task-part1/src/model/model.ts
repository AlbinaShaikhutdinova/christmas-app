import { Toy } from './Toy/Toy';
import { filterBy } from '../utils/types';
import Event from '../controller/Events';
import { FilterBlock, FilterBlockBuilder,  EnumValuesFilter, BoolValuesFilter, RangeFilter} from './Toy/filter';

export class Model {
  toyList: Toy[];
  updateToyListEvent: Event;
  filteredToyList: Toy[];
  filters: FilterBlock[];
  currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>

  constructor(data: Toy[]) {
    const builder = new FilterBlockBuilder;
    this.toyList = data;
    this.filteredToyList = data;
    this.filters = builder.initAllFilters();
    this.currentFilters = [];
    this.updateToyListEvent = new Event();
  }
  saveFilters(){
    
    localStorage.setItem('filterList', JSON.stringify(this.currentFilters))
  }
  retrieveFilters(): Toy[]{
    //localStorage.clear();
    if(localStorage.getItem('filterList'))
    {
      const filtersData: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter> = JSON.parse(localStorage.getItem('filterList') as string);
      filtersData.forEach(filter => {
        switch(filter.filterType){
          case filterBy.enumVal: this.filterByStringValues(filter.name, (filter as EnumValuesFilter).option)
          break;
          case filterBy.boolVal: this.filterByBoolValues(filter.name, (filter as BoolValuesFilter).value)
          break;
          default: this.filterByRange(filter.name, [(filter as RangeFilter).minValue,(filter as RangeFilter).maxValue])
        }
      })
    }
    console.log(this.currentFilters);
    return this.filteredToyList;
  }
  updateFilteredList(){
    let newList = this.filterSingleChoice();
    this.filteredToyList = this.filterMultipleChoice(newList);
  }
  private loopThroughEnumFilters(newList: Toy[], attr: string){
    let finalList: Toy[] = [];
    this.currentFilters.forEach(filter => {
      if(filter.filterType === filterBy.enumVal && filter.name === attr)
      {
        finalList.push.apply(finalList,filter.filter(newList));
      }
    })
    if(finalList.length===0)
      finalList = newList;
    return finalList;
  }

  private filterMultipleChoice(newList: Toy[]){
    return ['shape', 'size', 'color'].reduce((accum, item) => {
      return this.loopThroughEnumFilters(accum, item);
    }, newList )
  }
  private filterSingleChoice(): Toy[]{
    return this.currentFilters.reduce((data, filter) =>
      {
        if(filter.filterType !== filterBy.enumVal)
        {
          return filter.filter(data)
        }
        else return data;
      }, this.toyList);
  }

  private addNewFilter(newFilter: EnumValuesFilter | BoolValuesFilter | RangeFilter){
    this.currentFilters.push(newFilter);
    this.filteredToyList = newFilter.filter(this.filteredToyList);
  }

  filterByBoolValues(attr: string, option: boolean){
    let newInstance = this.currentFilters.find(filter => filter.name === attr);
    if(newInstance)
    {
      const index = this.currentFilters.indexOf(newInstance);
      this.currentFilters.splice(index,1);
      this.updateFilteredList();
    }
    else{
      const newFilter = new BoolValuesFilter(attr, option);
      this.addNewFilter(newFilter);
    }
  }

  filterByRange(attr: string, option: number[]){
    let newInstance = this.currentFilters.find(filter => filter.name === attr);
    if(newInstance)
    {
      const index = this.currentFilters.indexOf(newInstance);
      (this.currentFilters[index] as RangeFilter).setMinvalue(option[0]);
      (this.currentFilters[index] as RangeFilter).setMaxvalue(option[1]);
      this.updateFilteredList();
    }
    else{
      const newFilter = new RangeFilter(attr, option[0], option[1]);
      this.addNewFilter(newFilter);
    }
  }

  filterByStringValues(attr: string, option: string){
    let newInstance = this.currentFilters.filter(filter => {return filter.name == attr});
    if(newInstance.length>0)
    {
      let enumInstance = newInstance.find(item =>(item as EnumValuesFilter).option === option )
      if(enumInstance)
      {
        const index = this.currentFilters.indexOf(enumInstance);
        this.currentFilters.splice(index,1);
      }
      else{
        const newFilter = new EnumValuesFilter(attr, option);
        this.currentFilters.push(newFilter);
      }
     this.updateFilteredList();
    }
    else{
      const newFilter = new EnumValuesFilter(attr, option);
      this.addNewFilter(newFilter);
    }
  }



  
  filter<T>(type: T) {
    const newAppliedFilter = (type as unknown) as {ft: string, attr: string, option: string | HTMLElement | boolean | number[] };
    console.log(newAppliedFilter)
    switch(newAppliedFilter.ft){
      case filterBy.enumVal: this.filterByStringValues(newAppliedFilter.attr, newAppliedFilter.option as string)
      break;
      case filterBy.boolVal: this.filterByBoolValues(newAppliedFilter.attr, (newAppliedFilter.option as HTMLInputElement).checked)
      break;
      default: this.filterByRange(newAppliedFilter.attr, (newAppliedFilter.option as number[]))
    }

    console.log(this.currentFilters);
    this.updateToyListEvent.trigger<Toy[]>(this.filteredToyList);
  }
  
}

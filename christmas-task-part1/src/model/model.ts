import { Toy } from './Toy/Toy';
import { filterBy , sortOrder} from '../utils/types';
import Event from '../controller/Events';
import { sort } from './Toy/sort';
import { FilterBlock, FilterBlockBuilder,  EnumValuesFilter, BoolValuesFilter, RangeFilter} from './Toy/filter';

export class Model {
  toyList: Toy[];
  updateToyListEvent: Event;
  updateChosenToysEvent: Event;
  filteredToyList: Toy[];
  filters: FilterBlock[];
  currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>
  currentSortOrder: sortOrder;
  chosenToysList: string[];
  searchValue: string;
  constructor(data: Toy[]) {
    const builder = new FilterBlockBuilder;
    this.toyList = data;
    this.filteredToyList = data;
    this.filters = builder.initAllFilters();
    this.currentFilters = [];
    this.updateToyListEvent = new Event();
    this.updateChosenToysEvent = new Event();
    this.currentSortOrder = sortOrder.NO_ORDER;
    this.chosenToysList=[];
    this.searchValue = '';
  }
  saveFilters(){
    localStorage.setItem('filterList', JSON.stringify(this.currentFilters))
    localStorage.setItem('sortOrder', JSON.stringify(this.currentSortOrder))
    localStorage.setItem('chosenList', JSON.stringify(this.chosenToysList));
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
    if(localStorage.getItem('sortOrder'))
    {
      const order = JSON.parse(localStorage.getItem('sortOrder') as string);
      this.currentSortOrder = order as sortOrder;
      this.filteredToyList = sort(order, this.filteredToyList);
      console.log(this.filteredToyList, sortOrder[this.currentSortOrder]);
    }
    if(localStorage.getItem('chosenList'))
    {
      const list = JSON.parse(localStorage.getItem('chosenList') as string);
      this.chosenToysList = list as string[];
    }
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
  sortList<T>(sortType: T){
    const newSortType = sortType as unknown as sortOrder;
    this.currentSortOrder = newSortType;
    this.filteredToyList = sort(newSortType, this.filteredToyList);
    this.updateToyListEvent.trigger<Toy[]>(this.filteredToyList);
  }

  removeFilters(){
    this.currentFilters = [];
    this.saveFilters();
    this.filteredToyList = sort(this.currentSortOrder, this.toyList);
    this.updateToyListEvent.trigger<Toy[]>(this.filteredToyList);
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

    this.filteredToyList = sort(this.currentSortOrder, this.filteredToyList);
    if(this.searchValue.length)
    {
      this.searchInFilteredList(this.searchValue);
    }
    else this.updateToyListEvent.trigger<Toy[]>(this.filteredToyList);
  }

  addToChosen<T>(id: T){
    const newId = id as unknown as string;
    let newToy: string;
    if(this.chosenToysList.find((toy) => toy == newId))
    {
      newToy = this.chosenToysList.find((toy) => toy == newId) as string;
      const key = this.chosenToysList.indexOf(newToy)
      this.chosenToysList.splice(key, 1);
    }
    else 
    {
      newToy = (this.toyList.find(toy => toy.num == newId) as Toy).num as string;
      console.log(newToy, 'add')
      this.chosenToysList.push(newToy);
    }
    if(this.chosenToysList.length>20)
    {
      this.chosenToysList.pop();
    }
    else this.updateChosenToysEvent.trigger(newToy);
  }

  searchInFilteredList<T>(input: T){
    this.searchValue = input as unknown as string;
    if(!this.searchValue.length)
    {
      this.updateToyListEvent.trigger<Toy[]>(this.filteredToyList);
    }
    else {
      const exp = new RegExp(`${this.searchValue}`,'i');
      console.log(this.searchValue, exp);
      const foundToysList = this.filteredToyList.filter(toy => {
        console.log(exp.test(toy.name));
        return exp.test(toy.name);
      })
      console.log(foundToysList)
      this.updateToyListEvent.trigger<Toy[]>(foundToysList);
    }
    
  }
  
}

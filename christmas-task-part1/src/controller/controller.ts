import { Model } from '../model/model';
import { View } from '../view/view';
import { Toy } from '../model/Toy/Toy';


export class Controller {
  model: Model;
  view: View;
  constructor(data: Toy[]) {
    this.model = new Model(data);
    this.view = new View();
    let promise = new Promise<Toy[]>(resolve => {
      resolve( this.model.retrieveFilters())
    });
    promise.then((data: Toy[]) => 
    this.view.drawToys(data, this.model.filters,
       this.model.currentFilters,
       this.model.currentSortOrder, 
       this.model.chosenToysList))

    window.addEventListener('beforeunload',
    () => {
      this.model.saveFilters();
    })

    this.view.filtersView.filterEvent.addListener((attr) => this.model.filter(attr));
    this.view.sortView.sortEvent.addListener((attr) => this.model.sortList(attr));
    this.view.filtersView.removeFiltersEvent.addListener(() => this.model.removeFilters());
    this.view.toysView.chooseToyEvent.addListener((id) => {this.model.addToChosen(id)});
    this.view.searchView.searchToyEvent.addListener((input) => this.model.searchInFilteredList(input));
    
    this.model.updateToyListEvent.addListener((data) => 
    this.view.updateItems(data, this.model.currentFilters, this.model.chosenToysList));
    this.model.updateChosenToysEvent.addListener((itemId) => this.view.updateChosenItemsView(itemId))
  }
}

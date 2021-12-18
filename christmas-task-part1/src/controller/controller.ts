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
    promise.then((data: Toy[]) => this.view.drawToys(data, this.model.filters, this.model.currentFilters))
   
    window.addEventListener('beforeunload',
    (event) => {
      this.model.saveFilters();
    })

    this.view.filtersView.filterEvent.addListener((attr) => this.model.filter(attr));

    this.model.updateToyListEvent.addListener((data) => this.view.updateItems(data, this.model.currentFilters));
  }
}

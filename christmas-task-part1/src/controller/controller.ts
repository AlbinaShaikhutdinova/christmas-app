import { Model } from '../model/model';
import { View } from '../view/view';
import { Toy } from '../model/Toy/Toy';


export class Controller {
    model: Model;
    view: View;
    constructor(data: Toy[]) {
        this.model = new Model(data);
        this.view = new View(data, [this.model.filterOfValues, this.model.filterOfRanges] );

        this.view.filtersView.filterEvent.addListener((attr) => this.model.filter(attr));

        this.model.updateToyListEvent.addListener((data) => this.view.updateItems(data));
    }
}

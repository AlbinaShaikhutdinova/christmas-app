import {Model} from '../model/model';
import { View } from '../view/view';
import { Toy } from "../model/Toy/Toy";
import {fetchData} from '../utils/dataLoader';

export class Controller{
  model: Model;
  view: View;
  constructor(data: Toy[]){
    this.model = new Model(data);
    this.view = new View();

  }


}
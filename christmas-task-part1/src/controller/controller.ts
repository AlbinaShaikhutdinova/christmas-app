import {Model} from '../model/model';
import { Toy } from "../model/Toy/Toy";
import {fetchData} from '../interface/dataLoader';

export class Controller{
  model: Model | null;
  constructor(){
    this.model = null;
    fetchData('../data.json', this.initModel);

  }
  initModel(data: Toy[]){
    this.model = new Model(data);
  }
}
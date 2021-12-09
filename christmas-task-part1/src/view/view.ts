import {getToys} from "./ToysView/toysView";


export class View{
  toysPage: HTMLElement;
  constructor(){
    this.toysPage = getToys();

  }
  
}
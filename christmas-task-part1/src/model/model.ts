import { Toy } from "./Toy/Toy";

export class Model{
  toyList: Toy[];
  constructor(data: Toy[]){
    this.toyList = data;
  }
  
}
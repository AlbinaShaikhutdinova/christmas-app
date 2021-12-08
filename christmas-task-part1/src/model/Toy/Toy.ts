import { toySize, toyShape } from '../../interface/types';

import './toy.scss';

export class Toy{
  id: number;
  name: string;
  quantity: number;
  image: string;
  yearBought: number;
  shape: toyShape;
  size: toySize;
  color: string;
  isFavourite: boolean;

  constructor(id: number,name: string, quantity: number, image: string, yearBought: number,
    shape: toyShape, size: toySize, color: string, isFavorite: boolean){
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.color = color;
    this.image = image;
    this.isFavourite = isFavorite;
    this.yearBought = yearBought;
    this.shape = shape;
    this.size = size;
  }



}
import { toySize, toyShape, toyColor } from '../../utils/types';


export class Toy{
  num: string;
  name: string;
  count: string;
  year: string;
  shape: toyShape;
  color: toyColor;
  size: toySize;
  isFavourite: boolean;

  constructor(num: string,name: string, count: string, year: string,
    shape: toyShape, size: toySize, color: toyColor, isFavorite: boolean){
    this.num = num;
    this.name = name;
    this.count = count;
    this.color = color;
    this.isFavourite = isFavorite;
    this.year = year;
    this.shape = shape;
    this.size = size;
  }
}
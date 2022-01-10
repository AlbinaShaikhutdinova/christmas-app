import { TOY_SIZE, TOY_SHAPE, TOY_COLOR } from '../../utils/types';

export class Toy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: TOY_SHAPE;
  color: TOY_COLOR;
  size: TOY_SIZE;
  isFavourite: boolean;

  constructor(
    num: string,
    name: string,
    count: string,
    year: string,
    shape: TOY_SHAPE,
    size: TOY_SIZE,
    color: TOY_COLOR,
    isFavorite: boolean
  ) {
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

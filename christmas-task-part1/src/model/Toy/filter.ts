import { Toy } from './Toy';
import { toySize, toyShape, possibleFilterType, toyColor } from '../../utils/types';

interface IFilter {
  name: string;
  filter(): Toy[];
}

export class Filter{
  name: string;
  filterType: IfilterType[];
  constructor(name: string, filterType: IfilterType[] ){
      this.name = name;
      this.filterType = filterType;
  }
  initAttributes(){

  }
  filter(){}
}

export class FilterBuilder{
  initValuesFilter(): Filter{
    let filterAttributes: IfilterType[] = [];
    filterAttributes.push({name: 'Форма', type: 'shape',options: Object.keys(toyShape), isActive: false})
    filterAttributes.push({name: 'Цвет', type: 'color',options: Object.keys(toyColor), isActive: false})
    filterAttributes.push({name: 'Размер', type: 'size',options: Object.keys(toySize), isActive: false})
    filterAttributes.push({name: 'Только любимые', type: 'favourite',value: false, isActive: false})
    return new Filter('Фильтры по значению', filterAttributes);
  }
  initRangesFilter(): Filter{
    let filterAttributes = [];
    filterAttributes.push({name: 'Количество экземпляров', type: 'count', minBar: 1, maxBar: 12, isActive: false})
    filterAttributes.push({name: 'Год приобретения', type: 'year', minBar: 1940, maxBar: 2020, isActive: false})
    return new Filter('Фильтры по диапазону', filterAttributes);
  }

}



class ValuesFilter {
    name: string;
    constructor(name: string, shapes: toyShape[], colors: string, sizes: toySize[], isFavourite: boolean) {
        this.name = name;
        const properties = {
            shapes: shapes,
            colors: colors,
            sizes: sizes,
            isFavourite: isFavourite,
        };
    }
    filter<T>(property: string, value: T) {

    }
}

export type IfilterType = {
    name: string;
    type: string;
    options?: string[];
    value?: boolean;
    maxBar?: number;
    minBar?: number;
    isActive: boolean,
}
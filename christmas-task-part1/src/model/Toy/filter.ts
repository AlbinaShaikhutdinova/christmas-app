import { Toy } from './Toy';
import { TOY_SIZE, TOY_SHAPE, FILTER_BY, TOY_COLOR, filterTypes } from '../../utils/types';

export interface IFilter {
  name: string;
  filterType: string;
}

export class EnumValuesFilter implements IFilter {
  name: string;
  option: string;
  filterType: string;
  isActive: boolean;
  constructor(name: string, option: string, filterType = 'enumVal', isActive = false) {
    this.name = name;
    this.option = option;
    this.filterType = filterType;
    this.isActive = isActive;
  }
  filterToys(filteredList: Toy[]): Toy[] {
    let newList: Toy[] = [];
    const currentFilter = filterTypes[this.name as keyof typeof filterTypes];
    const filterValue = currentFilter[this.option as keyof typeof currentFilter];
    newList = filteredList.filter((item) => {
      return item[this.name as keyof typeof item] === filterValue;
    });
    return newList;
  }
}
export class BoolValuesFilter implements IFilter {
  name: string;
  value: boolean;
  filterType: string;
  constructor(name: string, value: boolean, filterType = 'boolVal') {
    this.name = name;
    this.value = value;
    this.filterType = filterType;
  }
  filterToys(filteredList: Toy[]): Toy[] {
    let newList: Toy[] = [];
    newList = filteredList.filter((item) => {
      return item[this.name as keyof typeof item] === this.value;
    });
    return newList;
  }
}

export class RangeFilter implements IFilter {
  name: string;
  minValue: number;
  maxValue: number;
  filterType: string;
  constructor(name: string, minValue: number, maxValue: number, filterType = 'range') {
    this.name = name;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.filterType = filterType;
  }
  setMinValue(newVal: number) {
    this.minValue = newVal;
  }
  setMaxValue(newVal: number) {
    this.maxValue = newVal;
  }
  filterToys(filteredList: Toy[]): Toy[] {
    let newList: Toy[] = [];
    newList = filteredList.filter((item) => {
      const val = (item[this.name as keyof typeof item] as unknown) as number;
      return +val >= +this.minValue && +val <= +this.maxValue;
    });
    return newList;
  }
}

export class FilterBlock {
  name: string;
  filterAttributes: IfilterType[];
  constructor(name: string, filterAttributes: IfilterType[]) {
    this.name = name;
    this.filterAttributes = filterAttributes;
  }
}

export class FilterBlockBuilder {
  initAllFilters(): FilterBlock[] {
    const block: FilterBlock[] = [];
    block.push(this.initValuesFilter());
    block.push(this.initRangesFilter());
    return block;
  }
  initValuesFilter(): FilterBlock {
    const filterAttributes: IfilterType[] = [];

    filterAttributes.push({
      name: 'Форма',
      attribute: 'shape',
      filterType: FILTER_BY.ENUM_VAL,
      options: Object.keys(TOY_SHAPE),
    });
    filterAttributes.push({
      name: 'Цвет',
      attribute: 'color',
      filterType: FILTER_BY.ENUM_VAL,
      options: Object.keys(TOY_COLOR),
    });
    filterAttributes.push({
      name: 'Размер',
      attribute: 'size',
      filterType: FILTER_BY.ENUM_VAL,
      options: Object.keys(TOY_SIZE),
    });
    filterAttributes.push({
      name: 'Только любимые',
      attribute: 'favorite',
      filterType: FILTER_BY.BOOL_VAL,
      value: false,
    });
    return new FilterBlock('Фильтры по значению', filterAttributes);
  }
  initRangesFilter(): FilterBlock {
    const filterAttributes: IfilterType[] = [];
    filterAttributes.push({
      name: 'Количество экземпляров',
      attribute: 'count',
      filterType: FILTER_BY.RANGE,
      minValue: 1,
      maxValue: 12,
    });
    filterAttributes.push({
      name: 'Год приобретения',
      attribute: 'year',
      filterType: FILTER_BY.RANGE,
      minValue: 1940,
      maxValue: 2020,
    });
    return new FilterBlock('Фильтры по диапазону', filterAttributes);
  }
}

export type IfilterType = {
  name: string;
  attribute: string;
  filterType: string;
  options?: string[];
  value?: boolean;
  maxValue?: number;
  minValue?: number;
};

import { sortOrder } from "../../utils/types";
import { Toy } from "./Toy";
export function sort(type: sortOrder, list: Toy[]): Toy[]{
  let sortedList: Toy[] =list;
  switch(+type){
    case 0: sortedList = sortByAlphabet(list);
    break;
    case 1:sortedList = reverseAlphabetSort(list);
    break;
    case 2:sortedList = sortByAscention(list);
    break;
    case 3:sortedList = sortByDescention(list);
    break;
    default: sortedList = list;
    break;
  }
  return sortedList;
}

function sortByAlphabet(list: Toy[]): Toy[]{
  list.sort(dynamicSortStrings('name'))
  return list;
}
function reverseAlphabetSort(list: Toy[]): Toy[]{
  const sortedList = sortByAlphabet(list);
  sortedList.reverse();
  return sortedList;
}
function sortByAscention(list: Toy[]): Toy[]{
  list.sort(dynamicSortNumbers('year'))
  return list;
}
function sortByDescention(list: Toy[]): Toy[]{
  const sortedList = sortByAscention(list);
  sortedList.reverse();
  return sortedList;
}
function dynamicSortStrings(property: keyof Toy) {
  const sortOrder = 1;
  return function (a: Toy,b: Toy) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

function dynamicSortNumbers(property: keyof Toy) {
  const sortOrder = 1;
  return function (a: Toy,b: Toy) {
      const result = (+a[property] < +b[property]) ? -1 : (+a[property] > +b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}


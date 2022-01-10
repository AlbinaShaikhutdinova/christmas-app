import { SORT_ORDER } from '../../utils/types';
import { Toy } from './Toy';

export function sort(type: SORT_ORDER, list: Toy[]): Toy[] {
    switch (+type) {
        case 0:
            return sortByAlphabet(list);
        case 1:
            return reverseAlphabetSort(list);
        case 2:
            return sortByAscention(list);
        case 3:
            return sortByDescention(list);
        default:
            return list
    }
}
function sortByAlphabet(list: Toy[]): Toy[] {
    return list.sort(dynamicSortStrings('name'));
}
function reverseAlphabetSort(list: Toy[]): Toy[] {
    const sortedList = sortByAlphabet(list);
    return sortedList.reverse();
}
function sortByAscention(list: Toy[]): Toy[] {
    return list.sort(dynamicSortNumbers('year'));
}
function sortByDescention(list: Toy[]): Toy[] {
    const sortedList = sortByAscention(list);
    return sortedList.reverse();
}
function dynamicSortStrings(property: keyof Toy) {
    const orderOfSort = 1;
    return function (a: Toy, b: Toy) {
        let result = 0;
        if (a[property] < b[property]) {
            result = -1
        }
        else if (a[property] > b[property]) {
            result = 1
        }
        return result * orderOfSort;
    };
}

function dynamicSortNumbers(property: keyof Toy) {
    const orderOfSort = 1;
    return function (a: Toy, b: Toy) {
        let result = 0;
        if (+a[property] < +b[property]) {
            result = -1
        }
        else if (+a[property] > +b[property]) {
            result = 1
        }
        return result * orderOfSort;
    };
}

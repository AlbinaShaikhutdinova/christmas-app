import { Toy } from './Toy';
import { toySize, toyShape } from '../../utils/types';

interface IFilter {
    name: string;
    filter(): Toy[];
}

class ValuesFilter {
    properties: {};
    constructor(shapes: toyShape[], colors: string, sizes: toySize[], isFavourite: boolean) {
        this.properties = {
            shapes: shapes,
            colors: colors,
            sizes: sizes,
            isFavourite: isFavourite,
        };
    }
    filter<T>(property: string, value: T) {}
}

export enum TOY_SIZE {
    BIG = 'большой',
    MEDIUM = 'средний',
    SMALL = 'малый',
}

export enum TOY_SHAPE {
    BALL = 'шар',
    FIGURE = 'фигурка',
    BELL = 'колокольчик',
    SNOWFLAKE = 'снежинка',
    PINECONE = 'шишка',
}

export enum TOY_COLOR {
    RED = 'красный',
    BLUE = 'синий',
    GREEN = 'зелёный',
    YELLOW = 'желтый',
    WHITE = 'белый',
}

export enum SORT_ORDER {
    ALPHABET,
    REVERSE_ALPHABET,
    ASCENDING,
    DESCENDING,
    NO_ORDER,
}

export const filterTypes = {
    shape: TOY_SHAPE,
    size: TOY_SIZE,
    color: TOY_COLOR,
};

export enum FILTER_BY {
    ENUM_VAL = 'enumVal',
    BOOL_VAL = 'boolVal',
    RANGE = 'range',
};

export type possibleFilterType = TOY_COLOR | TOY_SHAPE | TOY_SIZE | boolean | number;

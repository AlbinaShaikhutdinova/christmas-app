export enum toySize {
    BIG = 'большой',
    MEDIUM = 'средний',
    SMALL = 'малый',
}

export enum toyShape {
    BALL = 'шар',
    FIGURE = 'фигурка',
    BELL = 'колокольчик',
    SNOWFLAKE = 'снежинка',
    PINECONE = 'шишка',
}

export enum toyColor {
    RED = 'красный',
    BLUE = 'синий',
    GREEN = 'зелёный',
    YELLOW = 'желтый',
    WHITE = 'белый',
}

export const filterTypes = {
    shape: toyShape,
    size: toySize,
    color: toyColor,
};

export const filterBy = {
    enumVal: 'enumVal', 
    boolVal: 'boolVal',
    range: 'range'
}

export type possibleFilterType = toyColor | toyShape | toySize | boolean | number;
import noUiSlider, { API, PipsMode } from 'nouislider';
import wNumb from 'wnumb';

export function createSlider(range: HTMLElement, minVal: number, maxVal: number): API {
    return noUiSlider.create(range, {
        range: {
            min: minVal,
            max: maxVal,
        },
        step: 1,
        // Handles start at ...
        start: [minVal, maxVal],
        connect: true,
        direction: 'ltr',
        orientation: 'horizontal',
        format: wNumb({
            decimals: 0,
        }),
    });
}

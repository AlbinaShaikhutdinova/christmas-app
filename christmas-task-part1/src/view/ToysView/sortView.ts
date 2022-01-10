import Event from '../../controller/Events';
import { SORT_ORDER } from '../../utils/types';

const CLASSES = {
    SORT_SELECTOR: 'sort__selector',
}
export class SortView {
    sortEvent: Event;
    constructor() {
        this.sortEvent = new Event();
    }

    updateSortItemState(order: SORT_ORDER) {
        const sortSelector = document.querySelector(`.${CLASSES.SORT_SELECTOR}`);
        (sortSelector as HTMLSelectElement).value = (order as unknown) as string;
    }
    drawSort() {
        const sortSelector = document.querySelector(`.${CLASSES.SORT_SELECTOR}`);
        sortSelector?.addEventListener('change', (e) => {
            const target = e?.currentTarget;
            const value = (target as HTMLSelectElement).value;
            this.sortEvent.trigger(value);
        });
    }
}

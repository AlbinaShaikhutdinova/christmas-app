import Event from '../../controller/Events';
import { sortOrder } from '../../utils/types';

export class SortView {
    sortEvent: Event;
    constructor() {
        this.sortEvent = new Event();
    }

    updateSortItemState(order: sortOrder) {
        const sortSelector = document.querySelector('.sort__selector');
        (sortSelector as HTMLSelectElement).value = (order as unknown) as string;
    }
    drawSort() {
        const sortSelector = document.querySelector('.sort__selector');
        sortSelector?.addEventListener('change', (e) => {
            const target = e?.currentTarget;
            const value = (target as HTMLSelectElement).value;
            this.sortEvent.trigger(value);
        });
    }
}

import { Toy } from '../../model/Toy/Toy';
import htmlToElement from '../../utils/htmlToElement';
import { TOY_DESCRIPTION, BOOL_VALUES } from '../../utils/translation';
import toysview from './index.html';
import Event from '../../controller/Events';

import './view.scss';
import { ANIMATION_TIME } from '../../utils/constants';

const CLASSES = {
    CONTAINER: 'container',
    CONTAINER_ITEM: 'container__item',
    ITEM_TITLE: 'item__title',
    ITEM_DESCRIPTION: 'item__description',
    DESCRIPTION_IMG: 'description__image',
    DESCRIPTION_LIST: 'description__list',
    PROPERTIES: 'properties',
    DESCRIPTION: 'description',
    PROPERTY_ITEM: 'property__item',
    CHOSEN_ITEM: 'chosen-item',
    TOY_COUNTER_TEXT: 'toy-counter__text',
    MESSAGE_CONTAINER: 'message-container',
};

export class ToysView {
    chooseToyEvent: Event;
    constructor() {
        this.chooseToyEvent = new Event();
    }
    drawPage(): HTMLElement {
        const toys: HTMLElement = htmlToElement(toysview) as HTMLElement;
        document.querySelector('main')?.append(toys);
        return toys;
    }
    showModal() {
        const modal = document.querySelector('.modal-window') as HTMLElement;
        modal.classList.toggle('hidden');
        setTimeout(() => modal.classList.toggle('hidden'), ANIMATION_TIME);
    }
    showMessage(container: HTMLElement) {
        const containerItem = document.createElement('div');
        containerItem.className = `${CLASSES.CONTAINER_ITEM} ${CLASSES.MESSAGE_CONTAINER}`;

        const message = document.createElement('p');
        message.textContent = 'Извините, совпадений не обнаружено';
        containerItem.append(message);
        container.append(containerItem);
    }
    async drawItems(data: Toy[], chosenItems: string[]) {
        const container = document.querySelector(`.${CLASSES.CONTAINER}`) as HTMLElement;
        container!.innerHTML = '';
        this.updateCounter(chosenItems.length.toString());
        if (data.length === 0) this.showMessage(container);
        for (const toy of data) {
            container?.append(await this.drawToy(toy, chosenItems));
        }
    }
    async drawToy(toy: Toy, chosenItems: string[]): Promise<HTMLElement> {
        const containerItem = document.createElement('div');
        const itemTitle = document.createElement('h3');
        const itemDescription = document.createElement('div');
        const descriptionImg = document.createElement('div');

        containerItem.className = CLASSES.CONTAINER_ITEM;
        itemTitle.className = CLASSES.ITEM_TITLE;
        itemDescription.className = `${CLASSES.ITEM_DESCRIPTION} ${CLASSES.DESCRIPTION}`;
        descriptionImg.className = CLASSES.DESCRIPTION_IMG;
        containerItem.id = toy.num as string;
        containerItem.addEventListener('click', () => {
            this.chooseToyEvent.trigger(toy.num);
        });
        const chosen = chosenItems.find((chosen) => chosen === toy.num);
        if (chosen) {
            this.updateChosenItem(containerItem);
        }
        itemTitle.textContent = toy.name;
        const descriptionList = this.getToyDescription(toy);
        const img = await this.getToyImage(toy);
        descriptionImg.append(img);
        itemDescription.append(descriptionImg, descriptionList);
        containerItem.append(itemTitle, itemDescription);
        return containerItem;
    }
    async getToyImage(toy: Toy): Promise<HTMLElement> {
        const img = document.createElement('img');
        const res = await fetch(
            `https://raw.githubusercontent.com/AlbinaShaikhutdinova/projects-data/main/assets/toys/${toy.num}.png`
        );
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        img.src = url;
        return img;
    }
    getToyDescription(toy: Toy): HTMLUListElement {
        let descriptionList = document.createElement('ul');
        descriptionList.className = `${CLASSES.DESCRIPTION_LIST} ${CLASSES.PROPERTIES}`;
        let key: keyof typeof toy;
        for (key in toy) {
            if (key !== 'num' && key !== 'name') {
                const item = document.createElement('li');
                item.className = CLASSES.PROPERTY_ITEM;
                let value;
                if (typeof toy[key] === 'boolean') {
                    value = BOOL_VALUES[toy[key] as keyof typeof BOOL_VALUES];
                } else {
                    value = toy[key];
                }
                item.textContent = `${TOY_DESCRIPTION[key as keyof typeof TOY_DESCRIPTION]}: ${value}`;
                descriptionList.append(item);
            }
        }
        return descriptionList;
    }
    updateChosenItem(item: HTMLElement) {
        item.classList.toggle(CLASSES.CHOSEN_ITEM);
    }
    updateCounter(num: string) {
        document.querySelector(`.${CLASSES.TOY_COUNTER_TEXT}`)!.textContent = num;
    }
}

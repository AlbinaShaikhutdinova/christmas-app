import { Toy } from '../../model/Toy/Toy';
import htmlToElement from '../../utils/htmlToElement';
import { toyDescription, BoolValues } from '../../utils/translation';
import toysview from './index.html';
import Event from '../../controller/Events';

import './view.scss';

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
        setTimeout(() => modal.classList.toggle('hidden'), 2000);
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
            const containerItem = document.createElement('div');
            const itemTitle = document.createElement('h3');
            const itemDescription = document.createElement('div');
            const descriptionImg = document.createElement('div');
            const img = document.createElement('img');
            const descriptionList = document.createElement('ul');

            containerItem.className = CLASSES.CONTAINER_ITEM;
            itemTitle.className = CLASSES.ITEM_TITLE;
            itemDescription.className = `${CLASSES.ITEM_DESCRIPTION} ${CLASSES.DESCRIPTION}`;
            descriptionImg.className = CLASSES.DESCRIPTION_IMG;
            descriptionList.className = `${CLASSES.DESCRIPTION_LIST} ${CLASSES.PROPERTIES}`;

            const chosen = chosenItems.find((chosen) => chosen === toy.num);
            containerItem.id = toy.num as string;
            containerItem.addEventListener('click', () => {
                this.chooseToyEvent.trigger(toy.num);
            });
            if (chosen) {
                this.updateChosenItem(containerItem);
            }
            itemTitle.textContent = toy.name;
            const res = await fetch(
                `https://raw.githubusercontent.com/AlbinaShaikhutdinova/projects-data/main/assets/toys/${toy.num}.png`
            );
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            img.src = url;

            let key: keyof typeof toy;
            for (key in toy) {
                if (key !== 'num' && key !== 'name') {
                    const item = document.createElement('li');
                    item.className = CLASSES.PROPERTY_ITEM;
                    let value;
                    if (typeof toy[key] === 'boolean') {
                        value = BoolValues[toy[key] as keyof typeof BoolValues];
                    } else value = toy[key];
                    item.textContent = `${toyDescription[key as keyof typeof toyDescription]}: ${value}`;
                    descriptionList.append(item);
                }
            }
            descriptionImg.append(img);
            itemDescription.append(descriptionImg);
            itemDescription.append(descriptionList);

            containerItem.append(itemTitle);
            containerItem.append(itemDescription);

            container?.append(containerItem);
        }
    }
    updateChosenItem(item: HTMLElement) {
        item.classList.toggle(CLASSES.CHOSEN_ITEM);
    }
    updateCounter(num: string) {
        document.querySelector(`.${CLASSES.TOY_COUNTER_TEXT}`)!.textContent = num;
    }
}

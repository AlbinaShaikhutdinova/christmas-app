import { Toy } from '../../model/Toy/Toy';
import htmlToElement from '../../utils/htmlToElement';
import toysview from './index.html';



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
};

export class ToysView {
    drawPage(): HTMLElement {
        const toys: HTMLElement = htmlToElement(toysview) as HTMLElement;
        document.querySelector('main')?.append(toys);
        return toys;
    }


    drawItems(data: Toy[]) {
        const container = document.querySelector(`.${CLASSES.CONTAINER}`);
        container!.innerHTML = '';
        data.forEach(async (toy) => {
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

            containerItem.id = toy.num as string;
            itemTitle.textContent = toy.name;
            const res = await fetch(
                `https://raw.githubusercontent.com/AlbinaShaikhutdinova/projects-data/main/assets/toys/${toy.num}.png`
            );
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            img.src = url;

            let key: keyof typeof toy;
            for (key in toy) {
                if (key !== 'num') {
                    const item = document.createElement('li');
                    item.className = CLASSES.PROPERTY_ITEM;
                    item.textContent = `${key}: ${toy[key]}`;
                    descriptionList.append(item);
                }
            }
            descriptionImg.append(img);
            itemDescription.append(descriptionImg);
            itemDescription.append(descriptionList);

            containerItem.append(itemTitle);
            containerItem.append(itemDescription);

            container?.append(containerItem);
        });
    }
}

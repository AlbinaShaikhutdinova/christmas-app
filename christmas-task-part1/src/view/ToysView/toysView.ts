import { Toy } from "../../model/Toy/Toy";
import htmlToElement from "../../utils/htmlToElement";
import toysview from "./index.html";
import { toySize, toyShape, toyColor } from '../../utils/types';
import Event from "../../controller/Events";

import "./view.scss";

const CLASSES={
  CONTAINER: 'container',
  CONTAINER_ITEM: 'container__item',
  ITEM_TITLE: 'item__title',
  ITEM_DESCRIPTION: 'item__description',
  DESCRIPTION_IMG: 'description__image',
  DESCRIPTION_LIST: 'description__list',
  PROPERTIES: 'properties',
  DESCRIPTION: 'description',
  PROPERTY_ITEM: 'property__item',

}

export class ToysView{
  filterEvent: Event;
  constructor(){
    this.filterEvent = new Event();

  }
  drawPage(): HTMLElement{



    const toys: HTMLElement = htmlToElement((toysview)) as HTMLElement;
    document.querySelector('main')?.append(toys);
    this.drawFilters();
    return toys;
  }

  drawFilters(){
    const filters = `<div class="filter-item">
    <div class="filter-item__title">Фильтры по значению</div>
    <div class="filter-item__filter-type">
      <div class="filter-type__name">Форма</div>
      <div class="filter-type__attribute shape options">
      </div>
    </div>
    <div class="filter-item__filter-type">
      <div class="filter-type__name">Цвет</div>
      <div class="filter-type__attribute color options">
      </div>
    </div>
    <div class="filter-item__filter-type">
      <div class="filter-type__name">Размер</div>
      <div class="filter-type__attribute size options">
      </div>
    </div>
    <div class="filter-item__filter-type">
      <div class="filter-type__name">Только любимые</div>
      <div class="filter-type__attribute checkbox">
        <input type="checkbox">
      </div>
    </div>
    </div>
    <div class="filter-item">
      <div class="filter-item__title">Фильтры по диапазону</div>
      <div class="filter-item__filter-type">
        <div class="filter-type__name"></div>
        <div class="filter-type__attribute"></div>
      </div>
      <div class="filter-item__filter-type">
        <div class="filter-type__name"></div>
        <div class="filter-type__attribute"></div>
      </div>

    </div>
    <div class="filter-item">
      <div class="filter-item__title"></div>
      <div class="filter-item__filter-type">
        <div class="filter-type__name"></div>
        <div class="filter-type__attribute"></div>
      </div>
      <div class="filter-item__filter-type">
        <div class="filter-type__name"></div>
        <div class="filter-type__attribute"></div>
      </div>
    </div>`
    if(document.querySelector('.filters') !==null)
    {
      document.querySelector('.filters')!.innerHTML = filters;
    }
    
    const shapeFilter = document.querySelector('.filter-type__attribute.shape') as HTMLElement;
    const colorFilter = document.querySelector('.filter-type__attribute.color') as HTMLElement;
    const sizeFilter = document.querySelector('.filter-type__attribute.size') as HTMLElement;
    this.setAttributeValues<typeof toyShape>(shapeFilter, toyShape, "data-shape", "shape");
    this.setAttributeValues<typeof toyColor>(colorFilter, toyColor, "data-color", "color");
    this.setAttributeValues<typeof toySize>(sizeFilter, toySize, "data-size", "size");
  }
  private setAttributeValues<T>(attribute: HTMLElement, options: T, attributeName: string, filterType: string){
    for(let el in options){
      const item = document.createElement('div');
      item.className = 'options__item';
      item.setAttribute(attributeName,el);
      //const elStr = el as string;
      item.addEventListener('click', 
      () => this.filterEvent.trigger<{filterType: string; el: Extract<keyof T, string>}>({filterType,el}));
      attribute?.append(item);
    }
  }
  drawItems(data: Toy[]){
    const container = document.querySelector(`.${CLASSES.CONTAINER}`);
    container!.innerHTML = "";
    data.forEach(async toy => {
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

    containerItem.id = (toy.num as string);
    itemTitle.textContent = toy.name;
    const res = await fetch(`https://raw.githubusercontent.com/AlbinaShaikhutdinova/projects-data/main/assets/toys/${toy.num}.png`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    let key: keyof typeof toy;
    for(key in toy){
      if(key!=='num')
      {
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
    })
  }
}

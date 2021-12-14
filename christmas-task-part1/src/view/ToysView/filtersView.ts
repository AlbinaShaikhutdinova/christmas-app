import Event from '../../controller/Events';
import { toySize, toyShape, toyColor } from '../../utils/types';
import { Filter } from '../../model/Toy/filter';


const CLASSES = {
  FILTERS: 'filters',
  FILTER_ITEM: 'filter-item',
  FILTER_ITEM_TITLE: 'filter-item__title',
  FILTER_ITEM_FILTER_TYPE: 'filter-item__filter-type',
  FILTER_TYPE_NAME: 'filter-type__name',
  FILTER_TYPE_ATTRIBUTE: 'filter-type__attribute',
  OPTIONS: 'options',
  OPTIONS_ITEM: 'options__item',
}

export class FiltersView{
  filterEvent: Event;
  constructor() {
    this.filterEvent = new Event();
  }
  private drawFilterItem(item: Filter): HTMLElement{
    const filterItem = document.createElement('div');
    filterItem.className = CLASSES.FILTER_ITEM;
    const filterItemTitle = document.createElement('div');
    filterItemTitle.className = CLASSES.FILTER_ITEM_TITLE;
    filterItemTitle.textContent = item.name;
    filterItem.append(filterItemTitle);
   

    item.filterType.forEach(type => {
      const filterItemAttributes = document.createElement('div');
      filterItemAttributes.className = CLASSES.FILTER_ITEM_FILTER_TYPE;
      const typeName = document.createElement('div');
      typeName.className = CLASSES.FILTER_TYPE_NAME;
      typeName.textContent = `${type.name}:`;
      const typeAttribute = document.createElement('div');
      typeAttribute.className = `${CLASSES.FILTER_TYPE_ATTRIBUTE} ${type.type}`;
      const temp = type.type;
      if(type.options)
      {
        typeAttribute.classList.add(CLASSES.OPTIONS);
        type.options.forEach(option => {
          const item = document.createElement('div');
          item.className = CLASSES.OPTIONS_ITEM;
          item.setAttribute(`data-${type.type}`, option);
          item.addEventListener('click', () => this.filterEvent.trigger({ temp, option }));
          typeAttribute.append(item);
        })
      }
      filterItemAttributes.append(typeName);
      filterItemAttributes.append(typeAttribute);
      filterItem.append(filterItemAttributes);

    })
   
   
    return filterItem;
    let str=`
    <div class="filter-item__filter-type">
      <div class="filter-type__name">Только любимые</div>
      <div class="filter-type__attribute checkbox">
        <input type="checkbox">
      </div>
    </div>
    </div>`


  }
  drawFilters(filters: Filter[]) {
    const containerF = document.querySelector(`.${CLASSES.FILTERS}`);
    filters.forEach(filter => {
      const item = this.drawFilterItem(filter);
      containerF?.append(item);
    })
   
  }
}
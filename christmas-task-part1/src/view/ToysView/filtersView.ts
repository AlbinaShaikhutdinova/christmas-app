import Event from '../../controller/Events';
import { filterBy } from '../../utils/types';
import { FilterBlock, EnumValuesFilter, BoolValuesFilter, RangeFilter } from '../../model/Toy/filter';
import {createSlider} from '../../utils/slider';
import {TargetElement } from 'nouislider';


const CLASSES = {
  FILTERS: 'filters',
  FILTER_ITEM: 'filter-item',
  FILTER_ITEM_TITLE: 'filter-item__title',
  FILTER_ITEM_FILTER_TYPE: 'filter-item__filter-type',
  FILTER_TYPE_NAME: 'filter-type__name',
  FILTER_TYPE_ATTRIBUTE: 'filter-type__attribute',
  OPTIONS: 'options',
  OPTIONS_ITEM: 'options__item',
  TOGGLE_ITEM: 'toggle-item',
  SLIDER: 'slider',
  INPUT_MIN: 'input-min-value',
  INPUT_MAX: 'input-max-value',
  ACTIVE_ITEM: 'active-item',
}

export class FiltersView{
  filterEvent: Event;
  removeFiltersEvent: Event;
  removeSettingsEvent: Event;
  sliders: TargetElement[]
  constructor() {
    this.filterEvent = new Event();
    this.removeFiltersEvent = new Event();
    this.removeSettingsEvent = new Event();
    this.sliders =[];
  }
  private drawFilterItem(item: FilterBlock): HTMLElement{
    const filterItem = document.createElement('div');
    filterItem.className = CLASSES.FILTER_ITEM;
    const filterItemTitle = document.createElement('div');
    filterItemTitle.className = CLASSES.FILTER_ITEM_TITLE;
    filterItemTitle.textContent = item.name;
    filterItem.append(filterItemTitle);

    item.filterAttributes.forEach(type => {
      const filterItemAttributes = document.createElement('div');
      filterItemAttributes.className = `${CLASSES.FILTER_ITEM_FILTER_TYPE} ${type.filterType}`;
      const typeName = document.createElement('div');
      typeName.className = CLASSES.FILTER_TYPE_NAME;
      typeName.textContent = `${type.name}:`;
      const typeAttribute = document.createElement('div');
      typeAttribute.className = `${CLASSES.FILTER_TYPE_ATTRIBUTE} ${type.attribute}`;
      const attr = type.attribute;
      const ft = type.filterType;
      if(type.filterType === filterBy.enumVal && type.options)
      {
        typeAttribute.classList.add(CLASSES.OPTIONS);
        type.options.forEach(option => {
          const item = document.createElement('div');
          item.className = CLASSES.OPTIONS_ITEM;
          item.setAttribute(`data-${type.attribute}`, option);
          item.addEventListener('click', () => this.filterEvent.trigger({ft, attr, option }));
          typeAttribute.append(item);
        })
      }
      else if(type.filterType === filterBy.boolVal)
      {
        typeAttribute.classList.add(CLASSES.TOGGLE_ITEM);
        const input = document.createElement('input');
        input.type = 'checkbox';
       
        typeAttribute.append(input);
        const option = input;
        input.addEventListener('click', () => this.filterEvent.trigger({ft, attr, option }));
      }
      else if(type.filterType === filterBy.range)
      {
        typeAttribute.classList.add(CLASSES.SLIDER);
        const minValContainer = document.createElement('input');
        minValContainer.className = `${CLASSES.INPUT_MIN}`;
        minValContainer.type = 'text';
        minValContainer.readOnly = true;
        const maxValContainer = document.createElement('input');
        maxValContainer.className = `${CLASSES.INPUT_MAX}`;
        maxValContainer.type = 'text';
        maxValContainer.readOnly = true;
        const range = document.createElement('div');
        range.className = `range-${type.attribute} slider-styled`
        const slider = createSlider(range, type.minValue as number, type.maxValue as number);
        this.sliders.push(range);
        range.style.width = '200px';
        slider.on('update', (values, handle) => {
          const value = values[handle];
          if(handle===0) {
            minValContainer.value = value as string;
          }
          else if(handle===1){
            maxValContainer.value = value as string;
          } 
        });
        slider.on('set', (values) => {
          console.log(values)
          const option = values;
          this.filterEvent.trigger({ft, attr, option })
        } )
        typeAttribute.append(minValContainer);
        typeAttribute.append(range);
        typeAttribute.append(maxValContainer);
      }
      filterItemAttributes.append(typeName);
      filterItemAttributes.append(typeAttribute);
      filterItem.append(filterItemAttributes);
    })
    return filterItem;
  }
  updateFilterItemState(currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>){
    for(let el of document.querySelectorAll(`.${CLASSES.OPTIONS_ITEM}`)){
      el.classList.remove(CLASSES.ACTIVE_ITEM)
    }
    if(currentFilters.length===0)
    {
      this.sliders[0].noUiSlider?.reset(false);
      this.sliders[1].noUiSlider?.reset(false);
      const toggle = document.querySelector(`.${CLASSES.TOGGLE_ITEM}`);
      (toggle?.querySelector('input') as HTMLInputElement).checked = false;
    }
    currentFilters.forEach(filter => {
      const element = document.querySelector(`.${CLASSES.FILTER_TYPE_ATTRIBUTE}.${filter.name}`);
      if(element?.classList.contains(CLASSES.OPTIONS))
      {
        for(const item of element.children)
        {
          if(item.getAttribute(`data-${filter.name}`)===(filter as EnumValuesFilter).option)
            item.classList.add(CLASSES.ACTIVE_ITEM);
        }
      }
      else if(element?.classList.contains(CLASSES.SLIDER))
      {
        if(element?.classList.contains('count'))
          this.sliders[0].noUiSlider?.set([(filter as RangeFilter).minValue, (filter as RangeFilter).maxValue], false);
        else this.sliders[1].noUiSlider?.set([(filter as RangeFilter).minValue, (filter as RangeFilter).maxValue], false);
      }
      else if(element?.classList.contains(CLASSES.TOGGLE_ITEM))
      {
        const input = element!.querySelector('input');
        input!.checked = (filter as BoolValuesFilter).value;
      }
    })



  }
  drawFilters(filters: FilterBlock[], currentFilters: Array<EnumValuesFilter | BoolValuesFilter | RangeFilter>) {
    const containerF = document.querySelector(`.${CLASSES.FILTERS}`);
    filters.forEach(filter => {
      const item = this.drawFilterItem(filter);
      containerF?.append(item);
    })
    this.initRemoveButton();
    this.updateFilterItemState(currentFilters);
  }
  initRemoveButton(){
    const removeBtn = document.querySelector('.remove-filter');
    removeBtn?.addEventListener('click',() => this.removeFiltersEvent.trigger());
    const removeSettingsBtn = document.querySelector('.remove-settings');
    removeSettingsBtn?.addEventListener('click',() => this.removeSettingsEvent.trigger());
  }
}


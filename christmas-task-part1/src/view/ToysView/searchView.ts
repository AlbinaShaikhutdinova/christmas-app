import Event from "../../controller/Events"

const  CLASSES = {
  TOY_SEARCH: 'toy-search'
}
export class SearchView{
  searchToyEvent: Event;
  constructor(){
    this.searchToyEvent = new Event();
  }
  initSearchElement(){
    const searchElement = document.querySelector(`.${CLASSES.TOY_SEARCH}`) as HTMLInputElement;
    searchElement?.addEventListener('input', () => this.searchToyEvent.trigger(searchElement.value))
  }
}
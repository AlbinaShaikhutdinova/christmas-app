import htmlToElement from "../../utils/htmlToElement";
import toysview from "./index.html";

import "./view.scss";

export function getToys(): HTMLElement{
  const toys: HTMLElement = htmlToElement((toysview)) as HTMLElement;
  document.querySelector('main')?.append(toys);

  return toys;
}
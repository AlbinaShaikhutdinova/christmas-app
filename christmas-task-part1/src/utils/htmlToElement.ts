export default function (htmlString: string) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content.firstChild;
}
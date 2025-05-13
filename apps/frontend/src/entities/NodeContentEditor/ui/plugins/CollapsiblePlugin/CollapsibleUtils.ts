export function setDomHiddenUntilFound(dom: HTMLElement): void {
  // @ts-expect-error
  // lexical
  dom.hidden = 'until-found';
}

export function domOnBeforeMatch(dom: HTMLElement, callback: () => void): void {
  // @ts-expect-error
  // lexical
  dom.onbeforematch = callback;
}

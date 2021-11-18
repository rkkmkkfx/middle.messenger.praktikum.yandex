import Creact from '../Creact';

export type Page = new (
  props: { children?: VirtualDOMElement[] },
) => Creact.Component<EmptyObject, Record<string, unknown>>;

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

export default class Route {
  #pathname: string;

  #block: Nullable<HTMLElement | Text | HTMLElement[]>;

  #root?: HTMLElement;

  readonly #Page: Page;

  constructor(
    pathname: string,
    view: Page,
  ) {
    this.#pathname = pathname;
    this.#Page = view;
    this.#block = null;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.#pathname = pathname;
      this.render(this.#root!);
    }
  }

  leave() {
    this.#block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.#pathname);
  }

  render(root: HTMLElement) {
    this.#root = root;
    this.#block = Creact.mount(new this.#Page({}).render(), this.#root);
  }
}

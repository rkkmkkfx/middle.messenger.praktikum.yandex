import Page from '../../core/Page';

import template from './NotFoundPage.tmpl';
import { fetchWithRetry } from '../../core/HTTPTransport';
import Button from '../../components/Button/Button';

type NotFoundPageProps = {
  url: string;
  heading: string;
  button: HTMLElement | ButtonProps;
};

export default class NotFoundPage extends Page {
  name = 'NotFoundPage';

  constructor(props: NotFoundPageProps, root: Node) {
    super({
      ...props,
      button: new Button(props.button).element,
    }, root);
  }

  async componentDidMount(): Promise<void> {
    const { response } = await fetchWithRetry(
      'https://g.tenor.com/v1/random?q=404%20error%20page%20not%20found&key=9FE9RGPBR01S&limit=1',
      {},
    );
    const { results } = JSON.parse(response);
    const { url } = results[0].media[0].gif;
    this.setProps({ url });
  }

  // eslint-disable-next-line class-methods-use-this
  render(): string {
    console.log('render');
    return template;
  }
}

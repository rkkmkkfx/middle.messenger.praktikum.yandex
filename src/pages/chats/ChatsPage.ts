import templator from '../../core/Templator';
import Page from '../../core/Page';

import template from './ChatsPage.tmpl';

type ChatsPageProps = {
  url: string;
  search: InputProps;
  inputs: InputProps[];
  buttons: ButtonProps[];
};

export default class ChatsPage extends Page<ChatsPageProps> {
  async componentDidMount(): Promise<void> {
    const res = await fetch('https://g.tenor.com/v1/gifs?ids=12136175&key=9FE9RGPBR01S');
    const { results } = await res.json();
    const { url } = results[0].media[0].gif;
    this.setProps({ url });
  }

  render(): string {
    return templator.compile(this.props, template);
  }
}

import Component from '../../core/Component';

import Sidebar from '../../components/Sidebar';

import template from './EditProfilePage.tmpl';
import Chat from '../../components/Chat';

export default class EditProfilePage extends Component {
  constructor(root: HTMLElement, props: ComponentProps) {
    super(root, {
      ...props,
      sidebar: new Sidebar('aside', props.sidebar).element,
      chat: new Chat('section', props.chat).element,
    });
  }

  async componentDidMount(): Promise<void> {
    const res = await fetch('https://g.tenor.com/v1/gifs?ids=12136175&key=9FE9RGPBR01S');
    const { results } = await res.json();
    const { url } = results[0].media[0].gif;
    this.setProps({ url });
  }

  render(): JSX.Element {
    return template;
  }
}

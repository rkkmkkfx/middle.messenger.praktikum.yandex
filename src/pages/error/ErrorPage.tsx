import Creact from '../../core/Creact';

import Card from '../../components/Card';
import Button from '../../components/Button/Button';

import * as styles from './ErrorPage.module.pcss';

type ErrorPageProps = {
  status?: number;
  message?: string;
};

type ErrorPageState = {
  heading: string;
  url: string;
};

export default class ErrorPage extends Creact.Component<ErrorPageProps, ErrorPageState> {
  async componentDidMount(): Promise<void> {
    try {
      const params = (new URL(window.location.href)).searchParams;
      const {
        status = params.get('status')! ?? 500,
        message = params.get('message') ?? 'Unknown error',
      } = this.props;
      const res = await fetch(`https://g.tenor.com/v1/random?q=${status}%20Unknown%20Server%20Error&key=9FE9RGPBR01S&limit=1`);
      const { results } = await res.json();
      const { url } = results[0].media[0].gif;
      this.setState({
        url,
        heading: `${status}: ${message}`,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render(): JSX.Element {
    return (
      <Card heading={this.state.heading}>
        <img className={styles.img} src={this.state.url} alt="" />
        <div className={styles.buttons}>
          <Button variant="primary" to="/">Back to the App</Button>
        </div>
      </Card>
    );
  }
}

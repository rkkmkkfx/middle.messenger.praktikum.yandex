import Creact from '../../core/Creact';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import router from '../../core/router';

import store from '../../core/store';
import auth from '../../api/auth-api';

import * as styles from './SignInPage.module.pcss';
import { getFormValues } from '../../core/utils';

export default class SignInPage extends Creact.Component {
  submitHandler(event: Event): void {
    event.preventDefault();
    auth.signin(getFormValues(event.target as HTMLFormElement))
      .then(() => {
        router.go('/messenger');
      });
  }

  componentDidMount() {
    if (store.state.user) {
      router.go('/messenger');
    }
  }

  render(): JSX.Element {
    return (
      <Card heading="Sign In">
        <form className={styles.root} onSubmit={this.submitHandler} noValidate>
          <div className={styles.fields}>
            <Input
              name="login"
              label="Username*"
              type="text"
              autocomplete="username"
              pattern="^.*(?=.*)(?=.*[a-z])\w+$"
              minLength={3}
              maxLength={20}
              required
            />
            <Input
              name="password"
              type="password"
              autocomplete="password"
              label="Password*"
              pattern="^(?=^.*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
              minLength={8}
              maxLength={40}
              required
            />
          </div>
          <div className={styles.buttons}>
            <Button variant="primary" type="submit">
              Sign In
            </Button>
            <Button type="button" variant="secondary" to="/sign-up">
              Sign Up
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

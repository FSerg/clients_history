import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Grid,
  Header,
  Segment,
  Message,
  Form,
  Button
} from 'semantic-ui-react';

import isEmail from 'validator/lib/isEmail';
import InputField from '../forms/InputField';
import FieldMessage from '../forms/FieldMessage';

class SignupLoginForm extends Component {
  state = {
    data: {
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) {
      errors.email = 'Некорректный адрес эл.почты';
    }

    if (!data.email) {
      errors.email = 'Адрес эл.почты обязателен для заполнения';
    }

    if (!data.password) {
      errors.password = 'Пароль не может быть пустым';
    }

    if (!this.props.isLogin && data.password !== data.passwordConfirmation) {
      errors.password = 'Пароли не совпадают!';
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
  };

  handleStringChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { errors, isValid } = this.validate(this.state.data);
    this.setState({ errors });
    if (isValid) {
      this.props.submit(this.state.data);
    }
  };

  showError = errorMessage => {
    if (errorMessage) {
      return <Message negative>{errorMessage}</Message>;
    }
    return <div />;
  };

  showAdditionalLinks = () => {
    if (this.props.isLogin) {
      return (
        <Message size="small">
          Первый раз здесь? Требуется{' '}
          <NavLink to="/signup">регистрация</NavLink>
        </Message>
      );
    }
    return (
      <Message size="small">
        Уже регистрировались? Требуется{' '}
        <NavLink to="/login">авторизация</NavLink>
      </Message>
    );
  };

  render() {
    const { errors, data } = this.state;

    return (
      <Grid
        centered
        style={{ height: '100%', paddingTop: '5em' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Header as="h3" block textAlign="center">
              {this.props.isLogin
                ? 'Вход в систему'
                : 'Регистрация нового пользователя'}
            </Header>
            <Form loading={this.props.authLoading} onSubmit={this.handleSubmit}>
              <Form.Field error={errors.email}>
                <InputField
                  type="text"
                  name="email"
                  label="E-mail"
                  value={data.email}
                  change={this.handleStringChange}
                />
                <FieldMessage content={errors.email} type="error" />
              </Form.Field>

              <Form.Field error={errors.password}>
                <InputField
                  type="password"
                  name="password"
                  label="Пароль"
                  value={data.password}
                  change={this.handleStringChange}
                />
                <FieldMessage content={errors.password} type="error" />
              </Form.Field>

              {!this.props.isLogin && (
                <InputField
                  type="password"
                  name="passwordConfirmation"
                  label="Подтверждение пароля"
                  value={data.passwordConfirmation}
                  change={this.handleStringChange}
                />
              )}

              {this.showError(this.props.authError)}

              <Button color="teal" fluid size="large">
                {this.props.isLogin ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </Form>
          </Segment>

          {this.showAdditionalLinks()}
        </Grid.Column>
      </Grid>
    );
  }
}

SignupLoginForm.propTypes = {
  isLogin: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  authError: PropTypes.string,
  authLoading: PropTypes.bool
};

SignupLoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

SignupLoginForm.defaultProps = {
  isLogin: false,
  authError: '',
  authLoading: false
};

export default SignupLoginForm;

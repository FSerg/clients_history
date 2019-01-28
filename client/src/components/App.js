import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';
import { Container } from 'semantic-ui-react';

import PrivateRoute from './authentication/AuthenticatedRoute';
import LoginPage from './authentication/LoginPage';
import SignupPage from './authentication/SignupPage';

import Config from './Config';

import NavigationBar from './navbar/NavigationBar';
import NavigationBarMobile from './navbar/NavigationBarMobile';
import Landing from './Landing';
import ClientsPage from './history/ClientsPage';
import DocsPage from './history/DocsPage';

import UsersList from './users/UsersList';
import Page from './Page';
import ModalRootContainer from './modal/ModalRootContainer';

class App extends Component {
  state = {
    width: window.innerWidth
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 768;
    const contStyle = !isMobile ? { marginTop: '6em' } : { marginTop: '1em' };

    return (
      <div>
        <YMInitializer
          accounts={[parseInt(Config.YandexID, 10)]}
          version="2"
          options={{
            clickmap: true,
            trackLinks: true,
            trackHash: true,
            accurateTrackBounce: true,
            webvisor: true
          }}
        />
        <ModalRootContainer />
        {isMobile ? <NavigationBarMobile /> : <NavigationBar />}

        <Container style={contStyle}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <PrivateRoute exact path="/history" component={ClientsPage} />
            <PrivateRoute exact path="/history/:code" component={DocsPage} />
            <PrivateRoute path="/users" component={UsersList} />
            <Route path="/page" component={Page} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;

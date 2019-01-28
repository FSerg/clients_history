import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Grid, Header, Button } from 'semantic-ui-react';

const Landing = ({ isAuthenticated }) => (
  <Container text textAlign="center" style={{ padding: '8em 0em' }}>
    <Header as="h3" style={{ fontSize: '3em' }}>
      Медцентр Альфа
    </Header>
    <p style={{ fontSize: '1.5em', fontWeight: 'normal' }}>
      Поиск по истории приемов
    </p>

    <Grid>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Button primary size="huge" as={Link} to="/history">
            Поиск
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

Landing.defaultProps = {
  isAuthenticated: false
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Landing);

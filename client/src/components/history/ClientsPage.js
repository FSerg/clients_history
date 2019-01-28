import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { Input, Card, Divider, Message, Loader } from 'semantic-ui-react';
import ym from 'react-yandex-metrika';

import { findClients } from '../../actions/clientActions';
import ClientItem from './ClientItem';

class ClientsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchString: this.props.search_string
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // state = {
  //   SearchString: ''
  // };

  setSearch = debounce(SearchString => {
    if (SearchString === '') {
      this.setState({ SearchString });
    } else {
      this.setState({ SearchString });
    }
    ym('reachGoal', 'Searching', { searchString: this.state.SearchString });
    this.props.findClients(this.state.SearchString);
  }, 500);

  handleChange = (e, { value }) => {
    this.setState({ SearchString: value });
    this.setSearch(value);
  };

  moveCaretAtEnd = e => {
    const temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  };

  render() {
    return (
      <div>
        <Input
          autoFocus
          fluid
          size="massive"
          icon="search"
          value={this.state.SearchString}
          placeholder="Фамилия, Имя или номер телефона..."
          onChange={this.handleChange}
          onFocus={this.moveCaretAtEnd}
        />
        <Divider horizontal>Результаты поиска</Divider>

        {this.props.error ? (
          <Message negative>
            <Message.Header>Что-то пошло не так!</Message.Header>
            <p>{this.props.error}</p>
          </Message>
        ) : (
          <div />
        )}

        {this.props.isLoading ? (
          <Loader
            active
            size="large"
            inline="centered"
            style={{ marginTop: '5em', marginBottom: '5em' }}
          />
        ) : (
          <Card.Group>
            {this.props.finded_clients.map(item => {
              return <ClientItem key={item._id} item={item} />;
            })}
          </Card.Group>
        )}
      </div>
    );
  }
}

ClientsPage.propTypes = {
  search_string: PropTypes.string,
  findClients: PropTypes.func.isRequired,
  finded_clients: PropTypes.array,
  error: PropTypes.string,
  isLoading: PropTypes.bool
};

ClientsPage.defaultProps = {
  finded_clients: [],
  error: '',
  isLoading: false
};

const mapStateToProps = state => {
  return {
    search_string: state.clientStore.search_string,
    finded_clients: state.clientStore.finded_clients,
    isLoading: state.clientStore.isLoading,
    error: state.clientStore.error
  };
};

export default connect(
  mapStateToProps,
  { findClients }
)(ClientsPage);

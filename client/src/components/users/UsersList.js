import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Message, Loader, Table } from 'semantic-ui-react';

import { getUsers, delUser, updateUser } from '../../actions/usersActions';
import UserItem from './UserItem';

class UsersList extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  renderUsers = () => {
    return (
      <div style={{ padding: '2em 0em' }}>
        <h2>Список пользователей</h2>
        <Divider />
        <Table compact>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>Пароль</Table.HeaderCell>
              <Table.HeaderCell>Роль</Table.HeaderCell>
              <Table.HeaderCell>Статус</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.users.map(user => (
              <UserItem
                key={user._id}
                user={user}
                delUser={this.props.delUser}
                updateUser={this.props.updateUser}
                isUpdating={this.props.isUpdating}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.props.error ? (
          <Message negative>
            <Message.Header>Что-то пошло не так!</Message.Header>
            <p>{this.props.error}</p>
          </Message>
        ) : null}

        {this.props.isLoading ? (
          <Loader
            active
            size="large"
            inline="centered"
            style={{ marginTop: '5em', marginBottom: '5em' }}
          />
        ) : (
          this.renderUsers()
        )}
      </div>
    );
  }
}

UsersList.propTypes = {
  getUsers: PropTypes.func.isRequired,
  delUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  users: PropTypes.array,
  isLoading: PropTypes.bool,
  isUpdating: PropTypes.bool,
  error: PropTypes.string
};

UsersList.defaultProps = {
  users: [],
  isLoading: false,
  isUpdating: false,
  error: ''
};

const mapStateToProps = state => {
  return {
    users: state.usersStore.users,
    isLoading: state.usersStore.isLoading,
    isUpdating: state.usersStore.isUpdating,
    error: state.usersStore.error
  };
};

export default connect(mapStateToProps, { getUsers, delUser, updateUser })(
  UsersList
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Checkbox, Button } from 'semantic-ui-react';

import { showModal } from '../../actions/modalActions';
import { MODAL_TYPE_CONFIRMATION } from '../modal/modalTypes';

class UserItem extends Component {
  state = {
    data: {
      _id: '',
      email: '',
      password: '',
      role: '',
      isActive: false,
      isUpdating: false
    },
    errors: {},
    isTouched: false
  };

  componentDidMount() {
    if (this.props.user._id) {
      const { _id, email, role, isActive } = this.props.user;
      this.setState({
        data: { _id, email, password: '', role, isActive, isUpdating: false }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user._id) {
      const newdata = this.state.data;
      newdata.isUpdating = this.props.user.isUpdating;
      this.setState({ data: newdata });
    }
  }

  handleStringChange = (e, d) => {
    const newdata = this.state.data;
    newdata[d.name] = d.value;
    this.setState({ data: newdata, isTouched: true });
  };

  toggle = () => {
    const newdata = this.state.data;
    newdata.isActive = !newdata.isActive;
    this.setState({ data: newdata, isTouched: true });
  };

  handleSave = e => {
    e.preventDefault();
    // const errors = this.validate(this.state.data);
    // this.setState({ errors });
    const newdata = this.state.data;
    newdata.isUpdating = true;
    this.setState({ data: newdata, isTouched: false });

    if (newdata.password === '') {
      delete newdata.password;
    }
    this.props.updateUser(newdata);
  };

  showConfirm = () => {
    this.props.showModal(MODAL_TYPE_CONFIRMATION, {
      title: `Удалить пользователя: ${this.state.data.email}?`,
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.delUser(this.state.data._id);
        }
      }
    });
  };

  render() {
    const { data, errors } = this.state;

    return (
      <Table.Row>
        <Table.Cell>
          <Input
            type="text"
            name="email"
            value={data.email}
            disabled={data.isUpdating}
            onChange={this.handleStringChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            type="password"
            name="password"
            value={data.password}
            disabled={data.isUpdating}
            onChange={this.handleStringChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            type="text"
            name="role"
            value={data.role}
            disabled={data.isUpdating}
            onChange={this.handleStringChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Checkbox
            checked={data.isActive}
            disabled={data.isUpdating}
            onChange={this.toggle}
          />
        </Table.Cell>
        <Table.Cell>
          <Button
            size="small"
            color="teal"
            disabled={!this.state.isTouched}
            onClick={this.handleSave}
          >
            Сохранить
          </Button>
          <Button
            size="small"
            negative
            disabled={data.isUpdating}
            onClick={() => this.showConfirm()}
          >
            Удалить
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(null, { showModal })(UserItem);

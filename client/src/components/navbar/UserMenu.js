import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';

const UserMenu = ({ user, signoutUser }) => {
  const renderAdminMenuItem = () => {
    if (user.role === 'admin') {
      return (
        <Dropdown.Item as={NavLink} to="/users">
          Пользователи
        </Dropdown.Item>
      );
    }
    return null;
  };

  return (
    <Menu.Menu position="right">
      <Dropdown item simple text={user.email}>
        <Dropdown.Menu>
          {renderAdminMenuItem()}
          <Dropdown.Item as={NavLink} to="/profile">
            Профиль
          </Dropdown.Item>
          <Dropdown.Item onClick={signoutUser}>Выход</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
};

UserMenu.propTypes = {
  signoutUser: PropTypes.func.isRequired
};

export default withRouter(UserMenu);

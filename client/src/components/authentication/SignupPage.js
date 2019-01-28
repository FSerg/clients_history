import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { signupSubmit } from '../../actions/authActions';

import SignupLoginForm from './SignupLoginForm';

class SignupPage extends Component {
  render() {
    return (
      <SignupLoginForm
        submit={this.props.signupSubmit}
        authError={this.props.authError}
        authLoading={this.props.authLoading}
      />
    );
  }
}

SignupPage.propTypes = {
  signupSubmit: PropTypes.func.isRequired,
  authError: PropTypes.string,
  authLoading: PropTypes.bool
};

SignupPage.defaultProps = {
  authError: '',
  authLoading: false
};

const mapStateToProps = state => {
  return {
    authError: state.auth.error,
    authLoading: state.auth.authLoading
  };
};

export default connect(mapStateToProps, { signupSubmit })(SignupPage);

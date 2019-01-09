import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountForm from '../AccountForm/AccountForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { register, openSnackbar } from '../../actions';

const mapStateToProps = state => {
  return {
    isSignedIn: state.account.isSignedIn,
    isPending: state.account.isPending,
    username: state.account.username,
    email: state.account.email
  };
}

const mapDispatchToProps = dispatch => {
  return{
    handleOnSubmit: (username, email, password) => dispatch(register(username, email, password)),
    handleOpenSnackBar: (message, variant) => dispatch(openSnackbar(message, variant))
  };
}

class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerUsername: '',
      registerEmail: '',
      registerPassword: ''
    }
  }
  onUsernameChange = (event) => {
    this.setState({registerUsername: event.target.value})
  }
  onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.registerUsername === '' || this.state.registerEmail === '' || this.state.registerPassword === '') {
      this.props.handleOpenSnackBar('You have to fill all input fields', 'warning');
      return;
    }
    this.props.handleOnSubmit(this.state.registerUsername, this.state.registerEmail, this.state.registerPassword)
  }
  render() {
    return (
      <AccountForm
        name='Register'
        elseText={`Already have an account? Click Here!`}
        handleChangeForm={this.props.handleChangeForm}
        handleOnSubmit={this.handleSubmit}
      >
        <TextField
          id="outlined-text-input"
          label="Username"
          type="text"
          name="username"
          autoComplete="off"
          margin="normal"
          variant="outlined"
          value={this.state.registerUsername}
          onChange={this.onUsernameChange}
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value={this.state.registerEmail}
          onChange={this.onEmailChange}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          value={this.state.registerPassword}
          onChange={this.onPasswordChange}
        />
        <Button variant="contained" color="primary" type='submit'>
          {this.props.isPending ? 'Loading...' : 'Register'}
        </Button>
      </AccountForm>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

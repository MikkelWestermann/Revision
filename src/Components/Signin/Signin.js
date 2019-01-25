import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountForm from '../AccountForm/AccountForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Redirect } from 'react-router-dom';

import { signin, openSnackbar } from '../../actions';

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
    handleOnSubmit: (accountName, password) => dispatch(signin(accountName, password)),
    handleOpenSnackBar: (message, variant) => dispatch(openSnackbar(message, variant))
  };
}

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      signInAccount: '',
      signInPassword: '',
      redirect: ''
    }
  }
  onAccountChange = (event) => {
    this.setState({signInAccount: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.signInAccount === '' || this.state.signInPassword === '') {
      this.props.handleOpenSnackBar('You have to fill all input fields', 'warning');
      return;
    }
    if (this.props.fromHomepage) {
      this.setState({
        redirect: 'home'
      })
    }
    this.props.handleOnSubmit(this.state.signInAccount, this.state.signInPassword)
  }
  render() {
    if (this.state.redirect === 'home' && this.props.isSignedIn) {
      return <Redirect to='/home' />
    }
    return (
      <AccountForm
        name='Sign In'
        elseText={`Dont' have an account yet? Click Here!`}
        handleChangeForm={this.props.handleChangeForm}
        handleOnSubmit={this.handleSubmit}
      >
        <TextField
          id="outlined-text-input"
          label="Email or Username"
          type="text"
          name="user"
          autoComplete="off"
          margin="normal"
          variant="outlined"
          value={this.state.signInAccount}
          onChange={this.onAccountChange}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          value={this.state.signInPassword}
          onChange={this.onPasswordChange}
        />
        <Button variant="contained" color="primary" type='submit'>
          {this.props.isPending ? 'Loading...' : 'Sign In'}
        </Button>
      </AccountForm>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

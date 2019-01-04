import React, { Component } from 'react';
import AccountForm from '../AccountForm/AccountForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Signin extends Component {
  render() {
    return (
      <AccountForm name='Sign In' elseText={`Dont' have an account yet? Click Here!`} handleChangeForm={this.props.handleChangeForm}>
        <TextField
          id="outlined-text-input"
          label="Email or Username"
          type="text"
          name="user"
          autoComplete="off"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" type='submit'>
          Sign In
        </Button>
      </AccountForm>
    );
  }
}

export default Signin;

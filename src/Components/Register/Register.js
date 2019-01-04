import React, { Component } from 'react';
import AccountForm from '../AccountForm/AccountForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Register extends Component {
  render() {
    return (
      <AccountForm name='Register' elseText={`Already have an account? Click Here!`} handleChangeForm={this.props.handleChangeForm}>
        <TextField
          id="outlined-text-input"
          label="Username"
          type="text"
          name="username"
          autoComplete="off"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
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
          Register
        </Button>
      </AccountForm>
    );
  }
}

export default Register;

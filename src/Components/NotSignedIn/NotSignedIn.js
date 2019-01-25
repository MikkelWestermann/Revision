import React, { Component } from 'react';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';

class NotSignedIn extends Component {
  constructor() {
    super();
    this.state = {
      form: 'signin'
    }
  }
  handleChangeForm = () => {
    if (this.state.form === 'signin') {
      this.setState({ form: 'register' })
    } else {
      this.setState({ form: 'signin' })
    }
  }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 1000}}>
        <h1>You have to be signed in to do that, bud...</h1>
        {
          this.state.form === 'signin'
          ?
          <Signin handleChangeForm={this.handleChangeForm} fromHomepage={true}/>
          :
          <Register handleChangeForm={this.handleChangeForm}/>
        }
      </div>
    )
  }
}

export default NotSignedIn;

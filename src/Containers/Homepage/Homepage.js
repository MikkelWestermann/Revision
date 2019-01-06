import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { default as Signin } from '../../Components/Signin/Signin';
import Register from '../../Components/Register/Register';
import './Homepage.css';

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

  };
}

class Homepage extends Component {
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
      <div className='homepage'>
        <div className='jumbotron'>
          <div className='welcomeText'>
            <h1>Welcome to <span>Revision</span>!</h1>
            <p>The BEST training app for higher retention</p>
            <p>Sign up <span>NOW</span>!</p>
          </div>
          {
            this.state.form === 'signin'
            ?
            <Signin handleChangeForm={this.handleChangeForm}/>
            :
            <Register handleChangeForm={this.handleChangeForm}/>
          }
        </div>
        <div className='description'>
          <section id='descriptionSectionOne'>
            Section 1
          </section>
          <section id='descriptionSectionTwo'>
            Section 2
          </section>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

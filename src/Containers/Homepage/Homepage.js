import React, { Component } from 'react';
import { connect } from 'react-redux';
import { default as Signin } from '../../Components/Signin/Signin';
import Register from '../../Components/Register/Register';
import './Homepage.css';

import logo from '../../GraphicalAssets/Revision_logo_medium.png';
import cardImage from '../../GraphicalAssets/Revision_Card_image.png';
import questionImage from '../../GraphicalAssets/Revision_quetionmark_icon.png';
import forgettingImage from '../../GraphicalAssets/Revision_forgetting_image.png';


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
            <img alt='Logo' src={logo} />
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
            <h2>What is Revision?</h2>
            <p><strong>It's an application designed to give you higher retention of the things you learn</strong></p>
            <div className='descriptionBody'>
              <div>
                <p>You make card groups with information that you review and the app keeps track of what you have reviewed and when. When a certain amount of time has passed the app will tell you to review the card group again. The review interval is calculated from the Forgetting Curve</p>
                <p>You can either choose to create your own card group or search through the community and select groups other members have made!</p>
              </div>
              <div className='descriptionGraphic'>
                <img alt='questionmark' src={questionImage} />
              </div>
            </div>
          </section>
          <section id='descriptionSectionTwo'>
            <h2>Cards and Card Groups</h2>
            <p><strong>Easy to use system for organizing your training</strong></p>
            <div className='descriptionBody'>
              <div className='descriptionGraphic'>
                <img alt='example of the training cards' src={cardImage} />
              </div>
              <div>
                <p>You can create your own cards/card groups or explore the ones already created by the community.</p>
                <p>With the cards it's easy to create each training set, so you spend less time preparing and more time training that big beautiful brain of yours!</p>
              </div>
            </div>
          </section>
          <section id='descriptionSectionThree'>
            <h2>The Forgetting Curve</h2>
            <p><strong>The rate, at which your memory retention declines over time</strong></p>
            <div className='descriptionBody'>
              <div>
                <p>We base our calculations of review interval on the forgetting curve, which you can read more about here: <a href='https://en.wikipedia.org/wiki/Forgetting_curve'>The Forgetting Curve</a></p>
              </div>
              <div className='descriptionGraphic'>
                <img alt='example of the forgetting curve' src={forgettingImage} />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

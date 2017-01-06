import React from 'react';

import SignUp from './Nav/SignUp';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showSignUp: false }

    this.displaySignUpComponent = this.displaySignUpComponent.bind(this);
    this.handleGoToLanding = this.handleGoToLanding.bind(this);

  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  displaySignUpComponent(evt) {
    evt.preventDefault();
    console.log('show signup...')
    this.setState({showSignUp: true});
  }

  renderLandingBlurb() {
    return (
      <button onClick={this.displaySignUpComponent} id='landing-sign-up' className='btn btn-primary'>
        Sign Up!
      </button>
    )
  }

  renderSignUp() {
    return (
      <div>
        <button onClick={this.handleGoToLanding} id='go-back' className='btn btn-default'>
          Go Back
        </button>
        <SignUp />
      </div>
    )
  }

  handleGoToLanding(evt) {
    evt.preventDefault();
    this.setState({showSignUp: false});
  }

  render() {
    return (
      <div id='landing-page-container'>
        <div id='sign-up-blurb'>
          {
            this.state.showSignUp ? 
              this.renderSignUp() : this.renderLandingBlurb()
          }
        </div>
      </div>
    )
  }
}
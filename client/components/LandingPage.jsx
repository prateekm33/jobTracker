import React from 'react';

import SignUp from './Nav/SignUp';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showSignUp: false }

    this.renderSignUpComponent = this.renderSignUpComponent.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  renderSignUpComponent(evt) {
    evt.preventDefault();
    console.log('show signup...')
    this.setState({showSignUp: true});
  }

  renderLandingBlurb() {
    return (
      <button onClick={this.renderSignUpComponent} id='landing-sign-up' className='btn btn-primary'>
        Sign Up!
      </button>
    )
  }

  render() {
    return (
      <div id='landing-page-container'>
        <div id='sign-up-blurb'>
          {
            this.state.showSignUp ? 
              <SignUp /> : this.renderLandingBlurb()
          }
        </div>
      </div>
    )
  }
}
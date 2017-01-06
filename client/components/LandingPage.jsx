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
      <div id='blurb-container'>
        <div id='intro-message'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum dolor a nibh efficitur sodales. Aliquam at odio justo. Vestibulum fringilla porta diam ullamcorper gravida. Vivamus tellus arcu, vehicula quis vehicula at, laoreet sit amet arcu. Praesent erat mi, luctus vulputate turpis id, luctus hendrerit erat. Fusce ullamcorper nec tortor id interdum. In fermentum, mauris in maximus congue, lectus erat sagittis erat, nec vestibulum lectus lectus et justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse potenti. Cras viverra mauris placerat felis venenatis euismod. Aliquam erat volutpat. Nunc ut dui in neque iaculis congue. Mauris egestas erat lorem, nec mollis ex aliquet sit amet. Cras pretium leo at nulla tincidunt, quis suscipit augue lacinia. Vestibulum tincidunt quam sit amet risus sagittis, sed dapibus eros cursus. Nulla tortor mi, efficitur non vestibulum non, vehicula vitae quam.
        </div>
        <button onClick={this.displaySignUpComponent} id='landing-sign-up' className='btn btn-primary'>
          Sign Up!
        </button>
      </div>
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
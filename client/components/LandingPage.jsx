import React from 'react';


export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  render() {
    return (
      <div id='landing-page-container'>
        LandingPage
      </div>
    )
  }
}
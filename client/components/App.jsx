import React from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard'
import Nav from './Nav';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='main-app-container'>
        <Nav />
        <Dashboard />
        <div id='secondary-app-container'>
          {
            // secondary-app-container
            this.props.children
          }
        </div>
        <div id='footer'>FOOTER</div>
      </div>
    )
  }
}

// may not need to pass all state to this top level comp
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
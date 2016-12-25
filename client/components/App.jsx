import React from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard'
import Nav from './Nav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTopLvlContentClicks = this.handleTopLvlContentClicks.bind(this);

    this.state = {
      dropDownEls: null
    }
  }

  componentDidMount() {
    let dropdowns = this.contentContainer.querySelectorAll('.dropdown-component')

    dropdowns = Array.prototype.slice.call(dropdowns);

    this.setState({dropDownEls: dropdowns});
  }

  handleTopLvlContentClicks(evt) {
    const target = evt.target;

    this.state.dropDownEls.forEach(dropDown => {
      if (dropDown !== target && !dropDown.contains(target)) {
        const ul = dropDown.querySelector('ul');
        ul.classList.toggle('display-none', true);
      }
    });
  }

  render() {
    return (
      <div id='main-app-container' 
        onClick={this.handleTopLvlContentClicks}
        ref={el => {this.contentContainer = el }}>
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
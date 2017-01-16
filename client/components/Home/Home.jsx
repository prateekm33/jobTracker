

import React from 'react'
import { connect } from 'react-redux';

import actions from '../../redux/actions'

import JobsView from './Jobs/JobsView';
import AddJob from './Jobs/AddJob';

import { SortIcons } from '../Utils'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'My Pipeline'
    }
  }

  handleTitleClick() {
    console.log('TODO: make title editable...');
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchJobs());
  }

  render() {
    return (
      <div id='home-container'>
        {
          // title
            // add new button
          // list
          // navigate
        }
        <div id='list-title-container'>
          <div id='list-title' onClick={this.handleTitleClick.bind(this)}>
            {this.state.title}</div>
        </div>
        <AddJob />
        <JobsView />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);
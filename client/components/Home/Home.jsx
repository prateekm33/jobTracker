import React from 'react'

import JobsView from './JobsView';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'My Pipeline'
    }
  }

  handleTitleClick() {
    console.log('TODO: make title editable...');
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

        <div id='list-title' onClick={this.handleTitleClick.bind(this)}>{this.state.title}</div>
        <JobsView />
      </div>
    )
  }
}
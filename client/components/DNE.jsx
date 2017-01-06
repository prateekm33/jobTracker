import React from 'react';
import { Link } from 'react-router';

export default class DNE extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='page-dne-container'>
        <div style={{'margin-bottom': '2em'}}>Sorry! The page you are looking for does not exist.</div>
        <Link to='/home'>Click here</Link> to go back to the homepage
      </div>
    )
  }
}
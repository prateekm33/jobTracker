import React from 'react';

import { DropDown } from './Utils';

export default class Nav extends React.Component {
  constructor() {
    super();
  }

  logout(evt) {
    console.log('logging out...');
  }

  toggleDropdown(evt) {
    console.log('toggling dropdown...');
    const target = evt.target;
    if (target.id === 'profile-dropdown') {
      const children = Array.prototype.slice.call(target.children)
      children.forEach(child => {
        let display = window.getComputedStyle(child).display;
        if (display === 'none') {
          child.style.display = 'block'
          console.log(child.style.display)
        } else {
          child.style.display = 'none'
        }
      });
    }
  }

  render() {
    return (
      <nav id='main-nav'>
        <li><a href='/home'>JobTracker</a></li>
        <li>
         <ul id='profile-dropdown' onClick={this.toggleDropdown.bind(this)}> SETTINGS
          <div>
            <li><a href='/profile'>Profile</a></li>
            <li><a onClick={this.logout.bind(this)}>Logout</a></li>
          </div>
        </ul></li>
      </nav>
    )
  }
}

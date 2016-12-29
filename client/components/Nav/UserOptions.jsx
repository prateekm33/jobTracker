import React from 'react';

class UserOptions extends React.Component {
  constructor() {
    super();
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this)
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
        } else {
          child.style.display = 'none'
        }
      });
    }
  }

  logout(evt) {
    evt.preventDefault();

  }

  render() {
    return (
      <ul id='profile-dropdown' onClick={this.toggleDropdown}> SETTINGS
        <div>
          <li><a href='/profile'>Profile</a></li>
          <li><a onClick={this.logout}>Logout</a></li>
        </div>
      </ul>
    )
  }
}


export default UserOptions;
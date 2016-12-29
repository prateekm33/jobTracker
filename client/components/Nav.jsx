import React from 'react';
import { connect } from 'react-redux';

import actions from '../redux/actions';

import { DropDown } from './Utils';
import Auth from './Auth';

function Nav() {
  return (
    <nav id='main-nav'>
      <li><a href='/home'>JobTracker</a></li>
      <UserOptions />
    </nav>
  )
}

class UserOptions extends React.Component {
  constructor() {
    super();
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this)
  }

  isAuthRender(auth) {
    if (auth) {
      return (
        <ul id='profile-dropdown' onClick={this.toggleDropdown}> SETTINGS
          <div>
            <li><a href='/profile'>Profile</a></li>
            <li><a onClick={this.logout}>Logout</a></li>
          </div>
        </ul>
      )
    } 

    else {
      return (
        <Auth />
      )

    }
  }

  logout() {

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

  render() {
    return (
      <li>
        {
          this.isAuthRender(this.props.authenticated) 
        }
      </li>
    )
  }
}

// class Nav extends React.Component {
//   constructor() {
//     super();
//   }

//   toggleDropdown(evt) {
//     console.log('toggling dropdown...');
//     const target = evt.target;
//     if (target.id === 'profile-dropdown') {
//       const children = Array.prototype.slice.call(target.children)
//       children.forEach(child => {
//         let display = window.getComputedStyle(child).display;
//         if (display === 'none') {
//           child.style.display = 'block'
//         } else {
//           child.style.display = 'none'
//         }
//       });
//     }
//   }

//   render() {
//     return (
//       <nav id='main-nav'>
//         <li><a href='/home'>JobTracker</a></li>
//         {
//           this.props.authenticated ? 
//             (
//               <li>
//                 <ul id='profile-dropdown' onClick={this.toggleDropdown.bind(this)}> SETTINGS
//                   <div>
//                     <li><a href='/profile'>Profile</a></li>
//                     <li><a onClick={this.logout.bind(this)}>Logout</a></li>
//                   </div>
//                 </ul>
//               </li>
//             ) :

//             <LogIn />
//         }
//       </nav>
//     )
//   }
// }


function mapStateToProps(state) {
  return { authenticated: state.authenticated }
}

connect(mapStateToProps)(UserOptions);
export default Nav;


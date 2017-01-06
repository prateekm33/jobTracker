import React from 'react';
import actions from '../../redux/actions';
import { store } from '../../redux/store';

export const validateEmail = (target) => {
    const value = target.value;  
    const isValid = value.match(/((\w(\.)?)*\w)@((([a-zA-Z0-9]-*)*)([a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,64}/g);

    const flashErrorMsg = 'Please enter a valid email address';
    const flashSuccessMsg = 'Email Valid!'
    let isError = true;
    if (!isValid) {
      target.classList.add('auth-input-error');
      store.dispatch(actions.addFlash(flashErrorMsg, isError, flashSuccessMsg));
      return false;
    }

    isError = false
    store.dispatch(actions.addFlash(flashSuccessMsg, isError, flashErrorMsg));
    target.classList.remove('auth-input-error');
    return isValid;
}

export const validatePassword = (target) => {
    const value = target.value;

    const flashErrorMsg = 'Your password must be at least 6 characters long.'
    const flashSuccessMsg = 'Password Valid!'
    let isError = true;

    if (value.length < 6) {
      target.classList.add('auth-input-error');
      store.dispatch(actions.addFlash(flashErrorMsg, isError, flashSuccessMsg));
      return false;
    }
    
    isError = false;
    store.dispatch(actions.addFlash(flashSuccessMsg, isError, flashErrorMsg));
    target.classList.remove('auth-input-error');
    return true;
}

export const validateAuthForm = (form) => {
  const inputs = Array.prototype.slice.call(form.querySelectorAll('input'));

  for (let i = 0; i < inputs.length; i++) {
    if (i.type === 'password') {
      if (!validatePassword(inputs[i])) return {formValid: false, error: 'short password'};
    } else if (i.type === 'email') {
      if (!validateEmail(inputs[i])) return {formValid: false, error: 'invalid email'};
    }
  }

  return {formValid: true, error: null};
}


export const SortIcons = (props) => {
  const id = props.id;

  return (
    <span className='sort-icon-container' id={id}>
      <span className={'glyphicon glyphicon-triangle-top sort-icon'}></span>
      <span className={'glyphicon glyphicon-triangle-bottom sort-icon'}></span>
    </span>
  )
}

export const DropDown = (props) => {
  const items = props.items; 
  const tagID = props.tagID;

  const statuses = {
                    'APPLIED': 'applied',
                    'PHONE-SCREEN': 'phone-screen',
                    'ON-SITE': 'on-site',
                    'OFFER' : 'offer',
                    'REJECTED' : 'rejected' 
                  }

  const classStringDiv = statuses[props.defaultOption.split(' ').join('-')] || '';

  return (
    <div onClick={props.clickHandler} id={tagID} className='dropdown-component' ref={props.refFn}>
      <div className={'dropdown-toggle btn btn-default ' + classStringDiv} id='selected-option'>{props.defaultOption}</div>
      <ul className='dropdown-menu'>
        {
          items.map((item, idx) => {
            item = item.toUpperCase();
            const classStringLi = statuses[item.split(' ').join('-')] || '';
            return (
              <li className={classStringLi+'-dd'} key={idx}> {item} </li>
            )
          })
        }
      </ul>
    </div>
  )
}
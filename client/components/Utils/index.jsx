import React from 'react'

export const validateEmail = (target) => {
    const value = target.value;  
    const isValid = value.match(/((\w(\.)?)*\w)@((([a-zA-Z0-9]-*)*)([a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,64}/g);

    if (!isValid) {
      // TODO - HANDLE ERROR
      console.log('TODO - HANDLE UI ERROR, invalid email...');
      return false;
    }
}

export const validatePassword = (target) => {
    const value = target.value;

    if (value.length < 6) {
      // TODO - HANDLE ERROR
      console.log('TODO - HANDLE UI ERROR, password is too short');
      return false;
    }
}

export const validateAuthForm = (form) => {
  const inputs = Array.prototype.slice.call(form.querySelectorAll('input'));

  for (let i = 0; i < inputs.length; i++) {
    if (i.type === 'password') {
      if (!validatePassword(inputs[i])) return false;
    } else if (i.type === 'email') {
      if (!validateEmail(inputs[i])) return false;
    }
  }

  return true;
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

  return (
    <div onClick={props.clickHandler} id={tagID} className='dropdown-component' ref={props.refFn}>
      <div className='default-dropdown-option'>{props.defaultOption}</div>
      <ul className='dropdown-list display-none'>
        {
          items.map((item, idx) => {
            if (typeof item === 'string') item = item.toUpperCase();
            return (
              <li key={idx}> {item} </li>
            )
          })
        }
      </ul>
    </div>
  )

}
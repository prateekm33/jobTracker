import React from 'react'

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
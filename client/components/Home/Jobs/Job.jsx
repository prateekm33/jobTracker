import React from 'react';

function Job(props) {
  // TODO - date display should be human readable
    // ie: '2 weeks ago' 'about a month ago' etc
  const view = props.view;
  const classStatus = props.job.status.split(' ').join('-').toLowerCase();

  const date_applied = new Date(props.job.date_applied).toLocaleDateString();

  if (view === 'small') {
    return (
      <div 
        className={'job-container ' + classStatus}
        onClick={(evt) => {props.clickHandler(evt, props.job, props.idx)}}>
        <div className={'company-detail'}>{props.job.company}</div>
        <div className={'role-detail'}>{props.job.role}</div>
        <div className={'contact-detail'}>{props.job.contact}</div>
        <div className={'status-detail'}>{props.job.status.toUpperCase()}</div>
        <div className={'date-detail'}>{date_applied}</div>
      </div>
    )
  } else if (view === 'large') {
    return (
      <tr className={'table-job-container ' + classStatus} onClick={(evt) => {props.clickHandler(evt, props.job, props.idx)}}>
        <td className={'company-data-cell'}>{props.job.company}</td>
        <td className={'role-data-cell'}>{props.job.role}</td>
        <td className={'contact-data-cell'}>{props.job.contact}</td>
        <td className={'status-data-cell'}>{props.job.status.toUpperCase()}</td>
        <td className={'date-data-cell'}>{date_applied}</td>
      </tr>
    )
  } else {
    const str = "Whoops! Can't load this data right now. "
    return <div>{str}</div>
  }

}

export default Job;
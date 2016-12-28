import React from 'react';
import { connect } from 'react-redux'
import actions from '../../../redux/actions';

import JobForm from './JobForm';

class EditJob extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFormComplete(evt) {
    // this is bound to form component 

    evt.preventDefault();
    const job = this.props.job;
    job.company = this.companyNameInput.value || '';
    if (!job.company.trim()) {
      // invalid company name ---> TODO - handle UI
      return;
    }
    let date = this.dateInput.value.split('-');
    if (date.length <= 2) {
      // invalid date ---> TODO - handle UI
      return;
    }

    if (date[2][0] === '0') {
      date[2] = date[2][1];
    }
    date = date.join('-');
    job.date_applied = new Date(date);

    
    job.role = this.roleNameInputDiv.querySelector('input').value;
    job.contact = this.contactInput.value;
    this.props.dispatch(actions.closeEditJobForm());
    // dispatch sort to re-sort array
    this.props.dispatch(actions.sortBy(this.props.sortBy, false))
  }

  render() {
    return (
      <div ref={this.props.refFn} id='edit-job-container' className='form-container'>
        <div id='edit-form-title' className='container-title'>EDIT JOB</div>
        <JobForm job={this.props.job} handleFormComplete={this.handleFormComplete}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { job: state.jobToEdit }
}

export default connect(mapStateToProps)(EditJob);
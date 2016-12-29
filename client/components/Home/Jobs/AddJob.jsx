import React from 'react'
import { connect } from 'react-redux';

import actions from '../../../redux/actions';

import JobForm from './JobForm';

class AddJob extends React.Component {
  constructor(props) {
    super(props);
    this.activateForm = this.activateForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.returnSelf = this.returnSelf.bind(this);
  }

  activateForm(evt) {
    evt.preventDefault();
    this.props.dispatch(actions.addForm(true));
  }

  handleFormComplete(evt) {
    /*
     DO NOT REMOVE THIS COMMENT: 
      this is bound to form component 
    */

    evt.preventDefault();

    const company = this.companyNameInput.value;
    if (!company.trim()) {
      // invalid company name ---> TODO
      return;
    }

    let date = this.dateInput.value.split('-');
    if (date.length <= 2) {
      // invalid date ---> TODO
      return;
    }

    if (date[2][0] === '0') {
      date[2] = date[2][1];
    }
    date = date.join('-');
    date = new Date(date);

    const role = this.roleNameInputDiv.querySelector('input').value;
    const contact = this.contactInput.value;

    // TODO --- add in option for status update in jobForm
    const job = {
      company,
      date_applied: date,
      role, 
      contact,
      status: 'Applied'
    }

    this.props.dispatch(actions.addJob(job));
    this.props.dispatch(actions.sortBy(this.props.sortBy, false));
    this.closeForm();
  }

  closeForm() {
    this.props.dispatch(actions.addForm(false));
  }

  returnSelf() {
    return this;
  }

  render() {
    return (
      <div id='add-job-component'>
        <button onClick={this.activateForm} id='open-add-form'>Add Job</button>
  
        {
          this.props.addForm ? 
            (<div id='add-job-container' className='form-container' ref={el => this.formEl = el}>
              <div id='add-job-form-title' className='container-title'>ADD JOB</div>
              <JobForm job={null} handleFormComplete={this.handleFormComplete} getParent={this.returnSelf}/>
            </div>) :
            null
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sortBy: state.sortBy,
    addForm: state.addForm
  }
}

export default connect(mapStateToProps)(AddJob)
import React from 'react'
import { connect } from 'react-redux';

import actions from '../../../redux/actions';

import JobForm from './JobForm';

class AddJob extends React.Component {
  constructor(props) {
    super(props);
    this.activateForm = this.activateForm.bind(this);
    this.returnSelf = this.returnSelf.bind(this);
  }

  activateForm(evt) {
    evt.preventDefault();
    this.toggleForm();
  }

  toggleForm() {
    this.formEl.classList.toggle('display-none');
  }

  handleFormComplete(evt) {
    // this is bound to form component 

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
      date_appled: date,
      role, 
      contact,
      status: 'Applied'
    }

    this.props.dispatch(actions.addJob(job));
    this.props.dispatch(actions.sortBy(this.props.sortBy, false));

    // TODO -- CLOSE FORM
    this.parentEl = this.props.getParent();
    this.parentEl.toggleForm();
  }

  returnSelf() {
    return this;
  }

  render() {
    return (
      <div id='add-job-component'>
        <button onClick={this.activateForm} id='open-add-form'>Add Job</button>

        <div id='add-job-container' className='display-none form-container'
          ref={el => this.formEl = el}>
          <div id='add-job-form-title' className='container-title'>ADD JOB</div>
          <JobForm job={null} getParent={this.returnSelf} handleFormComplete={this.handleFormComplete}/>
        </div>  
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sortBy: state.sortBy
  }
}

export default connect(mapStateToProps)(AddJob)
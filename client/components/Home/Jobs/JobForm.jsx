import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';

// TODO --- add in form for status input

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAddJobToList = this.handleAddJobToList.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleFormEnter = this.handleFormEnter.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFormComplete = this.handleFormComplete.bind(this);
  }

  componentDidMount() {
    const job = this.props.job;

    if (job) {
      this.companyNameInput.value = job.company;
      this.dateInput.value = job.date_applied.toISOString().split('T')[0];
      this.roleNameInputDiv.querySelector('input').value = job.role;
      this.contactInput.value = job.contact;
      this.jobReqInputDiv.querySelector('input').value = job.url || '';
    }
  }

  handleFormSubmit() {}
  handleAddJobToList() {}

  listenForEnter(evt) {
    const enter = 13;
    const escape = 27;

    switch (evt.keyCode) {
      case enter: 
        this.handleFormEnter(evt);
      case escape: 
        this.handleFormCancel(evt);
      default:
        return;
    }
  }

  handleFormEnter(evt) {
    console.log('TODO --- HANDLE FORM ENTER...jobForm.jsx')
  }

  handleFormCancel(evt) {
    evt.preventDefault();
    const parent = this.props.getParent();
    parent.closeForm();
  }

  handleDelete(evt) {
    evt.preventDefault();

    const job = this.props.job;
    const idx = this.props.editIdx;
    this.props.dispatch(actions.deleteJob(job, idx));
    this.handleFormCancel(evt);
  }

  handleFormComplete(evt) {
    evt.preventDefault();

    const company = this.companyNameInput.value;
    if (!company.trim()) {
      console.log('invalid company name --- TODO')
      return;
    }

    let date = this.dateInput.value.split('-');
    if (date.length <= 2) {
      console.log('invalid date ---> TODO')
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

    this.props.parentSubmitHandler(job);
  }

  render() {
    return (
      <form id='job-extended' ref={el => this.formEl = el}  onKeyDown={this.listenForEnter} onSubmit={this.handleFormSubmit}>
          <div className='form-line'>
            <div className='form-line-component'>
              <button onClick={this.handleFormCancel} className='form-done btn btn-default' id='cancel-button'>Cancel</button>
            </div>
          </div>
          <div className='form-line'>
            <div className='form-line-component'>
              <label htmlFor='company-name'>Company Name</label>
              <input ref={el => this.companyNameInput = el} id='company-name' className='form-control' type='text' placeholder='Company Name' required/>
            </div>
            <div className='form-line-component'>
              <label htmlFor='date-applied'>Date Applied</label>
              <input id='date-applied' className='form-control' type='date' ref={el => this.dateInput = el} required/>
            </div>
          </div>
          <div className='form-line'>
            <div className='form-line-component'>
              <label htmlFor='contact-email'>Contact Email</label>
              <input id='contact-email' ref={el=>this.contactInput = el} className='form-control'  type='email' placeholder='Contact Email'/>
            </div>
          </div>
          <div className='form-line'
            ref={el => this.roleNameInputDiv = el}>
            <div className='form-line-component'>
              <label htmlFor='job-name'>Role / Job Name</label>
              <input id='job-name' className='form-control' type='text' placeholder='Role'/>
            </div>
          </div>
          <div className='form-line'
            ref={el => this.jobReqInputDiv = el}>
            <div className='form-line-component'>
              <label htmlFor='job-req'>Job Listing</label>
              <input id='job-req' className='form-control job-req' type='text' placeholder='Job Listing' />
            </div>
          </div>
          <div className='form-line'>
            <div className='form-line-component'>
              <div id='delete-done-button-container'>
                <button onClick={this.handleFormComplete} className='form-done btn btn-primary' id='done-button'>Done</button>
                <button onClick={this.handleDelete} className='form-done btn btn-danger' id='delete-button'>Delete</button>
              </div>
            </div>
          </div>
        </form>
    )
  }
}


function mapStateToProps(state) {
  return {
    editIdx: state.editJobIdx
  };
}

export default connect(mapStateToProps)(JobForm);
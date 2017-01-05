import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';

import { DropDown } from '../../Utils'

// TODO --- add in form for status input

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleFormEnter = this.handleFormEnter.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.verifyDelete = this.verifyDelete.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
    this.handleFormComplete = this.handleFormComplete.bind(this);
    this.handleStatusDropDown = this.handleStatusDropDown.bind(this);
    this.handleStatusDropDownClick = this.handleStatusDropDownClick.bind(this);
  }

  componentDidMount() {
    const job = this.props.job;

    if (job) {
      this.companyNameInput.value = job.company;
      let date = job.date_applied;
      if (typeof date === 'object') {
        date = date.toISOString();
      }
      console.log('date: ', date)
      this.dateInput.value = date.split('T')[0];
      this.roleNameInputDiv.querySelector('input').value = job.role;
      this.contactInput.value = job.contact;
      this.jobReqInputDiv.querySelector('input').value = job.url || '';
    }
  }

  listenForEnter(evt) {
    const enter = 13;
    const escape = 27;

    switch (evt.keyCode) {
      case enter: 
        return this.handleFormEnter(evt);
      case escape: 
        return this.handleFormCancel(evt);
      default:
        return;
    }
  }

  handleFormEnter(evt) {
    this.handleFormComplete(evt);
  }

  handleFormCancel(evt) {
    evt.preventDefault();
    const parent = this.props.getParent();
    parent.closeForm();
  }

  verifyDelete(evt) {
    evt.preventDefault();
    const div = this.formEl.querySelector('#verify-delete');
    div.classList.remove('display-none');
    div.style.display = 'flex';
  }

  handleDelete(evt) {
    evt.preventDefault();

    const job = this.props.job;
    const idx = this.props.editIdx;
    this.props.dispatch(actions.deleteJob(job, idx));
    this.handleFormCancel(evt);
  }

  handleDeleteCancel(evt) {
    evt.preventDefault();

    const div = this.formEl.querySelector('#verify-delete');
    div.classList.add('display-none');
    div.style.display = '';
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
    console.log('form complete')
    this.props.parentSubmitHandler(job);
  }

  handleStatusDropDown(evt) {
    evt.preventDefault();

    if (evt.target.tagName === 'BUTTON') {
      this.statusDDMenu.classList.toggle('dropdown-menu');
    }
  }

  handleStatusDropDownClick(evt) {
    evt.preventDefault();

    const target = evt.target;
    const tag = target.tagName.toLowerCase();
    if (tag === 'button') {
      let display = window.getComputedStyle(this.statusDropDownDiv).display
      display = display === 'none' ? 'block' : 'none';
      this.statusDropDownDiv.style.display = display;
    }
  }

  render() {
    return (
      <form id='job-extended' ref={el => this.formEl = el}  onKeyDown={this.listenForEnter}>
          
          <div id='verify-delete' className='display-none'>
            <div>Are you sure?</div>
            <div className='buttons-container'>
              <button onClick={this.handleDelete} className='form-done btn btn-danger' id='delete-button'>Delete</button>
              <button onClick={this.handleDeleteCancel} className='form-done btn btn-default' id='cancel-button'>Cancel</button>
            </div>
          </div>


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
            <div className='form-line-component btn-group' id='status-div'>
              <label>Status</label>
              <button onClick={this.handleStatusDropDownClick} type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.job.status}
              </button>
              <div ref={el => {this.statusDropDownDiv = el}} className="dropdown-menu">
                {
                  ['APPLIED', 'PHONE SCREEN', 'ON-SITE', 'OFFER', 'REJECTED'].map((o, idx) => (
                    <li className='dropdown-item' key={idx}>{o}</li>
                  ))
                }
              </div>
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
                <button onClick={this.verifyDelete} className='form-done btn btn-danger' id='delete-button'>Delete</button>
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
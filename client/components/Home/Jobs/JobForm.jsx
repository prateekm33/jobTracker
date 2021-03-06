

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';

import { DropDown } from '../../Utils';
import AddJob from './AddJob';
import EditJob from './EditJob';
import Flash from '../../Flash';

// TODO --- add in form for status input

class JobForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultStatus: props.job ? props.job.status : 'APPLIED'
    }

    this.listenForEnter = this.listenForEnter.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleFormEnter = this.handleFormEnter.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.verifyDelete = this.verifyDelete.bind(this);
    this.handleDeleteHide = this.handleDeleteHide.bind(this);
    this.handleFormComplete = this.handleFormComplete.bind(this);
    this.handleStatusDropDownClick = this.handleStatusDropDownClick.bind(this);
    this.setFormRef = this.setFormRef.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);
    this.validateCompanyInput = this.validateCompanyInput.bind(this);
    this.validateDateInput = this.validateDateInput.bind(this);
  }

  componentDidMount() {
    this.companyNameInput.focus();

    const job = this.props.job;

    if (job) {
      this.companyNameInput.value = job.company;
      let date = job.date_applied;
      if (typeof date === 'object') {
        date = date.toISOString();
      }
      this.dateInput.value = date.split('T')[0];
      this.roleNameInputDiv.querySelector('input').value = job.role;
      this.contactInput.value = job.contact;
      this.jobReqInputDiv.querySelector('input').value = job.url || '';
    }
  }

  listenForEnter(evt) {

    const enter = 13;
    const escape = 27;
    const _delete = 8;

    if (evt.keyCode === escape) return this.handleFormCancel(evt);

    if (evt.keyCode === enter) return this.handleFormEnter(evt);

    if (evt.target.tagName === 'INPUT') return;

    if (evt.keyCode === _delete) {
      const deleteBtn = this.formEl.querySelector('#delete-button');
      const display = window.getComputedStyle(deleteBtn).display;
      if (display === 'none') return;
      else return this.verifyDelete(evt);
    }
  }

  handleFormEnter(evt) {
    evt.preventDefault();
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

  handleDeleteHide(evt) {
    evt.preventDefault();

    const div = this.formEl.querySelector('#verify-delete');
    div.classList.add('display-none');
    div.style.display = '';
  }

  handleFormComplete(evt) {
    evt.preventDefault();

    let company = this.validateCompanyInput(this.companyNameInput);
    if (!company) return;

    let date = this.validateDateInput(this.dateInput);
    if (!date) return;

    if (date[2][0] === '0') {
      date[2] = date[2][1];
    }
    date = date.join('-');
    date = new Date(date);

    const role = this.roleNameInputDiv.querySelector('input').value;
    const contact = this.contactInput.value;
    const status = this.statusDropDownDiv.querySelector('#selected-option').innerText;

    const job = {
      company,
      date_applied: date,
      role, 
      contact,
      status
    }
    // console.log('form complete')
    this.props.parentSubmitHandler(job);
  }

  validateCompanyInput(target) {
    const companyReqMsg = 'Company Name is required';
    const company = target.value;
    if (!company.trim()) {
      this.companyNameInput.style.border = '2px dotted red';
      this.props.dispatch(actions.addFlash(companyReqMsg, true))
      return false;
    } else {
      this.companyNameInput.style.border = '';
      this.props.dispatch(actions.removeFlash(companyReqMsg));
      return company;
    }
  }

  validateDateInput(target) {
    let date = target.value.split('-');
    const dateReqMsg = 'Date Applied is required';
    if (date.length <= 2) {
      this.dateInput.style.border = '2px dotted red';
      this.props.dispatch(actions.addFlash(dateReqMsg, true))
      return false;
    } else {
      this.dateInput.style.border = '';
      this.props.dispatch(actions.removeFlash(dateReqMsg))
      return date;
    }
  }

  handleStatusDropDownClick(evt) {
    const target = evt.target;
    const tagName = target.tagName.toLowerCase();
    const ul = this.statusDropDownDiv.querySelector('ul');

    if ( tagName === 'div') {
      const style = ul.style;
      style.display = window.getComputedStyle(ul).display === 'none' ? 'flex' : 'none';
    } else if (tagName === 'li') {
      const option = target.innerText;
      this.setState({defaultStatus: option});

      const style = ul.style;
      style.display = window.getComputedStyle(ul).display === 'none' ? 'flex' : 'none';
    }
  }

  setFormRef(el) {
    this.formEl = el;
    this.props.parentRef(el);
  }

  closeDropDown(evt) {
    const target = evt.target; 

    if (target !== this.statusDropDownDiv && !this.statusDropDownDiv.contains(target)) {
      const ul = this.statusDropDownDiv.querySelector('ul');
      ul.style.display = 'none';
    }

  }

  render() {
    return (
      <form id='job-extended' ref={this.setFormRef}  onKeyDown={this.listenForEnter} onClick={this.closeDropDown}>
          
          <div id='verify-delete' className='display-none'>
            <div>Are you sure?</div>
            <div className='buttons-container'>
              <button onClick={this.handleDelete} className='form-done btn btn-danger' id='delete-button'>Delete</button>
              <button onClick={this.handleDeleteHide} className='form-done btn btn-default' id='cancel-button'>Cancel</button>
            </div>
            <div className='shortcut-tips' style={{"fontWeight": 100, "color": '#928f8f', "fontSize": "0.7em", "alignSelf": "flex-start"}}>Use Del/BckSpc to delete</div>
          </div>


          <div className='form-line'>
            <div className='form-line-component'>
              <div className='shortcut-tips' style={{"alignSelf": "flex-end", "color": "#777575"}}>Press Esc. to cancel</div>
              <button onClick={this.handleFormCancel} className='form-done btn btn-default' id='cancel-button'>Cancel</button>
              <Flash />
            </div>
          </div>
          <div className='form-line'>
            <div className='form-line-component'>
              <label htmlFor='company-name'>Company Name*</label>
              <input tabIndex="0" ref={el => this.companyNameInput = el} id='company-name' className='form-control' type='text' placeholder='Company Name' onBlur={evt => this.validateCompanyInput(evt.target)} required/>
            </div>
            <div className='form-line-component'>
              <label htmlFor='date-applied'>Date Applied*</label>
              <input id='date-applied' className='form-control' type='date' ref={el => this.dateInput = el} required onBlur={evt => this.validateDateInput(evt.target)}/>
            </div>
          </div>
          <div className='form-line'>
            <div className='form-line-component'>
              <label htmlFor='contact-email'>Contact Email</label>
              <input id='contact-email' ref={el=>this.contactInput = el} className='form-control'  type='email' placeholder='Contact Email'/>
            </div>
            <div className='form-line-component btn-group' id='status-div'>
              <label>Status</label>
              <DropDown clickHandler={this.handleStatusDropDownClick} tagID={'status-dropdown'} 
                items={['APPLIED', 'PHONE SCREEN', 'ON-SITE', 'OFFER', 'REJECTED']} 
                refFn={(el => this.statusDropDownDiv = el).bind(this)} 
                defaultOption={this.state.defaultStatus} />
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
              <div className='shortcut-tips' id="delete-tips">Use Del/BckSpc to delete</div>
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
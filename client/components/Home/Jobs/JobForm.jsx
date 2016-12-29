import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';

// TODO --- add in form for status input

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAddJobToList = this.handleAddJobToList.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
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


  goToNext() {}
  listenForEnter() {}
  handleFormSubmit() {}
  handleAddJobToList() {}

  handleFormCancel(evt) {
    evt.preventDefault();
    const parent = this.props.getParent();
    parent.closeForm();
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
              <label htmlFor='job-name'>New Role</label>
              <div className='input-group'>
                <input id='job-name' className='form-control' type='text' placeholder='Role'
                  onKeyDown={this.listenForEnter}/>
                <span className='glyphicon glyphicon-chevron-right input-group-addon'
                  onClick={this.goToNext}></span>
              </div>
            </div>
          </div>
          <div className='form-line job-req'
            ref={el => this.jobReqInputDiv = el}>
            <div className='form-line-component'>
              <label htmlFor='job-req'>Job Listing</label>
              <div className='input-group '>
                <input id='job-req' className='form-control job-req' type='text' placeholder='Job Listing' />
                <span className='glyphicon glyphicon-plus input-group-addon' onClick={this.handleAddJobToList}></span>
              </div>
            </div>
          </div>
          <div className='form-line'>
            <div className='form-line-component'>
              <button onClick={this.props.handleFormComplete.bind(this)} className='form-done btn btn-primary' id='done-button'>Done</button>
            </div>
          </div>
        </form>
    )
  }
}


function mapStateToProps(state) {
  return {sortBy: state.sortBy};
}

export default connect(mapStateToProps)(JobForm);
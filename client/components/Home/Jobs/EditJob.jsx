import React from 'react';
import { connect } from 'react-redux'
import actions from '../../../redux/actions';

class EditJob extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const job = this.props.job;
    this.companyNameInput.value = job.company;
    this.dateInput.value = job.date_applied.toISOString().split('T')[0];
    this.roleNameInputDiv.querySelector('input').value = job.role;
    this.contactInput.value = job.contact;
    this.jobReqInputDiv.querySelector('input').value = job.url || '';
  }

  listenForEnter() {}

  goToNext() {}

  handleFormComplete(evt) {
    // TODO -- add in some animation for when the job is complete
      // make the edited job stand out more after completion

    evt.preventDefault();

    const job = this.props.job;
    job.company = this.companyNameInput.value;
    job.role = this.roleNameInputDiv.querySelector('input').value;
    job.contact = this.contactInput.value;
    let date = this.dateInput.value.split('-');
    if (date[2][0] === '0') {
      date[2] = date[2][1];
    }
    date = date.join('-');
    job.date_applied = new Date(date);

    // dispatch sort to re-sort array
    this.props.dispatch(actions.sortBy(this.props.sortBy, false))
    this.props.dispatch(actions.closeEditJobForm());
  }
  handleAddJobToList() {}

  render() {
    return (
      <div ref={this.props.refFn} id='edit-job-container'>
        <div id='edit-form-title' className='container-title'>EDIT JOB</div>
        <form id='job-extended' ref={el => this.formEl = el}  onKeyDown={this.listenForEnter.bind(this)} >
          <div className='form-line'>
            <div className='form-line-component'>
              <button onClick={this.handleFormComplete.bind(this)} className='form-done btn btn-default' id='done-button'>Done</button>
            </div>
          </div>
          <div className='form-line'>
            <div className='form-line-component'>
              <label htmlFor='company-name'>Company Name</label>
              <input ref={el => this.companyNameInput = el} id='company-name' className='form-control' type='text' placeholder='Company Name'/>
            </div>
            <div className='form-line-component'>
              <label htmlFor='date-applied'>Date Applied</label>
              <input id='date-applied' className='form-control' type='date' ref={el => this.dateInput = el}/>
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
                  onKeyDown={this.listenForEnter.bind(this)}/>
                <span className='glyphicon glyphicon-chevron-right input-group-addon'
                  onClick={this.goToNext.bind(this)}></span>
              </div>
            </div>
          </div>
          <div className='form-line job-req'
            ref={el => this.jobReqInputDiv = el}>
            <div className='form-line-component'>
              <label htmlFor='job-req'>Job Listing</label>
              <div className='input-group '>
                <input id='job-req' className='form-control job-req' type='text' placeholder='Job Listing' />
                <span className='glyphicon glyphicon-plus input-group-addon' onClick={this.handleAddJobToList.bind(this)}></span>
              </div>
            </div>
          </div>
          <div className='form-line'>
            <div className='form-line-component'>
              <button onClick={this.handleAddJobToList.bind(this)} className='form-done btn btn-primary' id='add-job'>Add Job</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { job: state.jobToEdit, sortBy: state.sortBy }
}

export default connect(mapStateToProps)(EditJob);
import React from 'react';
import { connect } from 'react-redux'
import actions from '../../../redux/actions';

import JobForm from './JobForm';

class EditJob extends React.Component {
  constructor(props) {
    super(props);
    this.returnSelf = this.returnSelf.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleFormComplete = this.handleFormComplete.bind(this);
    this.listenForKeyStroke = this.listenForKeyStroke.bind(this)
    this.setFormRef = this.setFormRef.bind(this);
  }

  returnSelf() {
    return this;
  }

  handleFormComplete(updatedJob) {
    const job = this.props.job;
    job.company = updatedJob.company;
    job.date_applied = updatedJob.date_applied;
    job.role = updatedJob.role;
    job.contact = updatedJob.contact;
    job.status = updatedJob.status;

    this.closeForm();
    this.props.dispatch(actions.sortBy(this.props.sortBy, false))
  }

  closeForm() {
    this.props.dispatch(actions.closeEditJobForm());
  }

  listenForKeyStroke(evt) {
    // 27 = escape
    if (evt.keyCode === 27) this.closeForm();

    else if (evt.keyCode === 8) {
      const div = this.formEl.querySelector('#verify-delete');
      const display = window.getComputedStyle(div).display;
      if (display === 'none') div.style.display = 'flex';
      else {
        this.props.dispatch(actions.deleteJob(this.props.job, this.props.editIdx));
        this.closeForm();
        div.style.display = 'none';
      }
    }
  }
  componentDidMount() {
    document.querySelector('#edit-job-container').focus();
  }

  setFormRef(el) {
    this.formEl = el;
  }

  render() {
    const classStr = this.props.editJob ? 'form-container' : 'form-container display-none';
    return (
      <div tabIndex="0" ref={this.props.refFn} id='edit-job-container' className={classStr} onKeyDown={this.listenForKeyStroke}>
        <div id='edit-form-title' className='container-title'>EDIT JOB</div>
        <JobForm job={this.props.job} getParent={this.returnSelf}
          parentRef={this.setFormRef}
          parentSubmitHandler={this.handleFormComplete}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    job: state.jobToEdit,
    editJob: state.editJob,
    sortBy: state.sortBy,
    editIdx: state.editJobIdx
  }
}

export default connect(mapStateToProps)(EditJob);
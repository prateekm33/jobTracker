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
    this.listenForEscape = this.listenForEscape.bind(this)
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

    this.closeForm();
    // dispatch sort to re-sort array
    this.props.dispatch(actions.sortBy(this.props.sortBy, false))
  }

  closeForm() {
    this.props.dispatch(actions.closeEditJobForm());
  }

  listenForEscape(evt) {
    // 27 = escape
    if (evt.keyCode === 27) this.closeForm();
  }
  componentDidMount() {
    document.querySelector('#edit-job-container').focus();
  }

  render() {
    const classStr = this.props.editJob ? 'form-container' : 'form-container display-none';
    return (
      <div tabIndex="0" ref={this.props.refFn} id='edit-job-container' className={classStr} onKeyDown={this.listenForEscape}>
        <div id='edit-form-title' className='container-title'>EDIT JOB</div>
        <JobForm job={this.props.job}getParent={this.returnSelf}
          parentSubmitHandler={this.handleFormComplete}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    job: state.jobToEdit,
    editJob: state.editJob,
    sortBy: state.sortBy
  }
}

export default connect(mapStateToProps)(EditJob);
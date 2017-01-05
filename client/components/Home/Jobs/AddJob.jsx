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
    this.handleFormComplete = this.handleFormComplete.bind(this);
    this.listenForEscape = this.listenForEscape.bind(this);
  }

  returnSelf() {
    return this;
  }

  activateForm(evt) {
    evt.preventDefault();
    this.props.dispatch(actions.addForm(true));
    this.buttonEl.disabled = true;
  }

  handleFormComplete(job) {
    this.props.dispatch(actions.addJob(job));
    this.props.dispatch(actions.sortBy(this.props.sortBy, false));
    this.closeForm();
  }

  closeForm() {
    this.props.dispatch(actions.addForm(false));
    this.buttonEl.disabled = false;
  }

  listenForEscape(evt) {
    // 27 = escape
    if (evt.keyCode === 27) this.closeForm();
  }
  componentDidUpdate() {
    if (this.formEl) this.formEl.focus();
  }


  render() {
    return (
      <div id='add-job-component'>
        <button ref={el => this.buttonEl = el} onClick={this.activateForm} id='open-add-form' className="btn btn-info">Add Job</button>
  
        {
          this.props.addForm ? 
            (<div tabIndex="0" onKeyDown={this.listenForEscape}
                id='add-job-container' className='form-container' ref={el => this.formEl = el}>
              <div id='add-job-form-title' className='container-title'>ADD JOB</div>
              <JobForm job={null} 
                getParent={this.returnSelf}
                parentSubmitHandler={this.handleFormComplete} />
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
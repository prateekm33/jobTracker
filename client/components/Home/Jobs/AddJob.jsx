import React from 'react'


export default class AddJob extends React.Component {
  constructor(props) {
    super(props);
    this.activateForm = this.activateForm.bind(this)
    this.handleFormComplete = this.handleFormComplete.bind(this)
  }

  activateForm(evt) {
    evt.preventDefault();

    // TODO -- activate form

  }

  handleFormComplete() {}


  render() {
    return (
      <div id='add-job-component'>
        <button onClick={this.activateForm} id='open-add-form'>Add Job</button>

        {
          // form
        }

      </div>
    )
  }
}
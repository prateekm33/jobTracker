import React from 'react'
import { connect } from 'react-redux';

import actions from '../../redux/actions';

class JobsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startIdx: 0,
      displayNum: 20
    }

    this.handleJobClicked = this.handleJobClicked.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.updateDisplayNum = _.throttle(this.updateDisplayNum.bind(this));

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidMount() {
    this.setState({displayNum: window.getComputedStyle(this.tableEl).displayNum === 'none' ? 5 : 20});
  }

  handleWindowResize(evt) {
    this.updateDisplayNum();
  }

  updateDisplayNum() {
    const display = window.getComputedStyle(this.tableEl).display;
    let displayNum = 20;
    if (display === 'none') {
      displayNum = 5
    } 
    this.setState({displayNum: displayNum});
  }

  handleJobClicked(evt, job) {
    const target = evt.target;
    console.log('TODO-- EDIT PAGE: ', target, job)
  }

  handlePageChange(evt) {
    const target = evt.target;
    const displayNum = this.state.displayNum;

    if (target.id === 'prev-page') {
      let newIdx = this.state.startIdx - displayNum;
      if (newIdx < 0) newIdx = 0;
      this.setState({startIdx: newIdx})
    } else if (target.id === 'next-page') {
      let newIdx = this.state.startIdx + displayNum;
      if (newIdx >= this.props.jobsList.length) newIdx = this.state.startIdx;
      this.setState({startIdx: newIdx})
    }
  }

  renderTable() {
    function render20(jobs, start) {
      const arr = [];

      for (let i = start; jobs[i] && i < start + 20; i++) {
        arr.push(
          <Job job={jobs[i]} key={i} idx={i} clickHandler={this.handleJobClicked} view={'large'} />
        )
      }

      return arr;
    }

    // TODO -- add row #s
              

    return (
      <table id='jobs-list-table' ref={el => this.tableEl = el}>
        {this.props.renderTableHeader()}
        <tbody>
          {
            render20.call(this, this.props.jobsList, this.state.startIdx)
          }
        </tbody>
      </table>
    )
  }

  renderComponentsView() {
    function render5(jobs, start) {
      const arr = [];
      for (let i = start; jobs[i] && i < start + 5; i++) {
        arr.push(
          <Job job={jobs[i]} key={i} idx={i} clickHandler={this.handleJobClicked} view={'small'}/>
        )
      }

      return arr;
    }

    return (
      <div id='components-view' ref={el => this.compViewEl = el}>
        {
          render5.call(this, this.props.jobsList, this.state.startIdx)
        }
      </div>
    )
  }

  render() {
    return (
      <div id='jobs-view-container'>
          { this.renderTable() }
          { this.renderComponentsView() }

          <div id='page-controls'>
            <div id='prev-page' className={'glyphicon glyphicon-chevron-left'} onClick={this.handlePageChange}></div>
            <div id='page-num'>{Math.ceil(1 + this.state.startIdx / this.state.displayNum)} / {Math.ceil(this.props.jobsList.length / this.state.displayNum)}</div>
            <div id='next-page' className={'glyphicon glyphicon-chevron-right'} onClick={this.handlePageChange}></div>
          </div>
      </div>
    )
  }
}




function Job(props) {
  // TODO - date display should be human readable
    // ie: '2 weeks ago' 'about a month ago' etc
  const view = props.view;
  const classStatus = props.job.status.split(' ').join('-').toLowerCase();

  if (view === 'small') {
    return (
      <div 
        className={'job-container ' + classStatus}
        onClick={(evt) => {props.clickHandler(evt, props.job)}}>
        <div className={'company-detail'}>{props.job.company}</div>
        <div className={'role-detail'}>{props.job.role}</div>
        <div className={'contact-detail'}>{props.job.contact}</div>
        <div className={'status-detail'}>{props.job.status.toUpperCase()}</div>
        <div className={'date-detail'}>{props.job.date_applied}</div>
      </div>
    )
  } else if (view === 'large') {
    return (
      <tr className={'table-job-container ' + classStatus}>
        <td className={'company-data-cell'}>{props.job.company}</td>
        <td className={'role-data-cell'}>{props.job.role}</td>
        <td className={'contact-data-cell'}>{props.job.contact}</td>
        <td className={'status-data-cell'}>{props.job.status.toUpperCase()}</td>
        <td className={'date-data-cell'}>{props.job.date_applied}</td>
      </tr>
    )
  } else {
    const str = "Whoops! Can't load this data right now. "
    return <div>{str}</div>
  }

}

function mapStateToProps(state) {
  return { jobsList: state.jobsList }
}

export default connect(mapStateToProps)(JobsView)
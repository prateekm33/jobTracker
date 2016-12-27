import React from 'react'
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import {DropDown, SortIcons} from '../../Utils'

import Job from './Job'
import EditJob from './EditJob'


class JobsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startIdx: 0,
      displayNum: 20,
      sortBy: null,
      defaultDropDown: 'Choose an option',
      sortByOptions: ['Company', 'Role', 'Contact', 'Status', 'Date Applied'],
      isDesc: null
    }

    this.handleJobClicked = this.handleJobClicked.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.updateDisplayNum = _.throttle(this.updateDisplayNum.bind(this));
    this.handleSortOptionClicked = this.handleSortOptionClicked.bind(this);
    this.handleDropDownClick = this.handleDropDownClick.bind(this);
    this.handleSortOrder = this.handleSortOrder.bind(this);

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidMount() {
    this.setState({displayNum: window.getComputedStyle(this.tableEl).displayNum === 'none' ? 5 : 20});
  }

  componentDidUpdate() {
    const copy = this.tableHeader_copy;
    const tableBody = this.tableEl.querySelector('tbody');
    const firstRow_tds = Array.prototype.slice.call(tableBody.querySelector('tr').querySelectorAll('td'));

    const tableWidth = window.getComputedStyle(this.tableEl).width;
    this.copyTable.style.width = tableWidth;

    const copy_ths = Array.prototype.slice.call(copy.querySelectorAll('th'));


    firstRow_tds.forEach( (col,idx) => {
      const width = window.getComputedStyle(col).width;
      copy_ths[idx].width = width;
    })
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


  handlePageChange(evt) {
    const target = evt.target;
    const displayNum = this.state.displayNum;
    const top = this.mainContainer.getBoundingClientRect().top;
    document.body.scrollTop = 0;

    if (target.id === 'prev-page') {
      let newIdx = this.state.startIdx - displayNum;
      if (newIdx < 0) newIdx = 0;
      this.setState({startIdx: newIdx});
    } else if (target.id === 'next-page') {
      let newIdx = this.state.startIdx + displayNum;
      if (newIdx >= this.props.jobsList.length) newIdx = this.state.startIdx;
      this.setState({startIdx: newIdx});

    }
  }

  renderTableHeader(id) {
    return (
      <thead ref={el => this['tableHeader_'+id] = el} onClick={this.handleSortOptionClicked}>
          <tr className='row-header'>
            <th className='company-data-cell'>
              <div className={'outside-table-header-container'}>
                <div className={'table-header-container'}>
                  <span>Company</span>
                  <SortIcons id={'sort-by-company'}/>
                </div>
              </div>
            </th>
            <th className='role-data-cell'>
              <div className={'outside-table-header-container'}>
                <div className={'table-header-container'}>
                  <span>Role/Job Title</span>
                  <SortIcons id={'sort-by-role'}/>
                </div>
              </div>
            </th>
            <th className='contact-data-cell'>
              <div className={'outside-table-header-container'}>
                <div className={'table-header-container'}>
                  <span>Contact</span>
                  <SortIcons id={'sort-by-contact'}/>
                </div>
              </div>
            </th>
            <th className='status-data-cell'>
              <div className={'outside-table-header-container'}>
                <div className={'table-header-container'}>
                  <span>Status</span>
                  <SortIcons id={'sort-by-status'}/>
                </div>
              </div>
            </th>
            <th className='date-data-cell'>
              <div className={'outside-table-header-container'}>
                <div className={'table-header-container'}>
                  <span>Date Applied</span>
                  <SortIcons id={'sort-by-date_applied'}/>
                </div>
              </div>
            </th>
          </tr>
        </thead>
    )
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

  handleJobClicked(evt, job, idx) {
    const target = evt.target;
    console.log('TODO-- EDIT PAGE: ', target, job);

    this.props.dispatch(actions.editJob(job, idx))
  }

  renderCopyTable() {
    return (
      <table id='copy-table' ref={el => this.copyTable = el}>
        { this.renderTableHeader('copy') }
      </table>
    )
  }

  handleDropDownClick(evt) {
    // for components view

    const target = evt.target;
    /*
      clicks will :
        1) toggle dropdown
          when parent container is selected
        2) change dropdown option
          when li element is selected
    */
    const ul = this.dropDownEl.querySelector('ul');
    const tagName = target.tagName.toLowerCase();
    if ( tagName === 'div') {
      // toggle
      ul.classList.toggle('display-none');

    } else if (tagName === 'li') {
      const option = target.innerText.split(' ').join('_').trim();
      ul.classList.toggle('display-none');
      if (option === this.state.sortBy) return;

      if (this.state.sortBy === null) {
        this.smallViewAscSortIcon.classList.add('black');
        this.smallViewAscSortIcon.classList.add('icon-active');
        this.smallViewAscSortIcon.previousElementSibling.classList.add('icon-active');
        this.setState({ isDesc: false });
      }

      this.setState({
        defaultDropDown: option,
        sortBy: option
      });
      let isDesc = false;
      this.props.dispatch(actions.sortBy(option, isDesc));
    }

  }

  handleSortOptionClicked(evt) {
    // for table view

    const target = evt.target;
    if (target.id.indexOf('sort-by') === -1) {
      return;
    }
    const option = target.id.split('sort-by-')[1];

    let isDesc = this.state.sortBy === option;
    this.setState({isDesc: isDesc});
    this.setState({sortBy: option});

    this.props.dispatch(actions.sortBy(option, isDesc));
  }


  handleSortOrder(evt) {
    if (this.state.sortBy === null) return;

    const target = evt.target;
    const option = this.state.sortBy;

    let isDesc;
    if (this.state.isDesc === null || this.state.isDesc) {
      isDesc = false;
      this.smallViewAscSortIcon.classList.add('black');
      this.smallViewAscSortIcon.previousElementSibling.classList.remove('black');
    } else if (!this.state.isDesc) {
      isDesc = true;
      this.smallViewAscSortIcon.classList.remove('black');
      this.smallViewAscSortIcon.previousElementSibling.classList.add('black');
    }

    this.setState({ isDesc: isDesc });
    this.props.dispatch(actions.sortBy(option, isDesc));
  }

  render() {
    return (
      <div ref={el => this.mainContainer = el } id='jobs-view-container'>
          { this.renderCopyTable() }
          { this.renderTable() }
          { this.renderComponentsView() }
          <div id='small-screen-order-direction' onClick={this.handleSortOrder}>
            <div id='sort-desc' className='glyphicon glyphicon-triangle-bottom'></div>
            <div id='sort-asc' ref={el => this.smallViewAscSortIcon = el} className='glyphicon glyphicon-triangle-top'></div>
          </div>
          <div id='small-screen-sort-by-options'>
          Sort By: 
            <DropDown 
              defaultOption={this.state.defaultDropDown} 
              items={this.state.sortByOptions} 
              tagID={'sort-by-dropdown'} 
              clickHandler={this.handleDropDownClick}
              refFn={el => {this.dropDownEl = el }}/>
          </div>

          <div id='page-controls'>
            <div id='prev-page' className={'glyphicon glyphicon-chevron-left'} onClick={this.handlePageChange}></div>
            <div id='page-num'>{Math.ceil(1 + this.state.startIdx / this.state.displayNum)} &nbsp; / {Math.ceil(this.props.jobsList.length / this.state.displayNum)}</div>
            <div id='next-page' className={'glyphicon glyphicon-chevron-right'} onClick={this.handlePageChange}></div>
          </div>

          {
            this.props.editJob ? 
            <EditJob />  :
            null
          }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { jobsList: state.jobsList, editJob: state.editJob }
}

export default connect(mapStateToProps)(JobsView)
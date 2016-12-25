import React from 'react'
import { connect } from 'react-redux';

import actions from '../../redux/actions'

import JobsView from './JobsView';

import { DropDown, SortIcons } from '../Utils'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'My Pipeline',
      sortByOptions: ['Company', 'Role', 'Contact', 'Status', 'Date Applied'],
      defaultDropDown: 'Choose an option',
      sortBy: null,
      headerPosition: {},
      lastPosition: {},
    }

    this.handleDropDownClick = this.handleDropDownClick.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.handleSortOptionClicked = this.handleSortOptionClicked.bind(this);
    this.handleScrollEvent = _.throttle(this.handleScrollEvent.bind(this));
    window.addEventListener('scroll', this.handleScrollEvent);
  }

  componentDidMount() {
    this.setState({
      headerPosition: this.tableHeader.getBoundingClientRect()
    })
  }

  handleScrollEvent() {
    const lastPosition = this.state.lastPosition;
    const initPosition = this.state.headerPosition;
    const currPosition = this.tableHeader.getBoundingClientRect();

    // if (currPosition.top < initPosition.top) {
    //   this.tableHeader.classList.add('hidden')
    // }

  }

  handleTitleClick() {
    console.log('TODO: make title editable...');
  }

  handleDropDownClick(evt) {
    const target = evt.target;
    /*
      clicks will :
        1) toggle dropdown
          when parent container is selected
        2) change dropdown option
          when li element is selected
    */
    const tagName = target.tagName.toLowerCase();
    if ( tagName === 'div') {
      // toggle
      const ul = this.dropDownEl.querySelector('ul');
      ul.classList.toggle('display-none');

    } else if (tagName === 'li') {
      const option = target.innerText;

      // TODO -- add functionality to reverse (ie: add up/down glyphicon)
      const reverse = false;

      this.props.dispatch(actions.sortBy(option, reverse))
      this.setState({defaultDropDown: option});
    }

  }


  handleSortOptionClicked(evt) {
    const target = evt.target;
    if (target.id.indexOf('sort-by') === -1) {
      return;
    }
    const option = target.id.split('sort-by-')[1];

    const reverse = this.state.sortBy === option;
    this.setState({ sortBy: option });

    this.props.dispatch(actions.sortBy(option, reverse));
  }

  renderTableHeader() {
    return (
      <thead ref={el => this.tableHeader = el} onClick={this.handleSortOptionClicked}>
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

  render() {
    return (
      <div id='home-container'>
        {
          // title
            // add new button
          // list
          // navigate
        }
        <div id='small-screen-sort-by-options'>
          Sort By: 
          <DropDown 
            defaultOption={this.state.defaultDropDown} 
            items={this.state.sortByOptions} 
            tagID={'sort-by-dropdown'} 
            clickHandler={this.handleDropDownClick}
            refFn={el => {this.dropDownEl = el }}/>
        </div>
        <div id='list-title' onClick={this.handleTitleClick.bind(this)}>{this.state.title}</div>
        <JobsView renderTableHeader={this.renderTableHeader}/>
      </div>
    )
  }
}

        // <table id='table-header-copy' ref={el=> this.copyHeader = el} className='hidden'>
        //   {this.renderTableHeader()}
        //   </table>
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);
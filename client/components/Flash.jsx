import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class Flash extends React.Component {
  constructor(props) {
    super(props)
  }

  renderMsg(msg, idx) {
    const flashType = msg.isError ? 'error-flash' : 'success-flash';
    return (
      <div className={'flash-message ' + flashType} key={idx}>
        {msg.msg}
      </div>
    )
  }

  render() {
    return (
      <div id='flash-messages-container'>
        {
          this.props.messages.map(this.renderMsg)
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { messages: state.flashMessages }
}

export default connect(mapStateToProps)(Flash)
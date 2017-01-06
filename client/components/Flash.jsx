import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class Flash extends React.Component {
  constructor(props) {
    super(props);
    this.dismissMessage = this.dismissMessage.bind(this);
    this.renderMsg = this.renderMsg.bind(this);
  }

  dismissMessage(msg) {
    this.props.dispatch(actions.removeFlash(msg.msg));
  }

  renderMsg(msg, idx) {
    const flashType = msg.isError ? 'error-flash' : 'success-flash';

    return (
      <div onClick={evt => this.dismissMessage(msg)} className={'flash-message ' + flashType} key={idx}>
        {msg.msg}
      </div>
    )
  }

  render() {
    return (
      <div id='flash-messages-container'>
        { this.props.messages.length ? <div id='flash-help'>Click message to dismiss</div> : null }
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
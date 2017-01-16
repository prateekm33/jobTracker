
import types from '../_actions/actionTypes';

const flashReducers = {
  flashMessages(msgs = [], action) {
    switch (action.type) {
      case types.addFlash:
        return addFlash(msgs, action);
      case types.removeFlash:
        return removeFlash(msgs, action);
      case types.clearFlash:
        return [];
      default:
        return msgs;
    }
  }
}

export default flashReducers;


function addFlash(msgs, action) {
  for (let i = 0; i < msgs.length; i++) {
    if (msgs[i].msg === action.msg) { return msgs; }
    if (msgs[i].msg === action.removeMsg) { 
      return msgs.map(i => {
        if (i.msg === action.removeMsg) {
          return {msg: action.msg, isError: action.isError }
        }
        return i;
      });
    }
  }

  return action.isError && msgs.map(i => i).concat({msg: action.msg, isError: action.isError}) || msgs;
}

function removeFlash(msgs, action) {
  return msgs.filter(obj => obj.msg !== action.msg);
}
import types from './actionTypes';

const flashActions = {
  addFlash(msg, isError, removeMsg) {
    return {
      type: types.addFlash,
      msg,
      isError,
      removeMsg
    }
  },

  removeFlash(msg) {
    return {
      type: types.removeFlash,
      msg
    }
  },

  clearFlash() {
    return {
      type: types.clearFlash
    }
  }
}

export default flashActions;
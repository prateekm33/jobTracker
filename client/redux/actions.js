import types from './actionTypes';

const actions = {
  sortBy(option, reverse) {
    return {
      type: types.sortBy,
      option: option.toLowerCase(),
      reverse: reverse
    }
  }
}

export default actions;

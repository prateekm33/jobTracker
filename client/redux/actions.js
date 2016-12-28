import types from './actionTypes';

const actions = {
  sortBy(option, reverse) {
    return {
      type: types.sortBy,
      option: option.toLowerCase(),
      reverse: reverse
    }
  },

  editJob(job, idx) {
    return {
      type: types.editJob,
      job: job,
      idx: idx
    }
  },

  closeEditJobForm() {
    return {
      type: types.closeEditJobForm
    }
  },

  addJob(job) {
    return {
      type: types.addJob,
      job
    }
  }
}

export default actions;

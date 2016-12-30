import types from './actionTypes';

const jobActions = {
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

  addForm(open) {
    return {
      type: types.addForm,
      open
    }
  },

  addJob(job) {
    return {
      type: types.addJob,
      job
    }
  },

  deleteJob(job, idx) {
    return {
      type: types.deleteJob,
      job,
      idx
    }
  }
}


export default jobActions;
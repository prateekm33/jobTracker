import types from './actionTypes';

const jobActions = {
  fetchJobs() {
    const actions = this;
    return function(dispatch, getState) {
      console.log('fetching jobs...')
      dispatch(actions.fetchingJobs());

      const user = getState().user;
      fetch('/accounts/jobs/' + user, {
        method: 'get',
        credentials: 'include'
      })
        .then(r => r.json())
        .then(r => {
          dispatch(actions.fetchedJobs(r))
        })
        .catch(e => {
          dispatch(actions.asyncErrorCaught(e));
        })
    }
  },

  fetchingJobs() {
    return {
      type: types.fetchingJobs
    }
  },

  fetchedJobs(jobs) {
    return {
      type: types.fetchedJobs,
      jobs
    }
  },

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
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.saveJob(job));
      dispatch(actions.addToList(job));
    }
  },

  addToList(job) {
    return {
      type: types.addToList,
      job
    }
  },

  saveJob(job) {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.savingJob(job));
      const user = getState().user;
      fetch('/accounts/jobs/' + user, {
        method: 'POST',
        body: JSON.stringify({job: [job]}),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      })
        .then(r => {
          dispatch(actions.savedJob(job));
        })
        .catch(e => {
          dispatch(actions.asyncErrorCaught(e));
        })
    }
  },

  savingJob(job) {
    return {
      type: types.savingJob,
      job
    }
  },

  savedJob(job) {
    return {
      type: types.savedJob,
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
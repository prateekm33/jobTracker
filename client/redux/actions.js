import authActions from './_actions/authActions';
import jobActions from './_actions/jobActions';

const actions = Object.assign({}, 
  authActions, 
  jobActions
)

export default actions;

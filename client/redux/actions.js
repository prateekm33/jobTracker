
import authActions from './_actions/authActions';
import jobActions from './_actions/jobActions';
import flashActions from './_actions/flashActions';




const actions = Object.assign({}, 
  authActions, 
  jobActions,
  flashActions,

  {
    asyncErrorCaught(e) {
      console.log('Error with request: ', e);
    }
  }
)

export default actions;

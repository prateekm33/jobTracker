import { store } from './redux/store';
import actions from './redux/actions';

export const authenticateUser = (nextState, replace, done) => {
  const path = nextState.location.pathname;

  fetch('/auth/validate', {
    method: 'get',
    credentials: 'include'
  })
    .then(r => r.json() )
    .then(user => { handleNoUserFor(path, user, replace, done) });
}

function handleNoUserFor(path, user, replace, done) {
  switch (path) {
    case '/':
      return handleTransitionForIndex(user, replace, done);
    case '/home':
      return handleTransitionForHome(user, replace, done);

    case '/login':
    case '/signup':
      return handleTransitionForAuthPages(user, replace, done);

      
    default:
      done(user);
  }
}

function handleTransitionForIndex(user, replace, done) {
  console.log('Authenticating INDEX route')
  if (user) replace('/home');
  done();
}

function handleTransitionForHome(user, replace, done) {
  console.log('Authenticating HOME component');
  if (!user) {
    replace('/login')
  } else {
    store.dispatch(actions.userLoggedIn(user));
  }
  done(user);
}

function handleTransitionForAuthPages(user, replace, done) {
  console.log('Authenticating AUTH component');

  if (user) {
    replace('/home');
    store.dispatch(actions.userLoggedIn(user));
  }
  done(user);
}
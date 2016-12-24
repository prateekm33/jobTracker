import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import * as _ from 'underscore';
window._ = _;


import { Provider } from 'react-redux';
import configureStore from './redux/store';

const store = configureStore();

import routes from './routes';


render(
  <Provider store={ store }>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
)
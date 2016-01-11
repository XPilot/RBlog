import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory, useBasename } from 'history';
import { Router } from 'react-router';

import configureStore from './js/store/configure-store';
import routes from './routes';

const store = configureStore();
const history = useBasename(createHistory)({
  basename: '/',
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes()} />
  </Provider>,
  document.getElementById('rblog')
);

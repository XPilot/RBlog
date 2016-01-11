import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducers'

export default function configureStore(initialState) {

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}

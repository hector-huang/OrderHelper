import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
 
function configureStore() {
  let middlewares = [ReduxThunk];
  let enhancers = [];
  
  if (__DEV__) {
    const reduxDevtools = require('redux-devtools-extension');
    const logger = require('redux-logger');
    const composeWithDevTools = reduxDevtools.composeWithDevTools;
    const createLogger = logger.createLogger;

    middlewares.push(createLogger());

    enhancers = compose(composeWithDevTools(applyMiddleware(...middlewares)));
  } else {
    enhancers = compose(applyMiddleware(...middlewares));
  }
  
  const store = createStore(reducers, enhancers);

  if (module.hot && __DEV__) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;
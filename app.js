import React from 'react';
import { Provider } from 'react-redux';

// Containers
import AppContainer from "./src/containers/AppContainer";
// Store configure
import configureStore from './src/store/ConfigureStore';

const store = configureStore();

const app = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default app;

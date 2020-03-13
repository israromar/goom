import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import sideMenuReducer from '../reducers/sideMenuReducer';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

const configureStore = () => {
    return { store };
};

// sagaMiddleware.run(sagas);

export default configureStore;
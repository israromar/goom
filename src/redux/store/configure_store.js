import { createStore, compose, applyMiddleware } from 'redux';
import { createTransform, persistStore, persistCombineReducers } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import JSOG from 'jsog'

// import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers'; // where reducers is a object of reducers
// import sagas from 'src/sagas';

export const JSOGTransform = createTransform(
    (inboundState, key) => JSOG.encode(inboundState),
    (outboundState, key) => JSOG.decode(outboundState),
)
const config = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [''],
    debug: true, //to get useful logging,
    transforms: [JSOGTransform]
};

// const rootReducers = {
// ...rootReducer
// };

const middleware = [];
// const sagaMiddleware = createSagaMiddleware();
// middleware.push(sagaMiddleware);
middleware.push(thunk);

if (__DEV__) {
    middleware.push(createLogger());
}

const persistedReducer = persistCombineReducers(config, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistConfig = { enhancers };

let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware)),
    // enhancers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // undefined,
);
const persistor = persistStore(store, persistConfig, () => {
    // console.log('Test', store.getState());
});
const configureStore = () => {
    return { persistor, store };
};
export default configureStore;

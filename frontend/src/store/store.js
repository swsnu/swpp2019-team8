
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import userReducer from './reducers/user';
import tellmeReducer from './reducers/tellme';
import hearusReducer from './reducers/hearus';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    usr: userReducer,
    tm: tellmeReducer,
    hu: hearusReducer,
    router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares)));

export default store;
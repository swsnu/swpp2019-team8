import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';

import { history, middlewares } from '../store/store';

const getMockUserReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockTellMeReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockHearUsReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

export const getMockStore = (initialState) => {
    const mockUserReducer = getMockUserReducer(initialState);
    const mockTellMeReducer = getMockTellMeReducer(initialState);
    const mockHearUsReducer = getMockHearUsReducer(initialState);
    const rootReducer = combineReducers({
        usr: mockUserReducer,
        tm: mockTellMeReducer,
        hu: mockHearUsReducer,
        router: connectRouter(history),
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const mockStore = createStore(rootReducer,
        composeEnhancers(applyMiddleware(...middlewares)));
    return mockStore;
}
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    // TODO
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_SIGN_UP:
            return state;   // TODO
        case actionTypes.POST_SIGN_IN:
            return state;   // TODO
        case actionTypes.GET_SIGN_OUT:
            return state;   // TODO
        case actionTypes.GET_USER_BY_USER_ID:
            return state;   // TODO
        case actionTypes.GET_USER_BY_EMAIL:
            return state;   // TODO
        case actionTypes.GET_USER_BY_STUDENT_ID:
            return state;   // TODO
        case actionTypes.GET_USER_BY_NICKNAME:
            return state;   // TODO
        default:
            break;
    }
    return state;
};

export default userReducer;
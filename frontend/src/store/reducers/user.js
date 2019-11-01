import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedUser : '',
    verifyCode : ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_SIGN_UP:
            return {selectedUser : '', verifyCode : ''}
        case actionTypes.POST_SIGN_IN:
            return {selectedUser : action.selectedUser, verifyCode : ''}   
        case actionTypes.GET_SIGN_OUT:
            return {selectedUser : '', verifyCode : ''}
        case actionTypes.GET_USER:
            return {selectedUser : action.selectedUser, verifyCode : action.verifyCode}
        default:
            break;
    }
    return {...state};
};

export default userReducer;
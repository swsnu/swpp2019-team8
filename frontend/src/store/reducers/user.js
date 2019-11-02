import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedUser : '',
    verifyCode : '',
    signIn : false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_SIGN_UP:
            return {selectedUser : '', verifyCode : '', signIn : false}
        case actionTypes.POST_SIGN_IN:
            return {selectedUser : action.selectedUser, verifyCode : '', signIn : action.signIn}   
        case actionTypes.GET_SIGN_OUT:
            return {selectedUser : '', verifyCode : '', signIn : false}
        case actionTypes.GET_USER:
            return {selectedUser : action.selectedUser, verifyCode : action.verifyCode, ...state}
        default:
            break;
    }
    return {...state};
};

export default userReducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedUser: '',
    verifyCode: '',
    signIn: false
};

const userReducer = (state = initialState, action) => {
    let signIn;
    switch (action.type) {
        case actionTypes.POST_SIGN_UP:
            return { selectedUser: '', verifyCode: '', signIn: false }
        case actionTypes.POST_SIGN_IN:
            window.localStorage.setItem('userId', parseInt(action.selectedUser.id))
            return { selectedUser: action.selectedUser, verifyCode: '', signIn: action.signIn }
        case actionTypes.GET_SIGN_OUT:
            window.localStorage.removeItem('userId')
            return { selectedUser: '', verifyCode: '', signIn: false }
        case actionTypes.GET_USER:
            if (window.localStorage.getItem('userId') === null) signIn = false
            else signIn = true
            return { selectedUser: action.selectedUser, verifyCode: action.verifyCode, signIn : signIn }
        default:
            break;
    }
    return { ...state };
};

export default userReducer;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedUser: '',
    verifyCode: '',
    signIn: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_SIGN_UP:
            return { selectedUser: '', verifyCode: '', signIn: false }
        case actionTypes.POST_SIGN_IN:
            window.sessionStorage.setItem('userId', parseInt(action.selectedUser.id))
            return { selectedUser: action.selectedUser, verifyCode: '', signIn: action.signIn }
        case actionTypes.GET_SIGN_OUT:
            return { selectedUser: '', verifyCode: '', signIn: false }
        case actionTypes.GET_USER:
            let temp;
            if (window.sessionStorage.getItem('userId') === null) temp = false
            else temp = true
            return { selectedUser: action.selectedUser, verifyCode: action.verifyCode, signIn : temp }
        default:
            break;
    }
    return { ...state };
};

export default userReducer;
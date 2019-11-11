import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedUser: '',
    verifyCode: '',
    signIn: false,
    emailDuplicate: false,
    nicknameDuplicate: false,
    studentIdDuplicate: false,
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
            return { ...state, selectedUser: action.selectedUser, signIn: signIn }
        case actionTypes.GET_VERIFY_CODE:
            return { ...state, verifyCode: action.verifyCode }
        case actionTypes.CHECK_EMAIL_DUPLICATE:
            return { ...state, emailDuplicate: action.emailDuplicate }
        case actionTypes.CHECK_NICKNAME_DUPLICATE:
            return { ...state, nicknameDuplicate: action.nicknameDuplicate }
        case actionTypes.CHECK_STUDENT_ID_DUPLICATE:
            console.log(action.studentIdDuplicate)
            return { ...state, studentIdDuplicate: action.studentIdDuplicate }
        default:
            break;
    }
    return { ...state };
};

export default userReducer;
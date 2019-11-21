import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedUser: '',
    verifyCode: '',
    signIn: false,
    emailDuplicate: false,
    nicknameDuplicate: false,
    studentIdDuplicate: false,
};

const user = (prevState, action) => {
    let state;
    if (prevState === undefined) state = initialState;
    else state = prevState;
    switch (action.type) {
        case actionTypes.POST_SIGN_UP:
            return { selectedUser: '', verifyCode: '', signIn: false }
        case actionTypes.POST_SIGN_IN:
            return { selectedUser: action.selectedUser, verifyCode: '', signIn: action.signIn }
        case actionTypes.GET_SIGN_OUT:
            return { selectedUser: '', verifyCode: '', signIn: false }
        case actionTypes.GET_USER:
            return { ...state, selectedUser: action.selectedUser }
        case actionTypes.GET_VERIFY_CODE:
            return { ...state, verifyCode: action.verifyCode }
        case actionTypes.CHECK_SIGN_IN:
            return { ...state ,selectedUser : action.selectedUser, signIn: action.signIn }
        case actionTypes.CHECK_EMAIL_DUPLICATE:
            return { ...state, emailDuplicate: action.emailDuplicate }
        case actionTypes.CHECK_NICKNAME_DUPLICATE:
            return { ...state, nicknameDuplicate: action.nicknameDuplicate }
        case actionTypes.CHECK_STUDENT_ID_DUPLICATE:
            return { ...state, studentIdDuplicate: action.studentIdDuplicate }
        default:
            break;
    }
    return { ...state };
};

export default user;
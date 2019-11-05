import * as actionTypes from './actionTypes';
import axios from 'axios';

export const postSignUp_ = () => {
    return {
        type: actionTypes.POST_SIGN_UP,
    };
};

export const postSignUp = (user) => {
    return dispatch => {
        return axios.post('/api/user/signup/', user).then(res => {
            dispatch(postSignUp_());
        });
    };
};

export const postSignIn_ = (response) => {
    return {
        type: actionTypes.POST_SIGN_IN,
        selectedUser : response.selectedUser,
        signIn : true
    };
};

export const postSignIn = (user) => {
    return dispatch => {
        return axios.post('/api/user/signin/', user)
        .then(res => {
            dispatch(postSignIn_(res.data));
        })
        .catch(res => {
            dispatch({type: actionTypes.POST_SIGN_IN, selectedUser : '', signIn : false})
            window.alert('이메일 또는 비밀번호를 다시 학인해주십시오.')
        });
    };
};

export const getSignOut_ = () => {
    return {
        type: actionTypes.GET_SIGN_OUT,
    };
};

export const getSignOut = () => {
    return dispatch => {
        return axios.get('/api/user/signout/').then(res => {
            dispatch(getSignOut_());
        })
    };
};

export const getUser_= (response) => {
    return {
        type: actionTypes.GET_USER,
        selectedUser: response.selectedUser,
        verifyCode: response.verifyCode
    }
};

export const getUserByUserId = (userId) => {
    return dispatch => {
        return axios.get('/api/user/userId/' + userId + '/').then(res => {
            dispatch(getUser_(res.data))
        });
    }
}

export const getUserByEmail = (email) => {
    return dispatch => {
        return axios.get('/api/user/email/' + email + '/').then(res => {
            dispatch(getUser_(res.data));
        });
    };
};

export const getUserByStudentId = (studentId) => {
    return dispatch => {
        return axios.get('/api/user/studentId/' + studentId + '/').then(res => {
            dispatch(getUser_(res.data))
        });
    };
};

export const getUserByNickname = (nickname) => {
    return dispatch => {
        return axios.get('/api/user/nickname/' + nickname + '/').then(res => {
            dispatch(getUser_(res.data))
        });
        // TODO
    };
};
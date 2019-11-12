import * as actionTypes from './actionTypes';
import axios from 'axios';

export const postSignUp_ = () => {
    return {
        type: actionTypes.POST_SIGN_UP,
    };
};

export const postSignUp = (user) => {
    return dispatch => {
        return axios.post('/api/user/signup/', user)
            .then(res => {
                dispatch(postSignUp_());
            })
            .catch(e => {});
    };
};

export const postSignIn_ = (response) => {
    return {
        type: actionTypes.POST_SIGN_IN,
        selectedUser: response.selectedUser,
        signIn: true
    };
};

export const postSignIn = (user) => {
    return dispatch => {
        return axios.post('/api/user/signin/', user)
            .then(res => {
                dispatch(postSignIn_(res.data));
            })
            .catch((e) => {
                dispatch({
                    type: actionTypes.POST_SIGN_IN,
                    selectedUser: '',
                    signIn: false
                })
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
        return axios.get('/api/user/signout/')
            .then(res => {
                dispatch(getSignOut_());
            })
            .catch(e => {})
    };
};

export const getUser_ = (response) => {
    return {
        type: actionTypes.GET_USER,
        selectedUser: response.selectedUser
    }
};

export const getUserByUserId = (userId) => {
    return dispatch => {
        return axios.get('/api/user/userId/' + userId + '/')
            .then(res => {
                dispatch(getUser_(res.data))
            })
            .catch(e => {});
    }
}

export const getUserByEmail = (email) => {
    return dispatch => {
        return axios.get('/api/user/email/' + email + '/')
            .then(res => {
                dispatch(getUser_(res.data));
            })
            .catch(e => {});
    };
};

export const getUserByStudentId = (studentId) => {
    return dispatch => {
        return axios.get('/api/user/studentId/' + studentId + '/')
            .then(res => {
                dispatch(getUser_(res.data))
            })
            .catch(e => {});
    };
};

export const getUserByNickname = (nickname) => {
    return dispatch => {
        return axios.get('/api/user/nickname/' + nickname + '/')
            .then(res => {
                dispatch(getUser_(res.data))
            })
            .catch(e => {});
        // TODO
    };
};

export const getVerifyCode_ = (response) => {
    return {
        type: actionTypes.GET_VERIFY_CODE,
        verifyCode: response.verifyCode
    }
}

export const getVerifyCode = (email) => {
    return dispatch => {
        return axios.get('/api/user/verifyCode/' + email + '/')
            .then(res => {
                dispatch(getVerifyCode_(res.data))
            })
            .catch((e) => {
                dispatch({
                    type: actionTypes.GET_VERIFY_CODE,
                    verifyCode: ''
                })
            })
    }
}

export const checkSignIn_ = (response) => {
    return {
        type: actionTypes.CHECK_SIGN_IN,
        signIn : response.signIn
    }
}

export const checkSignIn = () => {
    return dispatch => {
        return axios.get('/api/user/check/signin/')
        .then(res => {
            dispatch(checkSignIn_(res.data))
        })
        .catch(e => {})
    }
}
export const checkEmailDuplicate_ = (response) => {
    return {
        type: actionTypes.CHECK_EMAIL_DUPLICATE,
        emailDuplicate: response.emailDuplicate
    }
}

export const checkEmailDuplicate = (email) => {
    return dispatch => {
        return axios.get('/api/user/check/email/' + email + '/')
            .then(res => {
                dispatch(checkEmailDuplicate_(res.data))
            })
            .catch(e => {})
    }
}

export const checkNicknameDuplicate_ = (response) => {
    return {
        type: actionTypes.CHECK_NICKNAME_DUPLICATE,
        nicknameDuplicate: response.nicknameDuplicate
    }
}

export const checkNicknameDuplicate = (nickname) => {
    return dispatch => {
        return axios.get('/api/user/check/nickname/' + nickname + '/')
            .then(res => {
                dispatch(checkNicknameDuplicate_(res.data))
            })
            .catch(e => {})
    }
}

export const checkStudentIdDuplicate_ = (response) => {
    return {
        type: actionTypes.CHECK_STUDENT_ID_DUPLICATE,
        studentIdDuplicate: response.studentIdDuplicate
    }
}

export const checkStudentIdDuplicate = (studentId) => {
    return dispatch => {
        return axios.get('/api/user/check/studentId/' + studentId + '/')
            .then(res => {
                dispatch(checkStudentIdDuplicate_(res.data))
            })
            .catch(e => {})
    }
}
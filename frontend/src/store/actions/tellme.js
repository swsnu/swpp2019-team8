import * as actionTypes from './actionTypes';
import axios from 'axios';

export const postDocument_ = (/* TODO */) => {
    return {
        type: actionTypes.POST_DOCUMENT,
        // TODO
    };
};

export const postDocument = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const getDocument_ = (document) => {
    return {
        type: actionTypes.GET_DOCUMENT,
        target: document,
    };
};

export const getDocument = (document_title) => {
    return dispatch => {
        return axios.get('/api/document/' + document_title)
            .then(res => dispatch(getDocument_(res.data)));
    };
};

export const putDocument_ = (/* TODO */) => {
    return {
        type: actionTypes.PUT_DOCUMENT,
        // TODO
    };
};

export const putDocument = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const postPhoto_ = (/* TODO */) => {
    return {
        type: actionTypes.POST_PHOTO,
        // TODO
    };
};

export const postPhoto = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const getPhoto_ = (/* TODO */) => {
    return {
        type: actionTypes.GET_PHOTO,
        // TODO
    };
};

export const getPhoto = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const putPhoto_ = (/* TODO */) => {
    return {
        type: actionTypes.PUT_PHOTO,
        // TODO
    };
};

export const putPhoto = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const getDebates_ = (/* TODO */) => {
    return {
        type: actionTypes.GET_DEBATES,
        // TODO
    };
};

export const getDebates = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const postDebate_ = (/* TODO */) => {
    return {
        type: actionTypes.POST_DEBATE,
        // TODO
    };
};

export const postDebate = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const getDebate_ = (/* TODO */) => {
    return {
        type: actionTypes.GET_DEBATE,
        // TODO
    };
};

export const getDebate = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const getDebateComments_ = (/* TODO */) => {
    return {
        type: actionTypes.GET_DEBATE_COMMENTS,
        // TODO
    };
};

export const getDebateComments = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const postDebateComment_ = (/* TODO */) => {
    return {
        type: actionTypes.POST_DEBATE_COMMENT,
        // TODO
    };
};

export const postDebateComment = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};
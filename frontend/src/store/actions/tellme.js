import * as actionTypes from './actionTypes';
import axios from 'axios';

import { push } from 'connected-react-router';

export const postDocument_ = (document) => {
    return {
        type: actionTypes.POST_DOCUMENT,
        id: document.id,
        title: document.title,
        content: document.content,
    };
};

export const postDocument = (document) => {
    return dispatch => {
        return axios.post('/api/tellme/document/', document)
            .then(res => {
                dispatch(postDocument_(res.data));
                dispatch(push('/tell_me/documents/' + res.data.title));
            });
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
        return axios.get('/api/tellme/document/' + document_title + '/')
            .then(res =>  {
                dispatch(getDocument_(res.data))
            //    dispatch(push('/tell_me/documents/' + res.data.title))
            })
            .catch(e => {
                dispatch({ TYPE : actionTypes.GET_DOCUMENT, target : null})
                dispatch(push('/tell_me/search_fail'))
            })

    };
};


export const putDocument_ = (document) => {
    return {
        type: actionTypes.PUT_DOCUMENT,
        target: document.target,
        content: document.content,
    };
};

export const putDocument = (document) => {
    return dispatch => {
        return axios.put('/api/tellme/document/' + document.target + '/',document)
            .then(res =>  {
                dispatch(putDocument_(res.data))
                dispatch(push('/tell_me/documents/' + res.data.title))
            })
            .catch(e => {
                console.log(e);
            })
        };
    };
    
    export const getDebates_ = (document) => {
        return {
            type: actionTypes.GET_DEBATES,
            target: document,
        };
    };
    
    export const getDebates = (document_title) => {
        return dispatch => {
            return axios.get('/api/tellme/document/' + document_title + '/debate')
                .then(res => {
                    dispatch(getDebates_(res.data))
                })
        };
    };
    
/*
export const postPhoto_ = (TODO) => {
    return {
        type: actionTypes.POST_PHOTO,
        // TODO
    };
};

export const postPhoto = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/

/*
export const getPhoto_ = (TODO) => {
    return {
        type: actionTypes.GET_PHOTO,
        // TODO
    };
};

export const getPhoto = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/

/*
export const putPhoto_ = (TODO) => {
    return {
        type: actionTypes.PUT_PHOTO,
        // TODO
    };
};

export const putPhoto = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/




/*
export const postDebate_ = (TODO) => {
    return {
        type: actionTypes.POST_DEBATE,
        // TODO
    };
};

export const postDebate = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/

/*
export const getDebate_ = (TODO) => {
    return {
        type: actionTypes.GET_DEBATE,
        // TODO
    };
};

export const getDebate = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/

/*
export const getDebateComments_ = (TODO) => {
    return {
        type: actionTypes.GET_DEBATE_COMMENTS,
        // TODO
    };
};

export const getDebateComments = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/

/*
export const postDebateComment_ = (TODO) => {
    return {
        type: actionTypes.POST_DEBATE_COMMENT,
        // TODO
    };
};

export const postDebateComment = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/
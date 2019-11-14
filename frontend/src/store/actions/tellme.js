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
    
    export const getDebates_ = (debates) => {
        return {
            type: actionTypes.GET_DEBATES,
            debateList: debates,
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
    
    export const postDebate_ = (debate) => {
        return {
            type: actionTypes.POST_DEBATE,
            id: debate.id,
            title: debate.title,
            content: debate.content,
            document: debate.document_title,
        };
    };
    
    export const postDebate = (selectedDocument, debate) => {
        return dispatch => {
            return axios.post('/api/tellme/document/' + selectedDocument.title + '/debate/', debate)
                .then(res => {
                    dispatch(postDebate_(res.data));
                    dispatch(push('/tell_me/documents/' + selectedDocument.title + '/debates/' + res.data.id));
                })
        };
    };
    
    export const getDebate_ = (debate) => {
        return {
            type: actionTypes.GET_DEBATE,
            target: debate,
        };
    };
    
    export const getDebate = (document_title, debate_id) => {
        return dispatch => {
            return axios.get('/api/tellme/document/' + document_title + '/debate/' + debate_id)
                .then(res => {
                    dispatch(getDebate_(res.data))
                })
        };
    }; 
   
   export const getDebateComments_ = (comments) => {
       return {
           type: actionTypes.GET_DEBATE_COMMENTS,
           commentList: comments,
        };
    };
    
    export const getDebateComments = (debate_id) => {
        return dispatch => {
            return axios.get('/api/tellme/debate/' + debate_id)
                .then(res => {
                    dispatch(getDebateComments_(res.data))
                })
        };
    };
     
   export const postDebateComment_ = (comment) => {
       return {
           type: actionTypes.POST_DEBATE_COMMENT,
           id: comment.id,
           comment: comment.comment,
           debate: comment.debate,
        };
    };
    
    export const postDebateComment = (comment, debate_id) => {
        return dispatch => {
            return axios.post('/api/tellme/debate/' + debate_id + '/', comment)
                .then(res => {
                    dispatch(postDebateComment_(res.data));
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
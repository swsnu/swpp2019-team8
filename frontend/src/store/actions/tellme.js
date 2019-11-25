import * as actionTypes from './actionTypes';
import axios from 'axios';

import { push } from 'connected-react-router';

export const postDocument_ = (document) => {
    return {
        type: actionTypes.POST_DOCUMENT,
        id: document.id,
        title: document.title,
        content: document.content,
        documentDuplicate: document.documentDuplicate,
    };
};

export const postDocument = (document) => {
    return dispatch => {
        return axios.post('/api/tellme/document/', document)
            .then(res => {
                dispatch(postDocument_(res.data));
                if(!res.data.documentDuplicate) dispatch(push('/tell_me/documents/' + res.data.title));
            });
    };
};

export const getDocument_ = (response) => {
    return {
        type: actionTypes.GET_DOCUMENT,
        unique : response.unique,
        selectedDocument: response.selectedDocument,
        titleDocuments: response.titleDocuments,    //for search fail
        contentDocuments : response.contentDocuments
    };
};

export const getDocument = (document_title) => {
    return dispatch => {
        return axios.get('/api/tellme/document/' + document_title + '/')
            .then(res => {
                    dispatch(getDocument_(res.data))
            })
            .catch(e => {
                //console.log(e)
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
        return axios.put('/api/tellme/document/' + document.target + '/', document)
            .then(res => {
                dispatch(putDocument_(res.data))
                dispatch(push('/tell_me/documents/' + res.data.title))
            })
            .catch(e => {
                //console.log(e);
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
                .catch(e => {})
        };
    };
    
    export const postDebate_ = (debate) => {
        return {
            type: actionTypes.POST_DEBATE
        };
    };
    
    export const postDebate = (selectedDocument, debate) => {
        return dispatch => {
            return axios.post('/api/tellme/document/' + selectedDocument.title + '/debate/', debate)
                .then(res => {
                    dispatch(postDebate_(res.data));
                    dispatch(push('/tell_me/documents/' + selectedDocument.title + '/debates/' + res.data.id));
                })
                .catch(e => {})
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
                .catch(e => {})
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
            return axios.get('/api/tellme/debate/' + debate_id + '/')
                .then(res => {
                    dispatch(getDebateComments_(res.data))
                })
                .catch(e => {})
        };
    };
     
   export const postDebateComment_ = (comments) => {
       return {
           type: actionTypes.POST_DEBATE_COMMENT,
           commentList: comments
        };
    };
    
    export const postDebateComment = (comment, debate_id) => {
        
        return dispatch => {
            return axios.post('/api/tellme/debate/' + debate_id + '/', comment)
                .then(res => {
                    dispatch(postDebateComment_(res.data));
                })
                .catch(e => {})
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
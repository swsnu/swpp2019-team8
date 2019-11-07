import * as actionTypes from './actionTypes';
import axios from 'axios';

import { push } from 'connected-react-router';

export const postPetition_ = (petition) => {
    return {
        type: actionTypes.POST_PETITION,
        id: petition.id,
        title: petition.title,
        content: petition.content,
        category: petition.category,
        tag: petition.tag,
        link: petition.link,
        
    };
};

export const postPetition = (petition) => {
    return dispatch => {
        return axios.post('/api/hearus/petition/', petition).then(res => {
            dispatch(postPetition_(res.data));
            dispatch(push('/hear_us/' + res.data.id));
        })
        .catch(res => {
            alert('post Petition Failed.')
        });
    };
};


export const getAllPetitions_ = (response) => {
    return {
        type: actionTypes.GET_ALL_PETITIONS,
        petitionList : response
        // TODO
    };
};

export const getAllPetitions = (/* TODO */) => {
    return dispatch => {
        return axios.get('/api/hearus/petition/petitions/')
            .then(res => {
                dispatch(getAllPetitions_(res.data))
            })
            .catch(e => {
                console.log(e)
            })
        // TODO
    };
};

export const getPetition_ = (petition) => {
    return {
        type: actionTypes.GET_PETITION,
        target: petition,
    };
};

export const getPetitionByTitle_ = (response) => {
    return {
        type: actionTypes.GET_PETITION_BY_TITLE,
        petitionList : response
    }

}

export const getPetitionByTitle = (title) => {
    return dispatch => {
        return axios.get('/api/hearus/petition/petition_title/' + title + '/')
            .then(res => dispatch(getPetitionByTitle_(res.data)))
            .catch(

            );
    }
}

export const getPetition = (petition_id) => {
    return dispatch => {
        return axios.get('/api/hearus/petition/' + petition_id)
            .then(res => dispatch(getPetition_(res.data)));
    };
};

export const getMyPetitions_ = (/* TODO */) => {
    return {
        type: actionTypes.GET_MY_PETITIONS,
        // TODO
    };
};

export const getMyPetitions = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const getPetitionComments_ = (/* TODO */) => {
    return {
        type: actionTypes.GET_PETITION_COMMENTS,
        // TODO
    };
};

export const getPetitionComments = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const postPetitionComment_ = (/* TODO */) => {
    return {
        type: actionTypes.POST_PETITION_COMMENT,
        // TODO
    };
};

export const postPetitionComment = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

// Statistic에 해당하는 것은 아직 안 만듦

import * as actionTypes from './actionTypes';
import axios from 'axios';

/*
export const postPetition_ = (TODO) => {
    return {
        type: actionTypes.POST_PETITION,
        // TODO
    };
};

export const postPetition = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/


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

export const getPetition = (petition_id) => {
    return dispatch => {
        return axios.get('/api/hearus/petition/' + petition_id)
            .then(res => dispatch(getPetition_(res.data)));
    };
};

/*
export const getMyPetitions_ = (TODO) => {
    return {
        type: actionTypes.GET_MY_PETITIONS,
        // TODO
    };
};

export const getMyPetitions = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/

/*
export const getPetitionComments_ = (TODO) => {
    return {
        type: actionTypes.GET_PETITION_COMMENTS,
        // TODO
    };
};

export const getPetitionComments = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/

/*
export const postPetitionComment_ = (TODO) => {
    return {
        type: actionTypes.POST_PETITION_COMMENT,
        // TODO
    };
};

export const postPetitionComment = (TODO) => {
    return dispatch => {
        // TODO
    };
};
*/

// Statistic에 해당하는 것은 아직 안 만듦

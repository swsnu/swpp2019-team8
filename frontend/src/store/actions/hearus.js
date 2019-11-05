import * as actionTypes from './actionTypes';
import axios from 'axios';

import { push } from 'connected-react-router';

export const postPetition_ = (/* TODO */) => {
    return {
        type: actionTypes.POST_PETITION,
        // TODO
    };
};

export const postPetition = (/* TODO */) => {
    return dispatch => {
        // TODO
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

export const getPetition_ = (/* TODO */) => {
    return {
        type: actionTypes.GET_PETITION,
        // TODO
    };
};

export const getPetition = (/* TODO */) => {
    return dispatch => {
        // TODO
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
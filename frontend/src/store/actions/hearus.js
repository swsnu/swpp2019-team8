import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const getPetitionsByVote_ = (/* TODO */) => {
    return {
        type: actionTypes.GET_PETITIONS_BY_VOTE,
        // TODO
    };
};

export const getPetitionsByVote = (/* TODO */) => {
    return dispatch => {
        // TODO
    };
};

export const getPetitionsByLatest_ = (/* TODO */) => {
    return {
        type: actionTypes.GET_PETITIONS_BY_LASTEST,
        // TODO
    };
};

export const getPetitionsByLatest = (/* TODO */) => {
    return dispatch => {
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
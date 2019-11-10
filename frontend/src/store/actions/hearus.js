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
        petitionList: response
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
    }
}

export const getPetition = (petition_id) => {
    return dispatch => {
        return axios.get('/api/hearus/petition/' + petition_id)
            .then(res => dispatch(getPetition_(res.data)));
    }
}

export const getPetitionByTitle_ = (response) => {
    return {
        type: actionTypes.GET_PETITION_BY_TITLE,
        petitionList: response
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

/*
export const getMyPetitions_ = () => {
    return {
        type: actionTypes.GET_MY_PETITIONS,
        // TODO
    };
};

export const getMyPetitions = () => {
    return dispatch => {
        // TODO
    };
};
*/

export const getPetitionComments_ = (comment_list) => {
    return {
        type: actionTypes.GET_PETITION_COMMENTS,
        comment_list: comment_list,
    };
};

export const getPetitionComments = (petition_id) => {
    return dispatch => {
        return axios.get('/api/hearus/petition/' + petition_id + '/comment/')
            .then(res => dispatch(getPetitionComments_(res.data)));
    };
};

export const postPetitionComment_ = (comment) => {
    return {
        type: actionTypes.POST_PETITION_COMMENT,
        id: comment.id,
        comment: comment.comment,
    };
};

export const postPetitionComment = (comment) => {
    return dispatch => {
        return axios.post('/api/hearus/petition/' + comment.petition_id + '/comment/', comment)
            .then(res => dispatch(postPetitionComment_(res.data)));
    };
};

export const putPetitionVote_ = (petition) => {
    return {
        type: actionTypes.PUT_PETITION_VOTE,
        target: petition,
    }
}

export const putPetitionVote = (petition_id) => {
    return dispatch => {
        return axios.put('/api/hearus/petition/' + petition_id + '/')
            .then(res => dispatch(putPetitionVote_(res.data)));
    }
}

// Statistic에 해당하는 것은 아직 안 만듦
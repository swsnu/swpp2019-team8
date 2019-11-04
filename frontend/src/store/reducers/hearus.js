import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedPetition: null,
};

const hearusReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_PETITION:
            return state;   // TODO
        case actionTypes.GET_PETITIONS_BY_VOTE:
            return state;   // TODO
        case actionTypes.GET_PETITIONS_BY_LASTEST:
            return state;   // TODO
        case actionTypes.GET_PETITION:
            return { ...state, selectedPetition: action.target };
        case actionTypes.GET_MY_PETITIONS:
            return state;   // TODO
        case actionTypes.GET_PETITION_COMMENTS:
            return state;   // TODO
        case actionTypes.POST_PETITION_COMMENT:
            return state;   // TODO

        // Statistic에 해당하는 것은 아직 안 만듦

        default:
            break;
    }
    return state;
};

export default hearusReducer;
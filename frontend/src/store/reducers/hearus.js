import * as actionTypes from '../actions/actionTypes';

const initialState = {
    petition_list: [],
    selectedPetition: null,
    comment_list: [],
};


const hearus = (prevState, action) => {
    let state;
    if (prevState === undefined) state = initialState;
    else state = prevState;
    switch (action.type) {
        case actionTypes.POST_PETITION: {
            return state;
        }
        case actionTypes.GET_ALL_PETITIONS:
            return { ...state, petition_list: action.petitionList };   // TODO
        case actionTypes.GET_PETITION_BY_TITLE:
            return { ...state, petition_list: action.petitionList }
        case actionTypes.GET_PETITION:
            return { ...state, selectedPetition: action.target };   // TODO
        case actionTypes.GET_MY_PETITIONS:
            return { ...state, petition_list: action.myPetitionList };   // TODO
        case actionTypes.GET_PETITION_COMMENTS:
            return { ...state, comment_list: action.comment_list };
        case actionTypes.POST_PETITION_COMMENT: {
            const newPetitionComment = {
                id: action.id,
                comment: action.comment,
            };
            return { ...state, comment_list: state.comment_list.concat(newPetitionComment) };
        }
        case actionTypes.PUT_PETITION_VOTE: {
            return { ...state, selectedPetition: action.target };
        }

        // Statistic에 해당하는 것은 아직 안 만듦

        default:
            break;
    }
    return state;
};

export default hearus;
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    petition_list: [],
    selectedpetition: null,
    comment_list: [],
};

const hearusReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_PETITION: {
            const newPetition = {
                id: action.id,
                title: action.title,
                content: action.content,
                link: action.link,
                tag: action.tag,
            };
            return { ...state, petition_list: state.petition_list.concat(newPetition)};
        }
        case actionTypes.GET_ALL_PETITIONS:
            return {...state, petitionList : action.petitionList};   // TODO
        case actionTypes.GET_PETITION:
            return { ...state, selectedPetition: action.target };   // TODO
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